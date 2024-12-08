import { ActionIcon } from "@mantine/core";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import React, { useState } from "react";
import { CodeCopyButtonProps } from "./CodeCopyButton.types";

export default function CodeCopyButton({ children }: CodeCopyButtonProps) {
  const [copyOk, setCopyOk] = useState(false);

  const handleClick = () => {
    if (React.isValidElement(children)) {
      navigator.clipboard.writeText(children.props.children);
    }

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 900);
  };

  return (
    <ActionIcon
      style={{ position: "absolute", right: 42, marginTop: 4 }}
      variant="light"
      onClick={handleClick}
    >
      {copyOk ? <IconCopyCheck /> : <IconCopy />}
    </ActionIcon>
  );
}
