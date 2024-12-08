import { Button, Flex, Kbd, rem } from "@mantine/core";
import { Spotlight, spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { spotlightActionsAtom } from "../../../jotai/atoms";
import classes from "../HeaderSearch.module.css";

export default function SearchInput() {
  const [spotlightActions] = useAtom(spotlightActionsAtom);

  return (
    <>
      <Button
        className={classes.search}
        leftSection={<IconSearch size={16} stroke={1.5} />}
        classNames={{
          inner: classes.searchInner,
          label: classes.searchLabel,
        }}
        rightSection={
          <Flex>
            <Kbd>⌘ K</Kbd>
          </Flex>
        }
        onClick={spotlight.open}
        variant="default"
        visibleFrom="xs"
      >
        Search for answers
      </Button>
      <Spotlight
        actions={spotlightActions}
        nothingFound="Nothing found"
        highlightQuery
        scrollable
        maxHeight={350}
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "Searching...",
        }}
      />
    </>
  );
}
