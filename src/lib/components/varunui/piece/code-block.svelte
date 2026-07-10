<script lang="ts" module>
  export interface CodeBlockProps {
    title?: string;
    lines?: string[];
  }

  export const codeBlockDemo: CodeBlockProps = {
    title: "greet.ts",
    lines: [
      "export function greet(name: string) {",
      "  return `Hello, ${name}!`;",
      "}",
      "",
      'console.log(greet("varunUI"));',
    ],
  };
</script>

<script lang="ts">
  let {
    title,
    lines = [],
  }: CodeBlockProps = $props();

  const frameClass = $derived(
    "w-full overflow-hidden rounded-md border border-border bg-foreground font-mono text-xs text-background",
  );
</script>

<figure
  data-slot="code-block"
  class={frameClass}
>
  {#if title}
    <figcaption
      data-slot="code-block-header"
      class="border-b border-border bg-background/10 px-3 py-2 text-background/70"
    >
      {title}
    </figcaption>
  {/if}

  <pre data-slot="code-block-body" class="overflow-auto px-3 py-2 leading-6 whitespace-normal"><code>{#each lines as line, index (index)}
<span class="flex gap-3 whitespace-pre">
  <span class="w-4 shrink-0 select-none text-right text-background/35" aria-hidden="true">{index + 1}</span>
  <span class="flex-1">{line || "\u00A0"}</span>
</span>
{/each}</code></pre>
</figure>
