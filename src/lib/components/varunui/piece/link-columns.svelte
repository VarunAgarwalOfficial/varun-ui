<script lang="ts" module>
  export interface LinkColumnLink {
    label: string;
    href: string;
    active?: boolean;
  }

  export interface LinkColumn {
    title: string;
    links: LinkColumnLink[];
  }

  export interface LinkColumnsProps {
    columns: LinkColumn[];
  }

  export const linkColumnsDemo: LinkColumnsProps = {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "?" },
          { label: "Pricing", href: "?" },
          { label: "Integrations", href: "?" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "?" },
          { label: "Careers", href: "?" },
          { label: "Contact", href: "?" },
        ],
      },
    ],
  };
</script>

<script lang="ts">
  let { columns }: LinkColumnsProps = $props();
</script>

<nav
  aria-label="Footer"
  class="grid grid-cols-2 gap-[var(--layout-gap-lg)] md:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))]"
>
  {#each columns as column (column.title)}
    <div>
      <h3 class="text-sm font-semibold text-foreground">{column.title}</h3>
      <ul class="mt-4 space-y-3">
        {#each column.links as link, index (`${link.href}-${link.label}-${index}`)}
          <li>
            <a
              href={link.href}
              aria-current={link.active ? "page" : undefined}
              class="rounded-sm text-sm text-muted-foreground outline-none motion-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/50"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</nav>
