<script lang="ts" module>
  interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: "paid" | "pending" | "failed";
    description: string;
    invoiceNumber: string;
    downloadUrl?: string;
  }

  export interface InvoiceHistoryProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    heading?: string;
    description?: string;
    invoices?: Invoice[];
    labels?: {
      date?: string;
      description?: string;
      amount?: string;
      status?: string;
      paid?: string;
      pending?: string;
      failed?: string;
      download?: string;
      noInvoices?: string;
      viewAll?: string;
    };
    viewAllUrl?: string;
    className?: string;
  }

  export const invoiceHistoryDemo: InvoiceHistoryProps = {
    badge: { label: "Billing", variant: "muted" },
    heading: "Billing History",
    description: "View and download your past invoices and payment history.",
    invoices: [
      {
        id: "1",
        date: "Jan 1, 2024",
        amount: "$29.00",
        status: "paid",
        description: "Pro Plan - Monthly",
        invoiceNumber: "INV-2024-001",
        downloadUrl: "#",
      },
      {
        id: "2",
        date: "Dec 1, 2023",
        amount: "$29.00",
        status: "paid",
        description: "Pro Plan - Monthly",
        invoiceNumber: "INV-2023-012",
        downloadUrl: "#",
      },
      {
        id: "3",
        date: "Nov 1, 2023",
        amount: "$29.00",
        status: "paid",
        description: "Pro Plan - Monthly",
        invoiceNumber: "INV-2023-011",
        downloadUrl: "#",
      },
      {
        id: "4",
        date: "Oct 1, 2023",
        amount: "$29.00",
        status: "failed",
        description: "Pro Plan - Monthly",
        invoiceNumber: "INV-2023-010",
        downloadUrl: "#",
      },
      {
        id: "5",
        date: "Sep 1, 2023",
        amount: "$29.00",
        status: "paid",
        description: "Pro Plan - Monthly",
        invoiceNumber: "INV-2023-009",
        downloadUrl: "#",
      },
    ],
    labels: {
      date: "Date",
      description: "Description",
      amount: "Amount",
      status: "Status",
      paid: "Paid",
      pending: "Pending",
      failed: "Failed",
      download: "Download",
      noInvoices: "No invoices yet",
      viewAll: "View All Invoices",
    },
    viewAllUrl: "#",
  };
</script>

<script lang="ts">
  import {
    CheckCircle,
    Clock,
    CreditCard,
    Download,
    FileText,
    XCircle,
  } from "$lib/components/varunui/internal/icons/phosphor.js";
  import Badge from "$lib/components/varunui/component/badge.svelte";
  import Button from "$lib/components/varunui/component/button.svelte";
  import Section from "$lib/components/varunui/layout/section.svelte";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "$lib/components/varunui/internal/ui/table/index.js";

  let {
    badge,
    heading,
    description,
    invoices = [],
    labels = {},
    viewAllUrl,
    className,
  }: InvoiceHistoryProps = $props();

  const dateLabel = $derived(labels.date);
  const descLabel = $derived(labels.description);
  const amountLabel = $derived(labels.amount);
  const statusLabel = $derived(labels.status);
  const paidLabel = $derived(labels.paid);
  const pendingLabel = $derived(labels.pending);
  const failedLabel = $derived(labels.failed);
  const downloadLabel = $derived(labels.download);
  const noInvoicesLabel = $derived(labels.noInvoices);
  const viewAllLabel = $derived(labels.viewAll);
</script>

<Section container="sm" className={className}>
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        {#if badge?.label}
          <Badge variant={badge.variant} class="w-fit">
            <CreditCard class="mr-1 size-3" />
            {badge.label}
          </Badge>
        {/if}
        {#if heading}
          <h2 class="text-2xl font-bold tracking-tight md:text-3xl">
            {heading}
          </h2>
        {/if}
        {#if description}
          <p class="text-muted-foreground">{description}</p>
        {/if}
      </div>

      {#if invoices.length === 0}
        <div
          class="flex flex-col items-center gap-3 border-y bg-surface py-8 text-center"
        >
          <FileText class="size-12 text-muted-foreground" />
          <p class="text-muted-foreground">{noInvoicesLabel}</p>
        </div>
      {:else}
        <div class="rounded-none border bg-surface">
          <Table>
            <TableHeader>
              <TableRow class="bg-muted/50">
                <TableHead class="px-4">{dateLabel}</TableHead>
                <TableHead class="px-4">{descLabel}</TableHead>
                <TableHead class="px-4">{amountLabel}</TableHead>
                <TableHead class="px-4 text-center">
                  {statusLabel}
                </TableHead>
                <TableHead class="w-12 px-4 text-right">
                  {downloadLabel}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each invoices as invoice}
                <TableRow>
                  <TableCell class="px-4">
                    <div class="font-medium">{invoice.date}</div>
                    <div class="text-xs text-muted-foreground">
                      {invoice.invoiceNumber}
                    </div>
                  </TableCell>
                  <TableCell class="px-4">
                    {invoice.description}
                  </TableCell>
                  <TableCell class="px-4 font-medium">
                    {invoice.amount}
                  </TableCell>
                  <TableCell class="px-4 text-center">
                    {#if invoice.status === "paid"}
                      <Badge
                        variant="outline"
                        class="border-emerald-500/20 bg-emerald-500/10 font-normal text-emerald-600"
                      >
                        <CheckCircle class="size-3" />
                        {paidLabel}
                      </Badge>
                    {:else if invoice.status === "pending"}
                      <Badge
                        variant="outline"
                        class="border-amber-500/20 bg-amber-500/10 font-normal text-amber-600"
                      >
                        <Clock class="size-3" />
                        {pendingLabel}
                      </Badge>
                    {:else}
                      <Badge
                        variant="outline"
                        class="border-rose-500/20 bg-rose-500/10 font-normal text-rose-600"
                      >
                        <XCircle class="size-3" />
                        {failedLabel}
                      </Badge>
                    {/if}
                  </TableCell>
                  <TableCell class="px-4 text-right">
                    {#if invoice.downloadUrl}
                      <Button
                        variant="quiet"
                        iconOnly
                        href={invoice.downloadUrl}
                      >
                        <Download class="size-4" />
                      </Button>
                    {:else}
                      <Button variant="quiet" iconOnly disabled>
                        <Download class="size-4" />
                      </Button>
                    {/if}
                  </TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      {/if}

      {#if invoices.length > 0 && viewAllUrl}
        <div class="flex justify-center">
          <Button variant="outline" href={viewAllUrl}>{viewAllLabel}</Button>
        </div>
      {/if}
    </div>
</Section>
