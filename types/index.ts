export type ThemeMode = "day" | "night";

export interface ContactPlatform {
  readonly id: "telegram" | "threads" | "github";
  readonly label: string;
  readonly handle: string;
  readonly href: string;
  readonly description: string;
}

export interface LocalTimeState {
  readonly mode: ThemeMode;
  readonly hour: number;
  readonly isReady: boolean;
}

export interface ScreenSize {
  readonly width: number;
  readonly height: number;
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;
}
