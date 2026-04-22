const PRODUCTS = [
  {
    name: "2016 CLOGS",
    price: 115,
    status: "SHIPS IMMEDIATELY",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    sizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],
    sizeType: "us",
  },
  {
    name: "BLACK BEAR CLAW MULES",
    price: 125,
    status: "SHIPS IMMEDIATELY",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
    sizes: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    sizeType: "us",
  },
  {
    name: "YELLOW SAPPHIRE ZIP HOODIE",
    price: 140,
    status: "SHIPS IMMEDIATELY",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "letter",
  },
  {
    name: "CLAY SHOE",
    price: 135,
    status: "SHIPS IMMEDIATELY",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop",
    sizes: ["6", "7", "8", "9", "10", "11", "12", "13", "14"],
    sizeType: "us",
  },
  {
    name: "ONYX RUNNER V2",
    price: 160,
    status: "PRE-ORDER",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop",
    sizes: ["7", "8", "9", "10", "11", "12", "13"],
    sizeType: "us",
  },
  {
    name: "MESH TRAINING SHORT",
    price: 85,
    status: "SHIPS IMMEDIATELY",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    sizeType: "letter",
  },
  {
    name: "EMERALD SLIDE",
    price: 95,
    status: "SHIPS IMMEDIATELY",
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=600&fit=crop",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    sizeType: "us",
  },
  {
    name: "VINTAGE GRAPHIC TEE",
    price: 55,
    status: "LIMITED",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
    sizeType: "letter",
  },
];

function SizeSelector({ sizes, type }: { sizes: string[]; type: string }) {
  return (
    <div className="flex flex-wrap gap-1 mt-3">
      {sizes.map((size) => (
        <button
          key={size}
          className="min-w-[32px] h-[32px] px-1.5 text-xs border border-[var(--s-border)] hover:border-[var(--s-border-strong)] transition-colors flex items-center justify-center"
          style={{ fontFamily: "var(--s-font-mono)", letterSpacing: "0.02em" }}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <div className="group">
      <div className="aspect-square bg-[var(--s-surface-sunken)] overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h3
        className="text-sm font-bold tracking-wide"
        style={{ fontFamily: "var(--s-font-body)", letterSpacing: "0.04em" }}
      >
        {product.name}
      </h3>

      <p
        className="text-[10px] tracking-widest mt-0.5"
        style={{
          fontFamily: "var(--s-font-mono)",
          color: "var(--s-text-muted)",
          textTransform: "uppercase",
        }}
      >
        {product.status}
      </p>

      <p className="text-sm font-bold mt-1">${product.price}</p>

      <SizeSelector sizes={product.sizes} type={product.sizeType} />

      <button
        className="w-full mt-3 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors"
        style={{
          fontFamily: "var(--s-font-mono)",
          background: "var(--s-text)",
          color: "var(--s-background)",
        }}
      >
        SELECT SIZE{product.sizeType === "us" ? " (US)" : ""}
      </button>
    </div>
  );
}

export default function EcommercePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--s-background)" }}>
      {/* Top banner */}
      <div
        className="text-center py-2 text-[10px] tracking-[0.2em] uppercase font-bold"
        style={{
          fontFamily: "var(--s-font-mono)",
          background: "var(--s-text)",
          color: "var(--s-background)",
        }}
      >
        FREE SHIPPING ON ALL ORDERS OVER $200 &mdash; ALL ORDERS SHIP WITHIN 2 BUSINESS DAYS
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-[var(--s-border)]">
        <button
          className="text-xs font-bold tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--s-font-mono)" }}
        >
          MENU
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <div
            className="border-2 border-[var(--s-text)] px-3 py-1.5 text-center leading-tight"
            style={{ fontFamily: "var(--s-font-body)" }}
          >
            <div className="text-[11px] font-bold tracking-wider">Sigil</div>
            <div className="text-[11px] font-bold tracking-wider">Studios</div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button
            className="text-xs font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--s-font-mono)" }}
          >
            SEARCH
          </button>
          <button
            className="text-xs font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "var(--s-font-mono)" }}
          >
            CART
          </button>
        </div>
      </nav>

      {/* Product Grid */}
      <main className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </main>

      {/* More Items */}
      <section className="border-t border-[var(--s-border)] py-12">
        <h2
          className="text-center text-lg font-bold tracking-[0.15em] uppercase"
          style={{ fontFamily: "var(--s-font-body)" }}
        >
          MORE ITEMS TO CONSIDER
        </h2>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--s-border)] px-6 py-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--s-font-mono)" }}
            >
              SHOP
            </h4>
            {["All Products", "New Arrivals", "Footwear", "Apparel", "Accessories"].map((link) => (
              <p key={link} className="text-sm text-[var(--s-text-secondary)] mb-2 cursor-pointer hover:text-[var(--s-text)]">
                {link}
              </p>
            ))}
          </div>
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--s-font-mono)" }}
            >
              INFO
            </h4>
            {["About", "Sizing", "Shipping", "Returns", "Contact"].map((link) => (
              <p key={link} className="text-sm text-[var(--s-text-secondary)] mb-2 cursor-pointer hover:text-[var(--s-text)]">
                {link}
              </p>
            ))}
          </div>
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--s-font-mono)" }}
            >
              FOLLOW
            </h4>
            {["Instagram", "Twitter", "TikTok"].map((link) => (
              <p key={link} className="text-sm text-[var(--s-text-secondary)] mb-2 cursor-pointer hover:text-[var(--s-text)]">
                {link}
              </p>
            ))}
          </div>
          <div>
            <h4
              className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "var(--s-font-mono)" }}
            >
              NEWSLETTER
            </h4>
            <div className="flex border border-[var(--s-border)]">
              <input
                type="email"
                placeholder="EMAIL"
                className="flex-1 px-3 py-2 text-xs tracking-wider bg-transparent outline-none"
                style={{ fontFamily: "var(--s-font-mono)" }}
              />
              <button
                className="px-4 py-2 text-xs font-bold tracking-wider"
                style={{
                  fontFamily: "var(--s-font-mono)",
                  background: "var(--s-text)",
                  color: "var(--s-background)",
                }}
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--s-border)] text-center">
          <p className="text-[10px] tracking-widest text-[var(--s-text-muted)] uppercase" style={{ fontFamily: "var(--s-font-mono)" }}>
            Built with Sigil UI &mdash; Soft preset
          </p>
        </div>
      </footer>
    </div>
  );
}
