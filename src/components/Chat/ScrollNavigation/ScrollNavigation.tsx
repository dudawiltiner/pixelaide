import { ActionIcon, Flex } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { ScrollNavigationProps } from "./ScrollNavigation.types";

export default function ScrollNavigation({
  startOfMessagesRef,
  endOfMessagesRef,
}: ScrollNavigationProps) {
  return (
    <Flex pos={"absolute"} bottom={10} left={"46%"} gap={"sm"}>
      <ActionIcon
        variant="filled"
        onClick={() =>
          startOfMessagesRef?.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        <IconArrowUp size={20} />
      </ActionIcon>

      <ActionIcon
        variant="filled"
        onClick={() =>
          endOfMessagesRef?.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
      >
        <IconArrowDown size={20} />
      </ActionIcon>
    </Flex>
  );
}
