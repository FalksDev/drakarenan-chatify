import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteMessage as deleteMessageAPI,
  editMessage as editMessageAPI,
  createMessage as createMessageAPI,
  getConversationMessages,
} from '../../utils/api';
import {
  CreateMessageParams,
  DeleteMessageParams,
  EditMessagePayload,
} from '../../utils/types';

export const fetchMessagesThunk = createAsyncThunk(
    'messages/fetch',
    (id: number) => {
      return getConversationMessages(id);
    }
  );
  
  export const deleteMessageThunk = createAsyncThunk(
    'messages/delete',
    (params: DeleteMessageParams) => {
      return deleteMessageAPI(params);
    }
  );
  
  export const editMessageThunk = createAsyncThunk(
    'messages/edit',
    (params: EditMessagePayload) => {
      return editMessageAPI(params);
    }
  );