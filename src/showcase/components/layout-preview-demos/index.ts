import type { Component } from "svelte";
import ArticlePreview from "./article.svelte";
import AuthShellPreview from "./auth-shell.svelte";
import BentoPreview from "./bento.svelte";
import GridPreview from "./grid.svelte";
import MasonryPreview from "./masonry.svelte";
import MediaSplitPreview from "./media-split.svelte";
import OverlapPreview from "./overlap.svelte";
import RailPreview from "./rail.svelte";
import RuledPreview from "./ruled.svelte";
import SectionPreview from "./section.svelte";
import SplitPreview from "./split.svelte";
import StackPreview from "./stack.svelte";
import ClusterPreview from "./cluster.svelte";
import SwitcherPreview from "./switcher.svelte";
import ReelPreview from "./reel.svelte";
import CoverPreview from "./cover.svelte";
import CenterPreview from "./center.svelte";
import FramePreview from "./frame.svelte";
import ImposterPreview from "./imposter.svelte";
import PancakePreview from "./pancake.svelte";

export const layoutPreviewDemos: Record<string, Component> = {
  article: ArticlePreview,
  "auth-shell": AuthShellPreview,
  bento: BentoPreview,
  grid: GridPreview,
  masonry: MasonryPreview,
  "media-split": MediaSplitPreview,
  overlap: OverlapPreview,
  rail: RailPreview,
  ruled: RuledPreview,
  section: SectionPreview,
  split: SplitPreview,
  stack: StackPreview,
  cluster: ClusterPreview,
  switcher: SwitcherPreview,
  reel: ReelPreview,
  cover: CoverPreview,
  center: CenterPreview,
  frame: FramePreview,
  imposter: ImposterPreview,
  pancake: PancakePreview,
};
