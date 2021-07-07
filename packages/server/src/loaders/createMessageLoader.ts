import DataLoader from 'dataloader';
import { Message } from '../entity/Message';

export const createMessageLoader = (): DataLoader<string, Message, string> =>
  new DataLoader<string, Message>(async (messageIds) => {
    const messages = await Message.findByIds(messageIds as string[]);
    const messageIdToMessage: Record<string, Message> = {};

    messages.forEach((m) => {
      messageIdToMessage[m.id] = m;
    });

    return messageIds.map((messageId) => messageIdToMessage[messageId]);
  });
