import { Controller, Inject, UseInterceptors, Post, UploadedFiles, Param, ParseIntPipe, Body, Get, Delete, Patch } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Throttle, SkipThrottle } from "@nestjs/throttler";
import { CreateMessageDto } from "../../message/dtos/CreateMessage.dto";
import { EditMessageDto } from "../../message/dtos/EditMessage.dto";
import { EmptyMessageException } from "../../message/exceptions/EmptyMessage";
import { Routes, Services } from "../../utils/constants";
import { AuthUser } from "../../utils/decorators";
import { User } from "../../utils/typeorm";
import { Attachment } from "../../utils/types";
import { IGroupMessageService } from "../interfaces/group-message";

@Controller(Routes.GROUP_MESSAGE)
export class GroupMessageController {
  constructor(
    @Inject(Services.GROUP_MESSAGE)
    private readonly groupMessageService: IGroupMessageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Throttle(5, 10)
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'attachments',
        maxCount: 5,
      },
    ]),
  )
  @Post()
  async createGroupMessage(
    @AuthUser() user: User,
    @UploadedFiles() { attachments }: { attachments: Attachment[] },
    @Param('id', ParseIntPipe) id: number,
    @Body() { content }: CreateMessageDto,
  ) {
    console.log(`Creating Group Message for ${id}`);
    if (!attachments && !content) throw new EmptyMessageException();
    const params = { groupId: id, author: user, content, attachments };
    const response = await this.groupMessageService.createGroupMessage(params);
    this.eventEmitter.emit('group.message.create', response);
    return;
  }

  @Get()
  @SkipThrottle()
  async getGroupMessages(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(`Fetching GroupMessages for Group Id: ${id}`);
    const messages = await this.groupMessageService.getGroupMessages(id);
    return { id, messages };
  }

  @Delete(':messageId')
  @SkipThrottle()
  async deleteGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    await this.groupMessageService.deleteGroupMessage({
      userId: user.id,
      groupId,
      messageId,
    });
    this.eventEmitter.emit('group.message.delete', {
      userId: user.id,
      messageId,
      groupId,
    });
    return { groupId, messageId };
  }

  @Patch(':messageId')
  @SkipThrottle()
  async editGroupMessage(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() { content }: EditMessageDto,
  ) {
    const params = { userId, content, groupId, messageId };
    const message = await this.groupMessageService.editGroupMessage(params);
    this.eventEmitter.emit('group.message.update', message);
    return message;
  }
}