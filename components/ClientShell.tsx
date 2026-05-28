"use client";

import { LoadingScreen } from "./LoadingScreen";
import { BottomNav } from "./BottomNav";

export function ClientShell({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <LoadingScreen />
      {children}
      <BottomNav />
    </>
  );
}
