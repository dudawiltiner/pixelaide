import { Switch, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export const DarkModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <IconSun size={16} />
      <Switch checked={isDark} onChange={() => toggleColorScheme()} size="md" />
      <IconMoonStars size={16} />
    </div>
  );
};
