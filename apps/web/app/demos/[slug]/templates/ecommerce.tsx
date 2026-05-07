"use client";

import { useState } from "react";
import {
  Button,
  Badge,
  Input,
  BentoGrid,
  BentoGridCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@sigil-ui/components";
import {
  DemoShell,
  Panel,
  PanelSpacer,
  PanelHeader,
  PlaceholderImage,
} from "./_shell";

interface Product {
  name: string;
  price: number;
  category: string;
  gradient: string;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    name: "Linen Overshirt",
    price: 128,
    category: "Tops",
    gradient:
      "linear-gradient(135deg, oklch(0.75 0.06 85) 0%, oklch(0.55 0.04 70) 100%)",
    description:
      "Relaxed-fit linen overshirt with dropped shoulders and horn buttons. Garment-dyed for a soft, lived-in feel.",
  },
  {
    name: "Wide-Leg Trousers",
    price: 164,
    category: "Bottoms",
    gradient:
      "linear-gradient(135deg, oklch(0.6 0.03 250) 0%, oklch(0.4 0.02 230) 100%)",
    description:
      "High-rise wide-leg trousers in heavyweight cotton twill. Double-pleated front, slash pockets, cropped hem.",
  },
  {
    name: "Merino Tee",
    price: 72,
    category: "Tops",
    gradient:
      "linear-gradient(135deg, oklch(0.65 0.08 160) 0%, oklch(0.45 0.05 145) 100%)",
    description:
      "17.5 micron merino wool crew neck. Naturally thermoregulating, odor-resistant, and incredibly soft.",
  },
  {
    name: "Canvas Tote",
    price: 48,
    category: "Accessories",
    gradient:
      "linear-gradient(135deg, oklch(0.7 0.04 50) 0%, oklch(0.5 0.03 40) 100%)",
    description:
      "Heavy 16oz canvas tote with reinforced stitching. Interior zip pocket. Fits a 15-inch laptop.",
  },
  {
    name: "Relaxed Chinos",
    price: 96,
    category: "Bottoms",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.05 30) 0%, oklch(0.35 0.03 20) 100%)",
    description:
      "Relaxed straight-leg chinos in brushed organic cotton. Enzyme-washed for softness from day one.",
  },
  {
    name: "Leather Belt",
    price: 56,
    category: "Accessories",
    gradient:
      "linear-gradient(135deg, oklch(0.4 0.06 60) 0%, oklch(0.25 0.04 45) 100%)",
    description:
      "Full-grain vegetable-tanned leather belt with solid brass buckle. 30mm width. Ages beautifully.",
  },
];

const CART_ITEMS = [
  { name: "Linen Overshirt", size: "M", qty: 1, price: 128 },
  { name: "Wide-Leg Trousers", size: "L", qty: 1, price: 164 },
  { name: "Merino Tee", size: "S", qty: 2, price: 72 },
];

const SIZES = ["S", "M", "L", "XL"] as const;

function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  const [size, setSize] = useState<string>("M");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="w-full text-left"
          style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}
        >
          <div className="flex flex-col gap-2.5">
            <PlaceholderImage
              aspect={featured ? "16/9" : "4/3"}
              gradient={product.gradient}
              label={product.name}
            />
            <div className="flex items-center justify-between px-0.5">
              <span style={{ fontSize: 13, fontWeight: 600 }}>{product.name}</span>
              <span
                style={{
                  fontFamily: "var(--s-font-mono)",
                  fontSize: 12,
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 500,
                }}
              >
                ${product.price}
              </span>
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <PlaceholderImage
          aspect="4/3"
          gradient={product.gradient}
          label={product.name}
          className="mt-2"
        />
        <div className="mt-4 flex items-center justify-between">
          <Tabs value={size} onValueChange={setSize}>
            <TabsList>
              {SIZES.map((s) => (
                <TabsTrigger key={s} value={s} className="text-xs">
                  {s}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 18,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ${product.price}
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1">Add to Cart</Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EcommerceDemo() {
  const cartTotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <DemoShell>
      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Panel as="nav">
        <div className="flex h-12 items-center justify-between px-4">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            KOVA
          </span>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search…"
              className="hidden w-40 sm:block"
              style={{ height: 30, fontSize: 12 }}
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  Cart (3)
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Your Cart</SheetTitle>
                  <SheetDescription>3 items</SheetDescription>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-3">
                  {CART_ITEMS.map((item) => (
                    <div
                      key={item.name + item.size}
                      className="flex items-center justify-between"
                      style={{
                        paddingBottom: 12,
                        borderBottom: "1px solid var(--s-border)",
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</span>
                        <span
                          style={{
                            fontFamily: "var(--s-font-mono)",
                            fontSize: 11,
                            color: "var(--s-text-muted)",
                          }}
                        >
                          Size {item.size} · Qty {item.qty}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--s-font-mono)",
                          fontSize: 13,
                          fontVariantNumeric: "tabular-nums",
                          fontWeight: 500,
                        }}
                      >
                        ${item.price * item.qty}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2">
                    <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
                    <span
                      style={{
                        fontFamily: "var(--s-font-mono)",
                        fontSize: 16,
                        fontWeight: 700,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      ${cartTotal}
                    </span>
                  </div>
                  <Button className="mt-2 w-full">Checkout</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Panel>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <div className="px-4 pt-14 pb-6 text-center">
          <h1
            style={{
              fontFamily: "var(--s-font-display)",
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            Spring Collection
          </h1>
          <p
            className="mx-auto mt-3"
            style={{
              fontSize: 14,
              color: "var(--s-text-muted)",
              maxWidth: "26rem",
              lineHeight: 1.6,
            }}
          >
            Everyday essentials designed with intention. Natural materials,
            considered construction, built to last.
          </p>
        </div>
        <div className="px-4 pb-6">
          <PlaceholderImage
            aspect="21/9"
            gradient="linear-gradient(135deg, color-mix(in oklch, var(--s-primary) 15%, var(--s-surface)) 0%, var(--s-surface) 50%, color-mix(in oklch, var(--s-primary) 8%, var(--s-background)) 100%)"
            label="Spring 2026"
          />
        </div>
      </Panel>

      {/* ── Categories ──────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Categories</PanelHeader>
        <div className="px-4 py-3">
          <Tabs defaultValue="All">
            <TabsList>
              {["All", "Tops", "Bottoms", "Accessories"].map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            {["All", "Tops", "Bottoms", "Accessories"].map((cat) => {
              const items =
                cat === "All"
                  ? PRODUCTS
                  : PRODUCTS.filter((p) => p.category === cat);
              return (
                <TabsContent key={cat} value={cat}>
                  <BentoGrid columns={{ sm: 2, md: 3 }} gap={4} className="pt-3">
                    {items.map((product, i) => (
                      <BentoGridCell
                        key={product.name}
                        colSpan={cat === "All" && i === 0 ? 2 : 1}
                      >
                        <ProductCard
                          product={product}
                          featured={cat === "All" && i === 0}
                        />
                      </BentoGridCell>
                    ))}
                  </BentoGrid>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </Panel>

      {/* ── Cart Preview ────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel>
        <PanelHeader>Cart</PanelHeader>
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex flex-col gap-1">
            <span style={{ fontSize: 14, fontWeight: 500 }}>3 items in cart</span>
            <span
              style={{
                fontFamily: "var(--s-font-mono)",
                fontSize: 12,
                color: "var(--s-text-muted)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Subtotal: ${cartTotal}
            </span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                View Cart →
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
                <SheetDescription>3 items</SheetDescription>
              </SheetHeader>
              <div className="mt-4 flex flex-col gap-3">
                {CART_ITEMS.map((item) => (
                  <div
                    key={item.name + item.size}
                    className="flex items-center justify-between"
                    style={{
                      paddingBottom: 12,
                      borderBottom: "1px solid var(--s-border)",
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</span>
                      <span
                        style={{
                          fontFamily: "var(--s-font-mono)",
                          fontSize: 11,
                          color: "var(--s-text-muted)",
                        }}
                      >
                        Size {item.size} · Qty {item.qty}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--s-font-mono)",
                        fontSize: 13,
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 500,
                      }}
                    >
                      ${item.price * item.qty}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
                  <span
                    style={{
                      fontFamily: "var(--s-font-mono)",
                      fontSize: 16,
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    ${cartTotal}
                  </span>
                </div>
                <Button className="mt-2 w-full">Checkout</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Panel>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <PanelSpacer />
      <Panel as="footer">
        <div className="flex items-center justify-between px-4 py-5">
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 KOVA
          </span>
          <span
            style={{
              fontFamily: "var(--s-font-mono)",
              fontSize: 11,
              color: "var(--s-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            Built with{" "}
            <span style={{ fontWeight: 600, color: "var(--s-text)" }}>sigil-ui</span>
          </span>
        </div>
      </Panel>
    </DemoShell>
  );
}
