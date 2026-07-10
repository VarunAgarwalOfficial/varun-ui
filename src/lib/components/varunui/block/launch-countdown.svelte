<script lang="ts" module>
  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  export interface LaunchCountdownProps {
    kicker?: string;
    heading?: string;
    description?: string;
    launchDate?: string;
    showCountdown?: boolean;
    className?: string;
  }

  export const launchCountdownDemo: LaunchCountdownProps = {
    kicker: "Next release",
    heading: "The story kit lands in September.",
    description:
      "Characters, props, houses, and ready-made canvases will join the same paper system in one focused release.",
    launchDate: "2026-09-15T09:00:00+10:00",
    showCountdown: true,
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import SectionHeader from "$lib/components/varunui/piece/section-header.svelte";

  let {
    kicker,
    heading,
    description,
    launchDate,
    showCountdown = true,
    className,
  }: LaunchCountdownProps = $props();

  let timeLeft = $state<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function calculateTimeLeft() {
    if (!launchDate) return;
    const difference = new Date(launchDate).getTime() - new Date().getTime();

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  onMount(() => {
    if (!launchDate) return;
    calculateTimeLeft();
    const timer = window.setInterval(calculateTimeLeft, 1000);
    return () => window.clearInterval(timer);
  });

  const countdownItems = $derived([
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]);
</script>

<Section container="sm" className={className}>
    <div class="flex flex-col items-center gap-[var(--layout-gap-xl)] text-center">
      <SectionHeader {kicker} title={heading} {description} size="lg" markerTone="yellow" />

      {#if showCountdown && launchDate}
        <div
          data-tone="yellow"
          class="surface-pastel grid w-full grid-cols-2 border border-border sm:grid-cols-4"
        >
          {#each countdownItems as item}
            <div
              class="flex min-w-0 flex-col items-center border-b border-r border-border p-[var(--surface-padding-md)] even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <span class="font-mono text-3xl font-semibold tabular-nums md:text-4xl">
                {String(item.value).padStart(2, "0")}
              </span>
              <span
                class="mt-1 text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground"
              >
                {item.label}
              </span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
</Section>
