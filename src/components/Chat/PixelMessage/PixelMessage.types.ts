import { ChatRequestOptions } from "ai";

export interface Message {
  id: string;
  role: string;
  content: string;
}

export interface PixelMessageProps {
  message: Message;
  index: number;
  messages: Message[];
  isLoading: boolean;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  removeMessage: (id: string) => void;
  model?: string;
}
