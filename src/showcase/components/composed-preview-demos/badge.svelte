<script lang="ts">
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Cluster from "$lib/components/varunui/layout/cluster.svelte";
</script>

<Cluster gap="sm">
  <Badge>New</Badge>
  <Badge variant="muted">Draft</Badge>
  <Badge variant="outline">Design</Badge>
  <Badge variant="danger">Action needed</Badge>
</Cluster>
