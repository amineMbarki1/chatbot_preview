export type MessageType =
  | "text"
  | "entry"
  | "buttonSelection"
  | "image"
  | "cardSelection"
  | "textInput"
  | "conditional"
  | "multipleChoice"
  | "link"
  | "dateTimeInput"
  | "starRating";

export interface BaseMessage {
  from: "user" | "bot";
  id: string;
  stateId: string;
  type: MessageType;
  text: string;
}

export interface TextMessage extends BaseMessage {
  type: "text";
}

export interface ImageMessage extends BaseMessage {
  type: "image";
  image: string;
}
export interface LinkMessage extends BaseMessage {
  type: "link";
  links: string[];
}

export type Message = ImageMessage | LinkMessage | TextMessage;

export interface TriggerKeywords {
  condition: "is" | "contains" | "begins";
  response: string;
  keywords: string[];
  id: string;
}

export interface ChatContext {
  type: MessageType;
  messages: Message[];
  thinking: boolean;
  params: Record<string, unknown>;
  triggers: TriggerKeywords[];
}

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}
