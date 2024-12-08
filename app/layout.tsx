import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Provider } from "jotai";
import { theme } from "../theme";

export const metadata = {
  title: "PixelAIde",
  description: "PixelAIde is an assistant for frontend developers.",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <Provider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
