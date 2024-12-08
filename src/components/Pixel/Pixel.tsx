import {
  Button,
  Center,
  Flex,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconRobot } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { templateAtom, templateOptionsAtom } from "../../jotai/atoms";

function Pixel() {
  const [templateOptions] = useAtom(templateOptionsAtom);
  const [, setTemplate] = useAtom(templateAtom);

  const theme = useMantineTheme();

  return (
    <Center inline={false} style={{ width: "100%", height: "100vh" }}>
      <Flex direction={"column"} align={"center"}>
        <IconRobot color={theme.colors["bright-yellow"][7]} size={120} />

        <Title style={{ textAlign: "center" }} order={1} mb="xl">
          {`Hi, I'm Pixel! 👋`}
        </Title>
        <Text style={{ textAlign: "center" }} mb="xl" maw={600}>
          Your assistant for frontend development. Choose a template below, or
          type your question directly.
        </Text>

        <Group mb="xl" justify="center" maw={600}>
          {templateOptions.map((template, indx) => (
            <Button
              key={template?.title + indx}
              variant="outline"
              onClick={() => setTemplate(template?.description)}
            >
              {template?.title}
            </Button>
          ))}
        </Group>
      </Flex>
    </Center>
  );
}

export default Pixel;
