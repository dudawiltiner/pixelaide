import { Center, Flex, Text, Title, useMantineTheme } from "@mantine/core";
import { IconRobot } from "@tabler/icons-react";

function MobileMessage() {
  const theme = useMantineTheme();

  return (
    <Center
      inline={false}
      style={{ width: "100%", height: "100vh", padding: 16 }}
    >
      <Flex direction={"column"} align={"center"}>
        <IconRobot color={theme.colors["bright-yellow"][7]} size={120} />
        <Title style={{ textAlign: "center" }} order={1} mb="xl">
          {`Opps... 🤖`}
        </Title>
        <Text style={{ textAlign: "center" }} size="24px" mb="md" maw={600}>
          Access this application on desktop devices only.
        </Text>
      </Flex>
    </Center>
  );
}

export default MobileMessage;
