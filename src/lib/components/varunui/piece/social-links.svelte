<script lang="ts" module>
  export type SocialLinkIcon =
    | "twitter"
    | "github"
    | "linkedin"
    | "facebook"
    | "instagram"
    | "youtube"
    | "dribbble";

  export interface SocialLink {
    icon: SocialLinkIcon;
    href: string;
    label: string;
  }

  export interface SocialLinksProps {
    links: SocialLink[];
  }

  export const socialLinksDemo: SocialLinksProps = {
    links: [
      { icon: "twitter", href: "?", label: "X" },
      { icon: "github", href: "?", label: "GitHub" },
      { icon: "linkedin", href: "?", label: "LinkedIn" },
    ],
  };
</script>

<script lang="ts">
  import {
    Facebook,
    Dribbble,
    Github,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
  } from "$lib/components/varunui/internal/icons/phosphor.js";

  const socialIcons = {
    twitter: Twitter,
    github: Github,
    linkedin: Linkedin,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube,
    dribbble: Dribbble,
  };

  let { links }: SocialLinksProps = $props();
</script>

<div class="flex flex-wrap gap-2">
  {#each links as link, index (`${link.href}-${link.icon}-${link.label}-${index}`)}
    {@const Icon = socialIcons[link.icon]}
    <a
      href={link.href}
      aria-label={link.label}
      class="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground outline-none motion-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
    >
      <Icon class="size-4" aria-hidden="true" />
    </a>
  {/each}
</div>
