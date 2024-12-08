import { Card, Flex, useMantineTheme } from "@mantine/core";
import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { promptBaseAtom } from "../../../jotai/atoms";
import ReloadAndDeleteActions from "../ReloadAndDeleteActions/ReloadAndDeleteActions";
import { UserMessageProps } from "./UserMessage.types";

export default function UserMessage({
  message,
  index,
  messages,
  isLoading,
  reload,
  removeMessage,
  model,
}: UserMessageProps) {
  const theme = useMantineTheme();

  const [promptBase] = useAtom(promptBaseAtom);

  return (
    <Flex
      id={message.id}
      direction={"column"}
      flex={1}
      key={index}
      align={"flex-end"}
      mb={16}
      mt={index === 0 ? 0 : 16}
    >
      <Flex
        style={{
          position: "relative",
          paddingRight: 20,
          width: "100%",
        }}
        justify={"flex-end"}
      >
        <Card
          shadow="sm"
          px="md"
          py={0}
          radius="md"
          withBorder
          style={{
            width: "100%",
            maxWidth: "70%",
            borderColor: theme.colors["bright-yellow"][6],
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </Card>
        {index === messages?.length - 1 && !isLoading && (
          <ReloadAndDeleteActions
            message={message}
            model={model}
            promptBase={promptBase}
            reload={reload}
            removeMessage={removeMessage}
            isUserRole
          />
        )}
      </Flex>
    </Flex>
  );
}
