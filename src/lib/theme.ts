export type PaperTheme = "light" | "dark";

export const paperThemes = ["light", "dark"] as const;
export const activeThemeStorageKey = "varunui-paper-theme";

export function isPaperTheme(value: string | null): value is PaperTheme {
  return value === "light" || value === "dark";
}

export function readPaperTheme(): PaperTheme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(activeThemeStorageKey);
  return isPaperTheme(stored) ? stored : "light";
}

export function applyPaperTheme(theme: PaperTheme) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return theme;
  }

  const root = document.documentElement;
  root.classList.remove(...paperThemes);
  root.classList.add(theme);
  root.style.colorScheme = theme;
  window.localStorage.setItem(activeThemeStorageKey, theme);
  window.dispatchEvent(
    new CustomEvent("varunui-theme-change", { detail: { theme } }),
  );

  return theme;
}

export function togglePaperTheme(theme: PaperTheme) {
  return applyPaperTheme(theme === "light" ? "dark" : "light");
}
