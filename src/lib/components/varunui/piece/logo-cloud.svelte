<script lang="ts" module>
  export interface LogoCloudItem {
    src: string;
    alt: string;
  }

  export interface LogoCloudProps {
    logos?: LogoCloudItem[];
    label?: string;
    title?: string;
  }

  export const logoCloudDemo: LogoCloudProps = {
    label: "Customer marks",
    title: "Add only verified customer logos.",
    logos: [],
  };
</script>

<script lang="ts">
  import Marker from "$lib/components/varunui/component/marker.svelte";

  let { logos = [], label, title }: LogoCloudProps = $props();
</script>

{#if logos.length > 0 || label || title}
  <div data-slot="logo-cloud" class="grid gap-8 md:gap-10">
    {#if label || title}
      <div class="mx-auto max-w-[var(--layout-prose)] text-center">
        {#if label}
          <p class="text-sm font-semibold uppercase tracking-[var(--tracking-kicker)]">
            <Marker text={label} tone="yellow" emphasis />
          </p>
        {/if}
        {#if title}
          <p class="mt-3 text-lg text-muted-foreground">{title}</p>
        {/if}
      </div>
    {/if}

    {#if logos.length > 0}
      <ul class="grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
        {#each logos as logo (`${logo.src}-${logo.alt}`)}
          <li class="flex min-h-12 items-center justify-center">
            <img
              class="h-8 w-full max-w-32 object-contain opacity-70"
              src={logo.src}
              alt={logo.alt}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
