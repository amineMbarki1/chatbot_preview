import "./app.css";
import ChatContainer from "./components/ChatContainer";

import { assign, setup } from "xstate";
import { nanoid } from "nanoid";
import { useMachine } from "@xstate/react";
import { useEffect } from "preact/hooks";
import _ from "lodash";
import { ChatContext } from "./types";

// const machineDef = JSON.parse(
//   `{"types":{"events":{}},"context":{"type":"entry","messages":[],"thinking":false,"triggers":[],"params":[]},"states":{"1":{"on":{"start":{"target":"PlEuHVlx_IauWaCKVp5Ba","internal":false}}},"PlEuHVlx_IauWaCKVp5Ba":{"initial":"idle","states":{"idle":{"on":{"send_message":{"target":"send_message","internal":false},"receive_message":{"target":"receive_message","internal":false}}},"send_message":{"after":{"700":{"actions":[{"type":"setTriggerMessage"}],"target":"idle"}},"entry":{"type":"thinking"}},"receive_message":{"entry":[{"type":"setUserMessage"}],"always":{"target":"idle"}}},"after":{"500":{"actions":[{"type":"setBotMessage","params":{"message":{"stateId":"PlEuHVlx_IauWaCKVp5Ba","id":"qPhQY4lWLqJ396VtvUjCU","text":"Hi Crazy","type":"text"}}}]}},"entry":[{"type":"thinking"},{"type":"setType","params":{"type":"text"}}],"on":{"next":"oNnXhnep8_R_SymbL8_Hp"}},"oNnXhnep8_R_SymbL8_Hp":{"initial":"idle","states":{"idle":{"on":{"send_message":{"target":"send_message","internal":false},"receive_message":{"target":"receive_message","internal":false}}},"send_message":{"after":{"700":{"actions":[{"type":"setTriggerMessage"}],"target":"idle"}},"entry":{"type":"thinking"}},"receive_message":{"entry":[{"type":"setUserMessage"}],"always":{"target":"idle"}}},"entry":{"type":"thinking"},"after":{"500":{"actions":{"type":"setBotMessage","params":{"message":{"type":"image","label":"Simple Image","image":"https://firebasestorage.googleapis.com/v0/b/chatbot-eda13.appspot.com/o/uploads%2Ficegif-17.gif?alt=media&token=325b4c5a-3c0d-42f7-9523-93ea9575b49a","nextAction":"qlx45Bjbd-4AiBh8X9o4O","text":"Hello ","id":"heCdRgo4LsDIA4hE9NF1P","stateId":"oNnXhnep8_R_SymbL8_Hp"}}}}},"on":{"next":"qlx45Bjbd-4AiBh8X9o4O"}},"qlx45Bjbd-4AiBh8X9o4O":{"initial":"idle","states":{"idle":{"on":{"send_message":{"target":"send_message","internal":false},"receive_message":{"target":"receive_message","internal":false}}},"send_message":{"after":{"700":{"actions":[{"type":"setTriggerMessage"}],"target":"idle"}},"entry":{"type":"thinking"}},"receive_message":{"entry":[{"type":"setUserMessage"}],"always":{"target":"idle"}}},"entry":{"type":"thinking"},"after":{"500":{"actions":{"type":"setBotMessage","params":{"message":{"type":"link","text":"These are super links lol","id":"rI4uLymc5UvHXrrWrPYYd","links":["https://www.youtube.com/watch?v=fJcZL7SAsGM","google.com"]}}}}},"on":{}}},"initial":"1","id":"root","on":{"1start":{"target":".PlEuHVlx_IauWaCKVp5Ba","internal":false},"PlEuHVlx_IauWaCKVp5Banext":".oNnXhnep8_R_SymbL8_Hp","oNnXhnep8_R_SymbL8_Hpnext":".qlx45Bjbd-4AiBh8X9o4O","set_param_value":{"actions":[{"type":"setParamValue"},{"type":"goToNext"}]}}}`
// );

const machine = setup({
  actions: {
    test_log: () => console.log("test"),
    setBotMessage: assign({
      thinking: false,
      type: (_, { message }) => message.type,
      messages: ({ context }, { message }) => {
        return [...context.messages, message];
      },
    }),
    setCurrentParamName: assign({
      currenParamName: (_, { currentParamName }) => currentParamName,
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
    <ChatContainer
      send={send}
      thinking={state.context.thinking}
      messages={chatContext.messages}
    />
  );
}
