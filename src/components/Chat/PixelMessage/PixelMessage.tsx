import {
  ActionIcon,
  Blockquote,
  Flex,
  useMantineColorScheme,
} from "@mantine/core";
import { IconRobotFace } from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  gruvboxDark,
  gruvboxLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { useAtom } from "jotai";
import remarkGfm from "remark-gfm";
import { promptBaseAtom } from "../../../jotai/atoms";
import CodeCopyButton from "../CodeCopyButton/CodeCopyButton";
import ReloadAndDeleteActions from "../ReloadAndDeleteActions/ReloadAndDeleteActions";
import { PixelMessageProps } from "./PixelMessage.types";

export default function PixelMessage({
  message,
  index,
  messages,
  isLoading,
  reload,
  removeMessage,
  model,
}: PixelMessageProps) {
  const { colorScheme } = useMantineColorScheme();

  const syntaxHighlighterColor =
    colorScheme === "dark" ? gruvboxDark : gruvboxLight;

  const Pre = ({ children }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre>
      <CodeCopyButton>{children}</CodeCopyButton>
      {children}
    </pre>
  );

  const [promptBase] = useAtom(promptBaseAtom);

  return (
    <Flex
      key={index}
      style={{ position: "relative", paddingLeft: 8 }}
      id={message.id}
    >
      {index === messages?.length - 1 && !isLoading && (
        <ReloadAndDeleteActions
          message={message}
          model={model}
          promptBase={promptBase}
          reload={reload}
          removeMessage={removeMessage}
        />
      )}
      <Blockquote
        icon={
          <ActionIcon variant="filled" radius={"lg"}>
            <IconRobotFace size={20} />
          </ActionIcon>
        }
        mt="xs"
        ml={16}
        w={"810px"}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre: Pre,
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");

              return !inline && match ? (
                <SyntaxHighlighter
                  style={syntaxHighlighterColor}
                  PreTag="div"
                  language={match[1]}
                  wrapLongLines
                  wrapLines
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </Blockquote>
    </Flex>
  );
}
