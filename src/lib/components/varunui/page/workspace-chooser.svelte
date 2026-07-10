<script lang="ts" module>
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  interface Workspace {
    name: string;
    detail: string;
    logoText: string;
    href?: string;
  }

  export interface WorkspaceChooserProps {
    heading?: string;
    description?: string;
    workspaces?: Workspace[];
    createWorkspace?: {
      label: string;
      href: string;
    };
    account?: {
      signedInLabel: string;
      email: string;
      signOutLabel: string;
      signOutHref: string;
    };
  }

  export const workspaceChooserDemo: WorkspaceChooserProps = {
    heading: "Choose a workspace",
    description: "Select a workspace to continue.",
    workspaces: [
      {
        name: "Design team",
        detail: "12 members",
        logoText: "CG",
        href: "?",
      },
      {
        name: "Research team",
        detail: "Owner \u00b7 4 members",
        logoText: "NR",
        href: "?",
      },
      { name: "Personal", detail: "Private", logoText: "MC", href: "?" },
    ],
    createWorkspace: {
      label: "Create a new workspace",
      href: "?",
    },
    account: {
      signedInLabel: "Signed in as",
      email: "maya@varunui.example",
      signOutLabel: "Sign out",
      signOutHref: "?",
    },
  };
</script>

<script lang="ts">
  import { ChevronRight, Plus } from "$lib/components/varunui/internal/icons/phosphor.js";
  import { cn } from "$lib/utils.js";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";

  let {
    heading,
    description,
    workspaces = [],
    createWorkspace,
    account,
  }: WorkspaceChooserProps = $props();

  let selectedWorkspace = $state("");

  $effect(() => {
    if (
      workspaces.length > 0 &&
      !workspaces.some((workspace) => workspace.name === selectedWorkspace)
    ) {
      selectedWorkspace = workspaces[0].name;
    }
  });
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person pointing the way to the right workspace"
      tone="purple"
    />
  {/snippet}

  {#snippet header()}
    {#if heading}
      <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">{heading}</h1>
    {/if}
    {#if description}
      <p class="mt-2 text-base leading-relaxed text-muted-foreground">{description}</p>
    {/if}
  {/snippet}

    <div class="overflow-hidden rounded-none border border-border">
      <ul class="divide-y">
        {#each workspaces as workspace}
          {@const isActive = selectedWorkspace === workspace.name}
          <li>
            <a
              href={workspace.href ?? "?"}
              onclick={() => (selectedWorkspace = workspace.name)}
              class={cn(
                "group/workspaceChooser flex items-center gap-4 p-4 motion-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                isActive && "bg-muted/60",
              )}
            >
              <span
                class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-foreground"
              >
                {workspace.logoText}
              </span>
              <span class="min-w-0 flex-1 text-left">
                <span class="block truncate font-medium">
                  {workspace.name}
                </span>
                <span class="block truncate text-sm text-muted-foreground">
                  {workspace.detail}
                </span>
              </span>
              <ChevronRight
                class={cn(
                  "size-4 shrink-0 text-muted-foreground motion-transform group-hover/workspaceChooser:translate-x-0.5",
                  isActive && "text-foreground",
                )}
                aria-hidden="true"
              />
            </a>
          </li>
        {/each}

        {#if createWorkspace}
          <li>
            <a
              href={createWorkspace.href}
              class="flex items-center gap-4 p-4 text-sm font-medium text-foreground motion-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span
                class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-dashed bg-background text-muted-foreground"
              >
                <Plus class="size-4" aria-hidden="true" />
              </span>
              <span>{createWorkspace.label}</span>
            </a>
          </li>
        {/if}
      </ul>
    </div>

  {#if account}
    {#snippet footer()}
      <p class="text-center text-sm text-muted-foreground">
        {account.signedInLabel}
        {account.email}
        <span aria-hidden="true"> &middot; </span>
        <a
          href={account.signOutHref}
          class="font-medium text-foreground hover:underline"
        >
          {account.signOutLabel}
        </a>
      </p>
    {/snippet}
  {/if}
</AuthShell>
