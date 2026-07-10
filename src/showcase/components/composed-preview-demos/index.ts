import type { Component } from "svelte";
import ActionRowPreview from "./action-row.svelte";
import AppShellPreview from "./app-shell.svelte";
import BadgePreview from "./badge.svelte";
import ButtonPreview from "./button.svelte";
import CardPreview from "./card.svelte";
import ChartFigurePreview from "./chart-figure.svelte";
import DataCaptionPreview from "./data-caption.svelte";
import DialogPreview from "./dialog.svelte";
import FeatureCardPreview from "./feature-card.svelte";
import FooterPreview from "./footer.svelte";
import InputPreview from "./input.svelte";
import NavbarPreview from "./navbar.svelte";

export const composedPreviewDemos: Record<string, Component> = {
  "pieces:action-row": ActionRowPreview,
  "components:app-shell": AppShellPreview,
  "components:badge": BadgePreview,
  "components:button": ButtonPreview,
  "components:card": CardPreview,
  "components:data-caption": DataCaptionPreview,
  "components:dialog": DialogPreview,
  "components:input": InputPreview,
  "pieces:chart-figure": ChartFigurePreview,
  "pieces:feature-card": FeatureCardPreview,
  "pieces:footer": FooterPreview,
  "components:navbar": NavbarPreview,
};
