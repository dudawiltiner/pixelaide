"use client";
import {
  ActionIcon,
  Avatar,
  Burger,
  Group,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/spotlight/styles.css";
import { IconBoxAlignTopFilled, IconSettings } from "@tabler/icons-react";
import ConfigurationDrawer from "./ConfigurationDrawer/ConfigurationDrawer";
import { DarkModeToggle } from "./DarkModeToggle/DarkModeToggle";
import classes from "./HeaderSearch.module.css";
import SearchInput from "./SearchInput/SearchInput";
import "./styles.css";

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const [settingsOpened, { open: openSettings, close: closeSettings }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  const avatarUrl =
    "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-1.jpg";

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <ThemeIcon
            variant="gradient"
            gradient={{
              from: "pink",
              to: theme.colors["bright-yellow"][8],
              deg: 90,
            }}
          >
            <IconBoxAlignTopFilled size={28} />
          </ThemeIcon>
          <Text>PixelAIde</Text>
        </Group>
        <SearchInput />
        <Group>
          <Avatar size="md" radius="xl" src={avatarUrl} />
          <DarkModeToggle />
          <ActionIcon
            onClick={openSettings}
            size="md"
            variant="transparent"
            radius="lg"
          >
            <IconSettings size={24} />
          </ActionIcon>
        </Group>

        <ConfigurationDrawer
          closeSettings={closeSettings}
          settingsOpened={settingsOpened}
        />
      </div>
    </header>
  );
}
