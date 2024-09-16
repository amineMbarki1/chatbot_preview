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
export interface Condition {
  when: "user_response";
  type: "contains" | "greater" | "less";
  value: string | number;
  keywords: string[];
  id: string;
}
export interface ButtonSelectionOption {
  id: string;
  name: string;
  nextAction: string | null;
  transitionConditions: Condition[];
}

export interface ButtonSelectionMessage extends BaseMessage {
  type: "buttonSelection";
  options: ButtonSelectionOption[];
}

export interface CardSelectionMessage extends BaseMessage {
  cardsList: CardSelectionOption[];
  type: "cardSelection";
}

export interface CardSelectionOption {
  image: string;
  id: string;
  text: string;
  title: string;
  options: ButtonSelectionOption[];
}
interface MultipleChoice {
  paramName: string;
  label: string;
  id: string;
}

export interface MultipleChoiceInputMessage extends BaseMessage {
  choices: MultipleChoice[];
  type: "multipleChoice";
}

export interface StarRatingMessage extends BaseMessage {
  type: "starRating";
  level: number;
  paramName: string;
}

export type Message =
  | ImageMessage
  | LinkMessage
  | TextMessage
  | ButtonSelectionMessage
  | TextInputMessage
  | CardSelectionMessage
  | MultipleChoiceInputMessage
  | StarRatingMessage;

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
export interface TextInputMessage extends BaseMessage {
  type: "textInput";
  paramName: string;
}
