"use client";
import {
  Container,
  Flex,
  Loader,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { IconRobotFace, IconUser } from "@tabler/icons-react";
import { useChat } from "ai/react";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import {
  promptBaseAtom,
  spotlightActionsAtom,
  templateAtom,
} from "../../jotai/atoms";
import Pixel from "../Pixel/Pixel";
import PixelMessage from "./PixelMessage/PixelMessage";
import QuestionForm from "./QuestionForm/QuestionForm";
import ScrollNavigation from "./ScrollNavigation/ScrollNavigation";
import SelectModel from "./SelectModels/SelectModel";
import UserMessage from "./UserMessage/UserMessage";

export default function Chat() {
  const {
    messages,
    handleSubmit,
    input,
    error,
    handleInputChange,
    isLoading,
    stop,
    setMessages,
    reload,
  } = useChat();
  const theme = useMantineTheme();
  const [model, setModel] = useState<string>();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const startOfMessagesRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [isEndVisible, setIsEndVisible] = useState(true);

  const handleScroll = () => {
    if (scrollAreaRef.current && endOfMessagesRef.current) {
      const { top } = endOfMessagesRef.current.getBoundingClientRect();
      const { bottom } = scrollAreaRef.current.getBoundingClientRect();

      if (top <= bottom) {
        setIsEndVisible(true);
      } else {
        setIsEndVisible(false);
      }
    }
  };

  const [, setSpotlightActions] = useAtom(spotlightActionsAtom);

  const handleScrollToMessage = (messageId: string) => {
    const targetElement = document.getElementById(messageId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!isLoading && messages?.length > 0) {
      const actions = messages.map((message) => {
        return {
          id: message.id,
          label:
            message.role === "user"
              ? `Você - ${message.content?.slice(0, 35).trimEnd()}...`
              : `Pixel - ${message.content?.slice(0, 35).trimEnd()}...`,
          description: message.content,
          leftSection:
            message.role === "user" ? (
              <IconUser size={30} />
            ) : (
              <IconRobotFace size={30} />
            ),
          onClick: () => {
            handleScrollToMessage(message.id);
          },
        };
      });

      setSpotlightActions(actions);
    }
  }, [isLoading, messages, setSpotlightActions, theme.colors]);

  const [promptBase] = useAtom(promptBaseAtom);

  function removeMessage(msgId: string) {
    setMessages(messages.filter((m) => m.id !== msgId));
  }

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const [template, setTemplate] = useAtom(templateAtom);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e, {
        data: {
          model: model ?? "gemini-1.5-pro",
          promptBase,
        },
      });
      setTemplate(undefined);
    }
  };

  useEffect(() => {
    if (template && messages.length === 0) {
      handleInputChange({
        target: { value: template },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, [template]);

  return (
    <Container flex={1} size={"md"} display={"flex"} style={{ height: "87vh" }}>
      <Flex
        direction={"column"}
        flex={1}
        justify="space-between"
        align="center"
      >
        <SelectModel model={model} setModel={setModel} />
        {messages.length === 0 ? (
          <Pixel />
        ) : (
          <ScrollArea
            display={"flex"}
            flex={1}
            style={{ width: "95%", maxWidth: "95%", position: "relative" }}
            py={16}
            pr={16}
            ref={scrollAreaRef}
            onScroll={handleScroll}
            onScrollCapture={handleScroll}
            scrollbars={"y"}
          >
            <div ref={startOfMessagesRef} />
            {messages.map((message, index) =>
              message.role === "user" ? (
                <UserMessage
                  key={index}
                  message={message}
                  index={index}
                  messages={messages}
                  isLoading={isLoading}
                  removeMessage={removeMessage}
                  reload={reload}
                  model={model}
                />
              ) : (
                <PixelMessage
                  key={index}
                  message={message}
                  index={index}
                  messages={messages}
                  isLoading={isLoading}
                  removeMessage={removeMessage}
                  reload={reload}
                  model={model}
                />
              )
            )}
            {isLoading && <Loader />}
            {!isEndVisible && !isLoading && (
              <ScrollNavigation
                startOfMessagesRef={startOfMessagesRef}
                endOfMessagesRef={endOfMessagesRef}
              />
            )}
            <div ref={endOfMessagesRef} />
          </ScrollArea>
        )}
        <QuestionForm
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          isLoading={isLoading}
          stop={stop}
          handleSubmit={handleSubmit}
          model={model}
          setTemplate={setTemplate}
          error={error}
        />
      </Flex>
    </Container>
  );
}
