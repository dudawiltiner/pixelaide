import {
  ActionIcon,
  Alert,
  Flex,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconPlayerStopFilled,
  IconSend,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { promptBaseAtom } from "../../../jotai/atoms";
import { QuestionFormProps } from "./QuestionForm.types";

export default function QuestionForm({
  input,
  handleInputChange,
  handleKeyDown,
  isLoading,
  stop,
  handleSubmit,
  model,
  setTemplate,
  error,
}: QuestionFormProps) {
  const [promptBase] = useAtom(promptBaseAtom);
  const theme = useMantineTheme();

  const ratelimitedError = error?.message === "Ratelimited!";

  return (
    <Flex
      direction={"column"}
      style={{ width: "93%" }}
      gap={"sm"}
      align={"flex-start"}
    >
      {error && ratelimitedError && (
        <Alert
          variant="light"
          color={theme.colors["bright-yellow"][7]}
          title="Warning"
          icon={<IconInfoCircle />}
          maw={"50%"}
        >
          You have reached your message sending limit. You have 3 attempts
          within 6 minutes.
        </Alert>
      )}
      {error && !ratelimitedError && (
        <Alert
          variant="light"
          color="red"
          title="Error"
          icon={<IconInfoCircle />}
          maw={"50%"}
        >
          Something went wrong, try again or change model.
        </Alert>
      )}
      <Flex
        flex={1}
        gap={"xs"}
        justify="center"
        align="center"
        style={{ width: "100%" }}
      >
        <Textarea
          flex={1}
          size="lg"
          placeholder="Digite sua mensagem"
          autosize
          maxRows={6}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rightSection={
            <ActionIcon
              size="lg"
              variant="light"
              onClick={(e) => {
                if (isLoading) {
                  stop();
                } else {
                  handleSubmit(e, {
                    data: {
                      model: model ?? "gemini-1.5-pro",
                      promptBase,
                    },
                  });
                  setTemplate(undefined);
                }
              }}
            >
              {isLoading ? (
                <IconPlayerStopFilled size={20} />
              ) : (
                <IconSend size={20} />
              )}
            </ActionIcon>
          }
          rightSectionProps={{
            style: { display: "flex", alignItems: "flex-end", margin: 7 },
          }}
        />
      </Flex>
    </Flex>
  );
}
