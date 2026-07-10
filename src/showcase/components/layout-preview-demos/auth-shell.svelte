<script lang="ts">
  import peepStanding23Asset from "$lib/assets/characters/varunui/peep-standing-23.svg";
  import Button from "$lib/components/varunui/component/button.svelte";
  import CheckboxField from "$lib/components/varunui/component/checkbox-field.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import Marker from "$lib/components/varunui/component/marker.svelte";
  import PasswordField from "$lib/components/varunui/component/password-field.svelte";
  import Link from "$lib/components/varunui/component/link.svelte";
  import AuthShell from "$lib/components/varunui/layout/auth-shell.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import StoryScene from "$lib/components/varunui/piece/story-scene.svelte";
</script>

<AuthShell>
  {#snippet context()}
    <StoryScene
      src={peepStanding23Asset}
      alt="A person welcoming someone back"
      tone="yellow"
    />
  {/snippet}

  {#snippet header()}
    <p class="mb-[var(--layout-gap-sm)] text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
      <Marker text="Secure access" tone="yellow" emphasis />
    </p>
    <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
      Welcome back
    </h1>
    <p class="mt-2 text-base leading-relaxed text-muted-foreground">
      Sign in to review the launch workspace.
    </p>
  {/snippet}

  <form onsubmit={(event) => event.preventDefault()}>
    <Stack gap="md">
      <InputField
        id="auth-shell-preview-email"
        label="Email"
        type="email"
        placeholder="nora@example.com"
        autocomplete="email"
        required
      />
      <PasswordField
        id="auth-shell-preview-password"
        label="Password"
        placeholder="Enter your password"
        autocomplete="current-password"
        required
      />
      <div class="flex flex-wrap items-center justify-between gap-[var(--layout-gap-sm)]">
        <CheckboxField label="Remember me" />
        <Link href="?" label="Forgot password?" />
      </div>
      <Button type="submit" size="lg" class="w-full">Sign in</Button>
    </Stack>
  </form>

  {#snippet footer()}
    <p class="text-center text-sm text-muted-foreground">
      Need access? Ask your workspace owner for an invite.
    </p>
  {/snippet}
</AuthShell>
