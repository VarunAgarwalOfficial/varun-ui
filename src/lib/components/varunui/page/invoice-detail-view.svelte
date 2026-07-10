<script lang="ts" module>
  interface InvoiceLineItem {
    description: string;
    quantity: number;
    unitPrice: string;
    total: string;
  }

  export interface InvoiceDetailViewProps {
    badge?: {
      label: string;
      variant?: "primary" | "muted" | "outline";
    };
    invoice?: {
      number: string;
      date: string;
      dueDate: string;
      status: "paid" | "pending" | "overdue";
      billingAddress: {
        name: string;
        company?: string;
        address: string;
        city: string;
        country: string;
      };
      lineItems: InvoiceLineItem[];
      subtotal: string;
      tax: string;
      total: string;
      paymentMethod?: string;
    };
    labels?: {
      invoice?: string;
      billTo?: string;
      invoiceDate?: string;
      dueDate?: string;
      description?: string;
      quantity?: string;
      unitPrice?: string;
      total?: string;
      subtotal?: string;
      tax?: string;
      paid?: string;
      pending?: string;
      overdue?: string;
      download?: string;
      print?: string;
      back?: string;
      paymentMethod?: string;
      notFound?: string;
    };
    backUrl?: string;
    downloadUrl?: string;
    printUrl?: string;
    className?: string;
  }

  export const invoiceDetailViewDemo: InvoiceDetailViewProps = {
    badge: { label: "Invoice", variant: "muted" },
    invoice: {
      number: "INV-2024-001",
      date: "Jan 1, 2024",
      dueDate: "Jan 15, 2024",
      status: "paid",
      billingAddress: {
        name: "Maya Chen",
        company: "Design team",
        address: "18 Paper Street",
        city: "Sydney NSW 2000",
        country: "Australia",
      },
      lineItems: [
        {
          description: "Pro Plan - Monthly Subscription",
          quantity: 1,
          unitPrice: "$29.00",
          total: "$29.00",
        },
        {
          description: "Additional Team Member",
          quantity: 3,
          unitPrice: "$5.00",
          total: "$15.00",
        },
        {
          description: "Extra Storage (10GB)",
          quantity: 1,
          unitPrice: "$2.00",
          total: "$2.00",
        },
      ],
      subtotal: "$46.00",
      tax: "$4.14",
      total: "$50.14",
      paymentMethod: "Visa ending in 4242",
    },
    labels: {
      invoice: "Invoice",
      billTo: "Bill To",
      invoiceDate: "Invoice Date",
      dueDate: "Due Date",
      description: "Description",
      quantity: "Qty",
      unitPrice: "Unit Price",
      total: "Total",
      subtotal: "Subtotal",
      tax: "Tax (9%)",
      paid: "Paid",
      pending: "Pending",
      overdue: "Overdue",
      download: "Download PDF",
      print: "Print",
      back: "Back to Invoices",
      paymentMethod: "Payment Method",
      notFound: "Invoice not found",
    },
    backUrl: "?",
    downloadUrl: "?",
  };
</script>

<script lang="ts">
  import {
    ArrowLeft,
    CheckCircle,
    Download,
    FileText,
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
    invoice,
    labels = {},
    backUrl,
    downloadUrl,
    printUrl,
    className,
  }: InvoiceDetailViewProps = $props();

  const billToLabel = $derived(labels.billTo);
  const invoiceDateLabel = $derived(labels.invoiceDate);
  const dueDateLabel = $derived(labels.dueDate);
  const descriptionLabel = $derived(labels.description);
  const quantityLabel = $derived(labels.quantity);
  const unitPriceLabel = $derived(labels.unitPrice);
  const totalLabel = $derived(labels.total);
  const subtotalLabel = $derived(labels.subtotal);
  const taxLabel = $derived(labels.tax);
  const paidLabel = $derived(labels.paid);
  const pendingLabel = $derived(labels.pending);
  const overdueLabel = $derived(labels.overdue);
  const downloadLabel = $derived(labels.download);
  const printLabel = $derived(labels.print);
  const backLabel = $derived(labels.back);
  const paymentMethodLabel = $derived(labels.paymentMethod);
  const notFoundLabel = $derived(labels.notFound);
</script>

{#if !invoice}
  <div class={className}>
    <Section container="md">
      <div
        class="flex flex-col items-center gap-3 bg-muted/30 p-8 text-center"
      >
        <FileText class="size-12 text-muted-foreground" />
        <p class="text-muted-foreground">{notFoundLabel}</p>
      </div>
    </Section>
  </div>
{:else}
  <div class={className}>
    <Section container="md">
      <div class="space-y-6">
        <div
          class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <Button variant="quiet" size="sm" href={backUrl ?? "?"}>
            <ArrowLeft class="size-4" />
            {backLabel}
          </Button>
          <div class="flex gap-2">
            <Button variant="outline" size="sm" href={printUrl ?? "?"}>
              <FileText class="size-4" />
              {printLabel}
            </Button>
            <Button size="sm" href={downloadUrl ?? "?"}>
              <Download class="size-4" />
              {downloadLabel}
            </Button>
          </div>
        </div>

        <div class="rounded-none border bg-surface p-6 md:p-8">
          <div class="space-y-8">
            <div
              class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div>
                {#if badge?.label}
                  <Badge variant={badge.variant} class="mb-3">
                    <FileText class="size-3" />
                    {badge.label}
                  </Badge>
                {/if}
                <h1 class="text-3xl font-bold tracking-tight">
                  {invoice.number}
                </h1>
              </div>

              {#if invoice.status === "paid"}
                <Badge
                  variant="outline"
                  data-tone="green"
                  class="surface-pastel border-success/30 text-success"
                >
                  <CheckCircle class="size-3" />
                  {paidLabel}
                </Badge>
              {:else if invoice.status === "pending"}
                <Badge variant="outline">{pendingLabel}</Badge>
              {:else}
                <Badge variant="danger">{overdueLabel}</Badge>
              {/if}
            </div>

            <div class="grid gap-8 border-t pt-8 md:grid-cols-2">
              <div>
                <h3 class="font-semibold">{billToLabel}</h3>
                <div class="mt-3 text-sm leading-relaxed">
                  <p class="font-medium">{invoice.billingAddress.name}</p>
                  {#if invoice.billingAddress.company}
                    <p class="text-muted-foreground">
                      {invoice.billingAddress.company}
                    </p>
                  {/if}
                  <p class="text-muted-foreground">
                    {invoice.billingAddress.address}
                  </p>
                  <p class="text-muted-foreground">
                    {invoice.billingAddress.city}
                  </p>
                  <p class="text-muted-foreground">
                    {invoice.billingAddress.country}
                  </p>
                </div>
              </div>
              <div class="space-y-2 text-sm md:text-right">
                <div>
                  <span class="text-muted-foreground"
                    >{invoiceDateLabel}:
                  </span>
                  <span class="font-medium">{invoice.date}</span>
                </div>
                <div>
                  <span class="text-muted-foreground">{dueDateLabel}: </span>
                  <span class="font-medium">{invoice.dueDate}</span>
                </div>
              </div>
            </div>

            <div class="overflow-hidden rounded-none border">
              <Table>
                <TableHeader>
                  <TableRow class="bg-muted/50">
                    <TableHead>{descriptionLabel}</TableHead>
                    <TableHead class="text-center">{quantityLabel}</TableHead>
                    <TableHead class="text-right">{unitPriceLabel}</TableHead>
                    <TableHead class="text-right">{totalLabel}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {#each invoice.lineItems as item}
                    <TableRow>
                      <TableCell>{item.description}</TableCell>
                      <TableCell class="text-center">{item.quantity}</TableCell>
                      <TableCell class="text-right">{item.unitPrice}</TableCell>
                      <TableCell class="text-right font-medium">
                        {item.total}
                      </TableCell>
                    </TableRow>
                  {/each}
                </TableBody>
              </Table>
            </div>

            <div class="ml-auto max-w-sm space-y-3">
              <div class="flex justify-between">
                <span class="text-muted-foreground">{subtotalLabel}</span>
                <span>{invoice.subtotal}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">{taxLabel}</span>
                <span>{invoice.tax}</span>
              </div>
              <div
                class="flex justify-between border-t pt-3 text-lg font-semibold"
              >
                <span>{totalLabel}</span>
                <span>{invoice.total}</span>
              </div>
            </div>

            {#if invoice.paymentMethod && invoice.status === "paid"}
              <div class="rounded-md bg-muted/50 p-4 text-sm">
                <span class="text-muted-foreground"
                  >{paymentMethodLabel}:
                </span>
                <span class="font-medium">{invoice.paymentMethod}</span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </Section>
  </div>
{/if}
