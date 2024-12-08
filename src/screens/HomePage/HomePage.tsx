"use client";
import { useMediaQuery } from "@mantine/hooks";
import Chat from "../../components/Chat/Chat";
import { HeaderSearch } from "../../components/Header/HeaderSearch";
import MobileMessage from "../../components/MobileMessage/MobileMessage";

export default function HomePage() {
  const matches = useMediaQuery("(max-width: 60em)");

  return (
    <>
      {matches ? (
        <MobileMessage />
      ) : (
        <>
          <HeaderSearch />
          <Chat />
        </>
      )}
    </>
  );
}
