import { Message } from "../../utils/typeorm/entities/Message";
import { CreateMessageParams, CreateMessageResponse, DeleteMessageParams, EditMessageParams } from "../../utils/types";

export interface IMessageService {
    createMessage(params: CreateMessageParams): Promise<CreateMessageResponse>;
    getMessages(id: number): Promise<Message[]>;
    deleteMessage(params: DeleteMessageParams);
    editMessage(params: EditMessageParams): Promise<Message>;
  }