<script lang="ts">
  import {
    CommandPalette,
    type CommandPaletteItem,
  } from "$lib";
  import { catalogItems } from "$showcase/catalog.generated.js";

  function hrefFor(item: (typeof catalogItems)[number]) {
    return `/${item.route}/${item.name}`;
  }

  const searchItems: CommandPaletteItem[] = catalogItems.map((item) => ({
    id: item.registryName,
    label: item.title,
    description: item.description,
    meta: `${item.kindLabel} / ${item.category}`,
    group: item.kindLabel,
    href: hrefFor(item),
    keywords: [
      item.name,
      item.registryName,
      item.category,
      item.description,
      ...(item.tags ?? []),
    ],
  }));
</script>

<CommandPalette
  items={searchItems}
  triggerLabel="Search..."
  label="Search the library"
  placeholder="Search the library..."
  shortcut="Cmd K"
  emptyTitle="No matches"
  emptyDescription="Try another name, category, tag, or component type."
/>
