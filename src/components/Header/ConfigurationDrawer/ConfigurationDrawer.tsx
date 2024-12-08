import {
  Chip,
  Drawer,
  Flex,
  Group,
  MultiSelect,
  Select,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { promptBaseAtom, selectedModelsAtom } from "../../../jotai/atoms";
import { models } from "../../../utils/modelsOptions";
import {
  chipGroups,
  languageConfig,
  technologyConfig,
} from "../HeaderSearch.data";
import { ConfigurationDrawerProps } from "./ConfigurationDrawer.types";

export default function ConfigurationDrawer({
  settingsOpened,
  closeSettings,
}: ConfigurationDrawerProps) {
  const [personality, setPersonality] = useState<string>(
    chipGroups[0].default as string
  );
  const [responseStyle, setResponseStyle] = useState<string>(
    chipGroups[1].default as string
  );
  const [codeStyle, setCodeStyle] = useState<string[]>(
    chipGroups[2].default as string[]
  );
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageConfig.options.find((opt) => opt.value === languageConfig.default)
      ?.label || ""
  );
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [selectedModels, setSelectedModels] = useAtom(selectedModelsAtom);

  const handleLanguageChange = (value: string) => {
    const selected = languageConfig.options.find((opt) => opt.label === value);
    if (selected) {
      setSelectedLanguage(selected.label);
    }
  };

  const [, setPromptBase] = useAtom(promptBaseAtom);

  useEffect(() => {
    const finalPrompt = [
      chipGroups[0]?.options?.find((opt) => opt.value === personality)?.command,
      chipGroups[1]?.options?.find((opt) => opt.value === responseStyle)
        ?.command,
      codeStyle
        ?.map(
          (style) =>
            chipGroups[2].options.find((opt) => opt.value === style)?.command
        )
        ?.join(" "),
      languageConfig?.options.find((opt) => opt.label === selectedLanguage)
        ?.command,
      technologyConfig?.command(selectedTechnologies),
    ]
      .filter(Boolean)
      .join("\n");

    setPromptBase(finalPrompt);
  }, [
    codeStyle,
    personality,
    responseStyle,
    selectedLanguage,
    selectedTechnologies,
    setPromptBase,
  ]);

  return (
    <Drawer
      position="right"
      opened={settingsOpened}
      onClose={closeSettings}
      title="Customize Pixel"
    >
      <Flex direction="column" gap="xl" mt={10}>
        <MultiSelect
          label="Which models should it use?"
          placeholder="Select your favorite models"
          data={models}
          value={selectedModels}
          onChange={(value) => {
            if (value.length > 0) {
              setSelectedModels(value);
            }
          }}
          maxValues={3}
          searchable
        />

        {chipGroups.map((group) => (
          <Flex key={group.key} direction="column" gap={2}>
            <Text span size="sm">
              {group.label}
            </Text>
            <Chip.Group
              multiple={group.multiple}
              value={
                group.key === "personality"
                  ? personality
                  : group.key === "responseStyle"
                  ? responseStyle
                  : codeStyle
              }
              onChange={(value) => {
                if (group.key === "personality") {
                  setPersonality(value as string);
                }
                if (group.key === "responseStyle") {
                  setResponseStyle(value as string);
                }
                if (group.key === "codeStyle") {
                  setCodeStyle(value as string[]);
                }
              }}
            >
              <Group>
                {group.options.map((option) => (
                  <Chip key={option.value} value={option.value}>
                    {option.label}
                  </Chip>
                ))}
              </Group>
            </Chip.Group>
          </Flex>
        ))}
        <Select
          label={languageConfig.label}
          data={languageConfig.options.map((opt) => opt.label)}
          value={selectedLanguage}
          onChange={(value) => handleLanguageChange(value ?? "")}
        />
        <MultiSelect
          label={technologyConfig.label}
          data={technologyConfig.data}
          placeholder={technologyConfig.placeholder}
          value={selectedTechnologies}
          onChange={setSelectedTechnologies}
          searchable
        />
      </Flex>
    </Drawer>
  );
}
