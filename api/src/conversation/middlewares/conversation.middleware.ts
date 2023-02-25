import { Injectable, NestMiddleware, Inject } from "@nestjs/common";
import { NextFunction } from "express";
import { Services } from "../../utils/constants";
import { AuthenticatedRequest } from "../../utils/types";
import { ConversationNotFoundException } from "../exceptions/ConversationNotFound";
import { InvalidConversationIdException } from "../exceptions/InvalidConversationId";
import { IConversationService } from "../interfaces/conversation";

@Injectable()
export class ConversationMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.CONVERSATION)
    private readonly conversationService: IConversationService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new InvalidConversationIdException();
    const isReadable = await this.conversationService.hasAccess({ id, userId });
    console.log(isReadable);
    if (isReadable) next();
    else throw new ConversationNotFoundException();
  }
}