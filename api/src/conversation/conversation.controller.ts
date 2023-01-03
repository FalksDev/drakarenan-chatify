import { Controller, UseGuards, Inject, Get, Post, Body, Param } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { SkipThrottle } from "@nestjs/throttler";
import { AuthenticatedGuard } from "src/auth/utils/Guards";
import { Routes, Services } from "src/utils/constants";
import { AuthUser } from "src/utils/decorators";
import { User } from "src/utils/typeorm";
import { CreateConversationDto } from "./dtos/CreateConversation.dto";
import { IConversationService } from "./interfaces/conversation";

@SkipThrottle()
@Controller(Routes.CONVERSATION)
@UseGuards(AuthenticatedGuard)
export class ConversationController {
  constructor(
    @Inject(Services.CONVERSATION)
    private readonly conversationsService: IConversationService,
    private readonly events: EventEmitter2,
  ) {}
  @Get('test/endpoint/check')
  test() {
    return;
  }

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    console.log('createConversation');
    const conversation = await this.conversationsService.createConversation(
      user,
      createConversationPayload,
    );
    this.events.emit('conversation.create', conversation);
    return conversation;
  }

  @Get()
  async getConversations(@AuthUser() { id }: User) {
    return this.conversationsService.getConversations(id);
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    return this.conversationsService.findById(id);
  }
}