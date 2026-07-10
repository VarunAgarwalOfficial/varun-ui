<script lang="ts" module>
  export interface AccountSettingsProps {
    heading?: string;
    description?: string;
    displayName?: string;
    email?: string;
    onSave?: () => void;
    onRequestRemoval?: () => void;
  }

  export const accountSettingsDemo: AccountSettingsProps = {
    heading: "Account settings",
    description:
      "Update the identity, locale, and personal notifications that follow you across varunUI workspaces.",
    displayName: "Maya Chen",
    email: "maya@varunui.example",
  };
</script>

<script lang="ts">
  import { untrack } from "svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import BreadcrumbNav from "$lib/components/varunui/component/breadcrumb-nav.svelte";
  import HoldToConfirm from "$lib/components/varunui/component/hold-to-confirm.svelte";
  import InputField from "$lib/components/varunui/component/input-field.svelte";
  import SelectField from "$lib/components/varunui/component/select-field.svelte";
  import SidebarNav from "$lib/components/varunui/component/sidebar-nav.svelte";
  import SwitchField from "$lib/components/varunui/component/switch-field.svelte";
  import Rail from "$lib/components/varunui/layout/rail.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import Stack from "$lib/components/varunui/layout/stack.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";
  import StatusLine from "$lib/components/varunui/piece/status-line.svelte";

  let {
    heading = "Account settings",
    description = "Update the identity, locale, and personal notifications that follow you across varunUI workspaces.",
    displayName: initialDisplayName = "Maya Chen",
    email: initialEmail = "maya@varunui.example",
    onSave,
    onRequestRemoval,
  }: AccountSettingsProps = $props();

  let displayName = $state(untrack(() => initialDisplayName));
  let email = $state(untrack(() => initialEmail));
  let timezone = $state("sydney");
  let productUpdates = $state(true);
  let weeklyDigest = $state(true);
  let saved = $state(false);
  let removalRequested = $state(false);

  function saveAccount(event: SubmitEvent) {
    event.preventDefault();
    saved = true;
    onSave?.();
  }

  function requestRemoval() {
    removalRequested = true;
    onRequestRemoval?.();
  }
</script>

<Section container="max" size="sm">
  <Stack gap="lg">
    <BreadcrumbNav
      homeHref="?"
      homeLabel="varunUI home"
      items={[
        { label: "Account", href: "?" },
        { label: "Settings", current: true },
      ]}
    />

    <Rail>
      {#snippet rail()}
        <div class="border-y border-border">
          <SidebarNav
            label="Account settings"
            sections={[
              {
                label: "Personal",
                items: [
                  { label: "Profile", active: true },
                  { label: "Notifications" },
                  { label: "Security" },
                ],
              },
              {
                label: "Workspace",
                items: [
                  { label: "Members" },
                  { label: "Billing" },
                ],
              },
            ]}
          />
        </div>
      {/snippet}

      <Stack gap="xl">
        <SectionHeader
          kicker="Your account"
          markerTone="red"
          title={heading}
          {description}
          align="left"
          size="lg"
          level={1}
        />

        <form onsubmit={saveAccount}>
          <Stack gap="lg">
            <section
              aria-labelledby="settings-profile-heading"
              class="border-y border-border py-[var(--surface-padding-lg)]"
            >
              <Stack gap="md">
                <div>
                  <h2 id="settings-profile-heading" class="text-xl font-semibold tracking-tight">
                    Profile and locale
                  </h2>
                  <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
                    These details follow you into every workspace you join.
                  </p>
                </div>

                <div class="grid gap-[var(--layout-gap-md)] md:grid-cols-2">
                  <InputField
                    bind:value={displayName}
                    label="Display name"
                    autocomplete="name"
                    required
                  />
                  <InputField
                    bind:value={email}
                    label="Email address"
                    type="email"
                    autocomplete="email"
                    required
                  />
                </div>

                <SelectField
                  bind:value={timezone}
                  label="Timezone"
                  description="Used for dates, reminders, and activity summaries."
                  options={[
                    { label: "Sydney · UTC+10", value: "sydney" },
                    { label: "London · UTC+1", value: "london" },
                    { label: "New York · UTC−4", value: "new-york" },
                    { label: "San Francisco · UTC−7", value: "san-francisco" },
                  ]}
                />

                {#if saved}
                  <StatusLine
                    label="Account settings saved"
                    description="The new details now apply across your varunUI workspaces."
                    meta="Saved"
                    tone="success"
                  />
                {/if}

                <Button type="submit">Save account</Button>
              </Stack>
            </section>

            <section
              aria-labelledby="settings-notifications-heading"
              class="border-y border-border py-[var(--surface-padding-lg)]"
            >
              <Stack gap="md">
                <div>
                  <h2 id="settings-notifications-heading" class="text-xl font-semibold tracking-tight">
                    Personal notifications
                  </h2>
                  <p class="mt-[var(--layout-gap-sm)] text-sm leading-6 text-muted-foreground">
                    Workspace-specific alerts remain with each workspace.
                  </p>
                </div>
                <SwitchField
                  bind:checked={weeklyDigest}
                  label="Weekly activity digest"
                  description="A Monday summary of projects that need your attention."
                />
                <SwitchField
                  bind:checked={productUpdates}
                  label="Product updates"
                  description="A short monthly note when varunUI changes in a meaningful way."
                />
              </Stack>
            </section>
          </Stack>
        </form>

        <section
          aria-labelledby="settings-danger-heading"
          data-tone="red"
          class="surface-pastel border-y border-danger/35 p-[var(--surface-padding-lg)]"
        >
          <Stack gap="md" align="start">
            <div>
              <h2 id="settings-danger-heading" class="text-xl font-semibold tracking-tight">
                Remove personal account
              </h2>
              <p class="mt-[var(--layout-gap-sm)] max-w-[var(--layout-prose)] text-sm leading-6 text-muted-foreground">
                This signs you out, removes personal preferences, and schedules account deletion. Transfer workspace ownership first.
              </p>
            </div>

            {#if removalRequested}
              <StatusLine
                label="Account removal requested"
                description="A confirmation link has been sent to your email. No data is removed until you use it."
                meta="Pending"
                tone="warning"
              />
            {:else}
              <HoldToConfirm
                label="Hold to request removal"
                confirmedLabel="Removal requested"
                onConfirm={requestRemoval}
              />
            {/if}
          </Stack>
        </section>
      </Stack>
    </Rail>
  </Stack>
</Section>
