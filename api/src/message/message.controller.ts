import { Controller, Inject, UseInterceptors, Post, UploadedFiles, Param, ParseIntPipe, Body, Get, Delete, Patch } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Throttle, SkipThrottle } from "@nestjs/throttler";
import { Routes, Services } from "../utils/constants";
import { AuthUser } from "../utils/decorators";
import { User } from "../utils/typeorm";
import { Attachment } from "../utils/types";
import { CreateMessageDto } from "./dtos/CreateMessage.dto";
import { EditMessageDto } from "./dtos/EditMessage.dto";
import { EmptyMessageException } from "./exceptions/EmptyMessage";
import { IMessageService } from "./interfaces/message";

@Controller(Routes.MESSAGE)
export class MessageController {
  constructor(
    @Inject(Services.MESSAGE) private readonly messageService: IMessageService,
    private eventEmitter: EventEmitter2,
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
  async createMessage(
    @AuthUser() user: User,
    @UploadedFiles() { attachments }: { attachments: Attachment[] },
    @Param('id', ParseIntPipe) id: number,
    @Body()
    { content }: CreateMessageDto,
  ) {
    if (!attachments && !content) throw new EmptyMessageException();
    const params = { user, id, content, attachments };
    const response = await this.messageService.createMessage(params);
    this.eventEmitter.emit('message.create', response);
    return;
  }

  @Get()
  @SkipThrottle()
  async getMessagesFromConversation(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const messages = await this.messageService.getMessages(id);
    return { id, messages };
  }

  @Delete(':messageId')
  async deleteMessageFromConversation(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) conversationId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    const params = { userId: user.id, conversationId, messageId };
    await this.messageService.deleteMessage(params);
    this.eventEmitter.emit('message.delete', params);
    return { conversationId, messageId };
  }
  
  @Patch(':messageId')
  async editMessage(
    @AuthUser() { id: userId }: User,
    @Param('id') conversationId: number,
    @Param('messageId') messageId: number,
    @Body() { content }: EditMessageDto,
  ) {
    const params = { userId, content, conversationId, messageId };
    const message = await this.messageService.editMessage(params);
    this.eventEmitter.emit('message.update', message);
    return message;
  }
}