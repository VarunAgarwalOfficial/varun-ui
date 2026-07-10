<script lang="ts" module>
  import peep1Asset from "$lib/assets/characters/varunui/peep-1.svg";
  import peepSitting1Asset from "$lib/assets/characters/varunui/peep-sitting-1.svg";
  import peepStanding1Asset from "$lib/assets/characters/varunui/peep-standing-1.svg";
  import peepStanding12Asset from "$lib/assets/characters/varunui/peep-standing-12.svg";
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  export const diyHowToTutorialDemo = {};
</script>

<script lang="ts">
  import {
    CheckCircle2,
    Gauge,
    Lightbulb,
    Share2,
    Target,
    ThumbsUp,
    WrenchIcon,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import ArticleMeta from "$lib/components/varunui/piece/article-meta.svelte";
  import Article from "$lib/components/varunui/layout/article.svelte";
  import Frame from "$lib/components/varunui/layout/frame.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";

  const author = {
    name: "Alex Thompson",
    title: "DevOps Engineer",
    avatar: {
      src: peep1Asset,
      alt: "Alex Thompson",
    },
    href: "?",
  };

  const heroImage = {
    src: peepStanding23Asset,
    alt: "Developer workspace setup",
  };

  const tools = [
    { name: "Terminal/Command Line", required: true },
    { name: "Code Editor (VS Code recommended)", required: true },
    { name: "Git", required: true },
    { name: "Node.js", required: true },
    { name: "Docker", required: false },
  ];

  const learningGoals = [
    "Install and configure essential development tools",
    "Set up version control with Git",
    "Configure your code editor for productivity",
    "Create a consistent development workflow",
    "Best practices for environment management",
  ];

  function toolIconClass(required: boolean) {
    return required ? "size-4 text-primary" : "size-4 text-muted-foreground";
  }
</script>

{#snippet Header()}
  <div class="flex flex-wrap items-center gap-2">
    <Badge variant="muted">Development</Badge>
    <span
      class="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success"
    >
      <Gauge class="size-3" aria-hidden="true" />
      Beginner
    </span>
  </div>

  <h1 class="mt-4 text-balance text-3xl font-bold tracking-normal text-foreground md:text-4xl">
    How to Set Up a Local Development Environment
  </h1>

  <p class="mt-3 text-lg leading-8 text-muted-foreground">
    Setting up a proper local development environment is the foundation for productive coding. This
    guide walks you through everything from installing essential tools to configuring your IDE for
    maximum efficiency.
  </p>

  <div class="mt-6">
    <ArticleMeta {author} date="January 17, 2026" readTime="45 minutes" size="md" icons />
  </div>
{/snippet}

{#snippet HeroMedia()}
  <div class="bg-muted">
    <Frame ratio="wide">
      <img class="absolute inset-0 size-full object-cover" src={heroImage.src} alt={heroImage.alt} />
    </Frame>
  </div>
{/snippet}

<Section bleed>
<Article media={HeroMedia} header={Header}>
  <div class="mb-10 grid gap-4 md:grid-cols-2">
    <section class="rounded-none border border-border p-4">
      <div class="flex items-center gap-2 font-medium text-foreground">
        <WrenchIcon class="size-4 text-primary" aria-hidden="true" />
        Tools Needed
      </div>
      <ul class="mt-3 space-y-2">
        {#each tools as tool (tool.name)}
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 class={toolIconClass(tool.required)} aria-hidden="true" />
            <span>{tool.name}</span>
            {#if !tool.required}
              <span class="text-xs">(optional)</span>
            {/if}
          </li>
        {/each}
      </ul>
    </section>

    <section class="rounded-none border border-border p-4">
      <div class="flex items-center gap-2 font-medium text-foreground">
        <Target class="size-4 text-primary" aria-hidden="true" />
        What You'll Learn
      </div>
      <ul class="mt-3 space-y-2">
        {#each learningGoals as goal (goal)}
          <li class="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            <span>{goal}</span>
          </li>
        {/each}
      </ul>
    </section>
  </div>

  <div class="space-y-8">
    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          1
        </div>
        <h2 class="text-xl font-semibold text-foreground">Install a Package Manager</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Start by installing a package manager for your operating system. On macOS, install
            Homebrew by opening Terminal and running the installation script from brew.sh. On
            Windows, install Chocolatey or use winget. On Linux, you likely already have apt, dnf, or
            pacman.
          </p>
        </div>
        <div class="aspect-video overflow-hidden rounded-md bg-muted">
          <img
            class="size-full object-cover"
            src={peepSitting1Asset}
            alt="Terminal window"
          />
        </div>
        <aside class="flex gap-3 rounded-md bg-primary/10 p-4">
          <Lightbulb class="size-5 shrink-0 text-primary" aria-hidden="true" />
          <p class="text-sm leading-6 text-muted-foreground">
            Package managers make installing and updating software much easier. Always use them
            instead of manual downloads when possible.
          </p>
        </aside>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          2
        </div>
        <h2 class="text-xl font-semibold text-foreground">Install Git for Version Control</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Git is essential for version control and collaboration. Install it using your package
            manager, then configure your identity with
            <code>git config --global user.name</code> and
            <code>git config --global user.email</code>.
          </p>
        </div>
        <aside class="flex gap-3 rounded-md bg-primary/10 p-4">
          <Lightbulb class="size-5 shrink-0 text-primary" aria-hidden="true" />
          <p class="text-sm leading-6 text-muted-foreground">
            Set up SSH keys for GitHub or GitLab to avoid entering passwords for every push. Check
            the platform's documentation for step-by-step instructions.
          </p>
        </aside>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          3
        </div>
        <h2 class="text-xl font-semibold text-foreground">Choose and Install a Code Editor</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Visual Studio Code is the most popular choice for web development, but alternatives like
            WebStorm, Sublime Text, or Neovim work great too. Download VS Code from
            code.visualstudio.com or install it through your package manager.
          </p>
        </div>
        <div class="aspect-video overflow-hidden rounded-md bg-muted">
          <img
            class="size-full object-cover"
            src={peepStanding12Asset}
            alt="Code editor on screen"
          />
        </div>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          4
        </div>
        <h2 class="text-xl font-semibold text-foreground">Install Essential VS Code Extensions</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Enhance your editor with the must-have extensions: ESLint for code linting, Prettier for
            code formatting, GitLens for Git integration, Auto Rename Tag for HTML and JSX, and a
            theme like One Dark Pro or GitHub Theme.
          </p>
        </div>
        <aside class="flex gap-3 rounded-md bg-primary/10 p-4">
          <Lightbulb class="size-5 shrink-0 text-primary" aria-hidden="true" />
          <p class="text-sm leading-6 text-muted-foreground">
            Do not install too many extensions at once. Start with the essentials and add more as you
            discover real needs.
          </p>
        </aside>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          5
        </div>
        <h2 class="text-xl font-semibold text-foreground">Install Node.js and npm</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Node.js is required for most JavaScript and TypeScript development. Instead of installing
            it directly, use a version manager like nvm so you can switch between Node versions
            easily. Install nvm first, then use <code>nvm install --lts</code> for the latest stable
            version.
          </p>
        </div>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          6
        </div>
        <h2 class="text-xl font-semibold text-foreground">Set Up Your Terminal</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            A good terminal setup improves your daily workflow significantly. On macOS, consider
            iTerm2 with Oh My Zsh. On Windows, use Windows Terminal with PowerShell or WSL2.
            Configure aliases for common commands and add syntax highlighting.
          </p>
        </div>
        <div class="aspect-video overflow-hidden rounded-md bg-muted">
          <img
            class="size-full object-cover"
            src={peepStanding1Asset}
            alt="Terminal configuration"
          />
        </div>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          7
        </div>
        <h2 class="text-xl font-semibold text-foreground">Configure Git Aliases and Settings</h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Speed up your Git workflow with aliases. Add shortcuts for common commands such as
            <code>git config --global alias.co checkout</code>,
            <code>git config --global alias.br branch</code>, and
            <code>git config --global alias.st status</code>. Also set your default branch name and
            configure pull behavior.
          </p>
        </div>
        <aside class="flex gap-3 rounded-md bg-primary/10 p-4">
          <Lightbulb class="size-5 shrink-0 text-primary" aria-hidden="true" />
          <p class="text-sm leading-6 text-muted-foreground">
            Create a global gitignore file for files you never want to commit, such as
            <code>.DS_Store</code>, <code>node_modules</code>, and <code>.env</code>.
          </p>
        </aside>
      </div>
      <div class="absolute left-[19px] top-14 h-[calc(100%-16px)] w-px bg-border"></div>
    </section>

    <section class="relative">
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-background"
        >
          8
        </div>
        <h2 class="text-xl font-semibold text-foreground">
          Install Docker (Optional but Recommended)
        </h2>
      </div>
      <div class="space-y-4 pl-[52px]">
        <div class="article-prose">
          <p>
            Docker helps create consistent development environments and run services locally.
            Download Docker Desktop from docker.com. Once installed, you can spin up databases,
            caches, and other services without installing them directly on your machine.
          </p>
        </div>
      </div>
    </section>
  </div>

  <section class="mt-10 rounded-md bg-muted/50 p-6">
    <div class="flex items-center gap-2 font-semibold text-foreground">
      <CheckCircle2 class="size-5 text-success" aria-hidden="true" />
      All Done!
    </div>
    <p class="mt-2 text-muted-foreground">
      Congratulations! You now have a professional development environment ready for any project.
      Remember, this setup will evolve over time, so keep experimenting with tools and
      configurations that fit your workflow.
    </p>
  </section>

  <div class="mt-10 flex items-center justify-between border-t border-border pt-6">
    <a href="?" class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
      <ThumbsUp class="size-4" aria-hidden="true" />
      Helpful (342)
    </a>
    <a href="?" class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
      <Share2 class="size-4" aria-hidden="true" />
      Share
    </a>
  </div>
</Article>
</Section>
