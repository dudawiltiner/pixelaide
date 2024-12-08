import { Flex, SegmentedControl } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { selectedModelsAtom } from "../../../jotai/atoms";
import { models } from "../../../utils/modelsOptions";
import { SelectModelProps } from "./SelectModel.types";

export default function SelectModel({ model, setModel }: SelectModelProps) {
  const [selectedModels] = useAtom(selectedModelsAtom);

  const selectedModelsFiltered = models.filter((item) =>
    selectedModels?.includes(item.value)
  );

  useEffect(() => {
    if (selectedModels.length > 0) {
      setModel(selectedModelsFiltered[0]?.value);
    }
  }, [selectedModels]);

  return (
    <Flex justify={"center"} mt={16}>
      <SegmentedControl
        value={model ?? selectedModelsFiltered[0]?.value ?? ""}
        color="pink"
        data={selectedModelsFiltered}
        onChange={(value) => {
          setModel(value);
        }}
      />
    </Flex>
  );
}
