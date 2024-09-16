import "./app.css";
import ChatContainer from "./components/ChatContainer";

import { assign, setup, raise } from "xstate";
import { nanoid } from "nanoid";
import { useMachine } from "@xstate/react";
import { useEffect } from "preact/hooks";
import _ from "lodash";
import { ChatContext } from "./types";
import { createContext } from "preact";

(window as any).machineDefinition = JSON.parse(
  `{"types":{"events":{}},"context":{"type":"entry","messages":[],"thinking":false,"triggers":[],"params":[]},"states":{"1":{"on":{"start":{"target":"VabVi0CKvCh1BKf-o7MUu","internal":false}}},"VabVi0CKvCh1BKf-o7MUu":{"initial":"idle","states":{"idle":{"on":{"send_message":{"target":"send_message","internal":false},"receive_message":{"target":"receive_message","internal":false}}},"send_message":{"after":{"700":{"actions":[{"type":"setTriggerMessage"}],"target":"idle"}},"entry":{"type":"thinking"}},"receive_message":{"entry":[{"type":"setUserMessage"}],"always":[{"target":"idle"}]}},"after":{"500":{"actions":{"type":"setBotMessage","params":{"message":{"id":"mrdIW3zT8eIl1AJB5nQyN","stateId":"VabVi0CKvCh1BKf-o7MUu","type":"cardSelection","cardsList":[{"id":"-h8snAP7E9FU_W8xGo1II","image":"https://firebasestorage.googleapis.com/v0/b/chatbot-eda13.appspot.com/o/uploads%2Fimage.png?alt=media&token=663f0bba-9d9f-4ea8-a5c8-26185d62ff94","options":[{"id":"7--ShKKC7sllSbghCNiIM","name":"star rating","nextAction":"nEcFAmjJHnu9v1caLP3WD"},{"id":"nuAbH-QAcqLmZgme2cPMP","name":"","nextAction":""}],"text":"Hello this is a card","title":"This is a card"}]}}}}},"entry":{"type":"thinking"},"on":{"7--ShKKC7sllSbghCNiIM":"nEcFAmjJHnu9v1caLP3WD","nuAbH-QAcqLmZgme2cPMP":""}},"nEcFAmjJHnu9v1caLP3WD":{"initial":"idle","states":{"idle":{"on":{"send_message":{"target":"send_message","internal":false},"receive_message":{"target":"receive_message","internal":false}}},"send_message":{"after":{"700":{"actions":[{"type":"setTriggerMessage"}],"target":"idle"}},"entry":{"type":"thinking"}},"receive_message":{"entry":[{"type":"setUserMessage"}],"always":[{"target":"idle"}]}},"entry":{"type":"thinking"},"after":{"500":{"actions":{"type":"setBotMessage","params":{"message":{"type":"starRating","id":"KQS0r5FFhbfhp4C7X5nFa","stateId":"nEcFAmjJHnu9v1caLP3WD","text":"Hello sir ","label":"Star Rating","rating":0,"level":5}}}}},"on":{}}},"initial":"1","id":"root","on":{"1start":{"target":".VabVi0CKvCh1BKf-o7MUu","internal":false},"VabVi0CKvCh1BKf-o7MUu7--ShKKC7sllSbghCNiIM":".nEcFAmjJHnu9v1caLP3WD","VabVi0CKvCh1BKf-o7MUunuAbH-QAcqLmZgme2cPMP":".","set_param_value":{"actions":[{"type":"setParamValue"},{"type":"goToNext"}]}}}`
);
(window as any).design = JSON.parse(
  `{"name":"My chatbot","avatar":{"src":"/_next/static/media/Bot.ae91dff6.png","size":40},"description":"My cutesy bot","botChatBubble":{"bgColor":"#e6e6e6"},"userChatBubble":{"bgColor":"#e6e6e6"},"userChatBubbleColor":"#07338c","headerBgColor":"rgb(238 146 179)","containerBg":"#fff","borderRadius":{"bottomRight":0,"bottomLeft":0,"topLeft":0,"topRight":0}}`
);

export const Context = createContext<any>({ design: (window as any).design });

const machine = setup({
  actions: {
    goToNext: raise({ type: "next" }),
    test_log: () => console.log("test"),
    setBotMessage: assign({
      thinking: false,
      type: (_, { message }) => message.type,
      messages: ({ context }, { message }) => {
        return [...context.messages, message];
      },
    }),
    setCurrentParamName: assign({
      currentParamName: (_, { currentParamName }) => currentParamName,
    }),

    setType: assign({
      type: (_, { type }) => {
        return type;
      },
    }),

    setTriggerMessage: assign({
      thinking: false,
      messages: ({ context }) => {
        return [
          ...context.messages,
          {
            type: "text",
            from: "bot",
            text: context.event.data?.text,
            id: nanoid(),
          },
        ];
      },
    }),
    thinking: assign((context) => ({
      ...context,
      thinking: true,
    })),

    setUserMessage: assign(({ event, context }) => ({
      messages: [
        ...context.messages,
        {
          text: event.text,
          id: nanoid(),
          from: "user",
          type: "text",
        },
      ],
    })),

    setParamValue: assign(({ event, context }) => {
      const paramsCp = Object.assign({}, context.params);
      _.set(paramsCp, context.currentParamName, event.value);

      return { params: paramsCp };
    }),
  },
  guards: {
    userResponseCheck: ({ context, event }, { condition, keywords }) => {
      const text = event.text as string;

      return (keywords as string[]).some((keyword) => text.includes(keyword));
    },
  },
}).createMachine((window as any).machineDefinition);

export function App() {
  const [state, send] = useMachine(machine);

  useEffect(() => {
    if (state.context.type === "entry") {
      send({ type: "start" });
      console.log("hello sir");
    }
    if (!state.context.thinking && state.context.type === "text")
      send({ type: "next" });
    if (!state.context.thinking && state.context.type === "image")
      send({ type: "next" });
  }, [state.context, send]);

  const chatContext = state.context as ChatContext;

  return (
    <Context.Provider value={{ design: (window as any).design }}>
      <ChatContainer
        context={state.context as ChatContext}
        send={send}
        thinking={state.context.thinking}
        messages={chatContext.messages}
      />
    </Context.Provider>
  );
}
