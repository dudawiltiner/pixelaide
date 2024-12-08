"use client";

import { createTheme, Loader } from "@mantine/core";
import { RingLoader } from "./src/components/RingLoader/RingLoader";

export const theme = createTheme({
  primaryColor: "bright-yellow",
  colors: {
    "bright-yellow": [
      "#fff8e1",
      "#ffeecb",
      "#ffdc9a",
      "#ffc964",
      "#ffb938",
      "#ffaf1b",
      "#ffaa09",
      "#e39400",
      "#cb8300",
      "#b07000",
    ],
  },
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: "ring",
      },
    }),
  },
});
