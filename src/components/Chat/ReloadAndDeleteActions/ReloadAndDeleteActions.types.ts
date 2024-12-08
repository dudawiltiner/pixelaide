import { ChatRequestOptions } from "ai";
import { Message } from "../PixelMessage/PixelMessage.types";

export interface ReloadAndDeleteActionsProps {
  message: Message;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  removeMessage: (id: string) => void;
  model?: string;
  promptBase: string;
  isUserRole?: boolean;
}
