import { ActionIcon, Flex } from "@mantine/core";
import { IconReload, IconX } from "@tabler/icons-react";
import { ReloadAndDeleteActionsProps } from "./ReloadAndDeleteActions.types";

export default function ReloadAndDeleteActions({
  message,
  reload,
  removeMessage,
  model,
  promptBase,
  isUserRole = false,
}: ReloadAndDeleteActionsProps) {
  const complementPosition = isUserRole ? { right: -7 } : { left: -7 };
  return (
    <Flex
      direction={"column"}
      justify={"flex-end"}
      hidden={false}
      style={{
        position: "absolute",
        bottom: 0,
        ...complementPosition,
        zIndex: 1,
      }}
    >
      <ActionIcon
        variant="transparent"
        radius={"lg"}
        onClick={() =>
          reload({
            data: {
              model: model ?? "gemini-1.5-pro",
              promptBase,
            },
          })
        }
      >
        <IconReload size={20} />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        radius={"lg"}
        onClick={() => removeMessage(message.id)}
      >
        <IconX size={20} />
      </ActionIcon>
    </Flex>
  );
}
