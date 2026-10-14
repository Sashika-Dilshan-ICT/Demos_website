/**
 * D FASHION - Products Catalog Data
 * Unisex Contemporary Streetwear | Colombo, Sri Lanka
 * 
 * Curated product lineup featuring heavy-weight cotton fabrics,
 * boxy silhouettes, neutral earth tones (black, white, sand beige),
 * and functional street utilitarian accents.
 */

var PRODUCTS_DATA = [
  {
    id: "DF-001",
    slug: "heavyweight-washed-oversized-tee",
    name: "Heavyweight Washed Oversized Tee",
    subtitle: "280 GSM Pure Combed Cotton Drop-Shoulder",
    category: "Oversized Tees",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: true,
    isBestSeller: true,
    isSale: false,
    price: 3950,
    originalPrice: 4600,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Best Seller",
    image: "assets/images/prod_heavy_tee.jpg",
    secondaryImage: "assets/images/hero_banner.jpg",
    colors: [
      { name: "Vintage Charcoal", hex: "#2b2b2b" },
      { name: "Desert Sand", hex: "#d8cca3" },
      { name: "Chalk White", hex: "#f5f5f0" },
      { name: "Onyx Black", hex: "#111111" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 18,
    description: "The cornerstone of your streetwear wardrobe. Crafted from custom-knit 280 GSM heavyweight cotton with a mineral enzyme wash for an ultra-soft vintage handfeel. Features extended drop shoulders, relaxed boxy drape, and a dense 1.25\" ribbed collar that keeps its shape wash after wash.",
    specifications: [
      { label: "Fabric", value: "280 GSM 100% Combed Cotton" },
      { label: "Fit", value: "Boxy Oversized Silhouette" },
      { label: "Finish", value: "Vintage Enzyme Wash, Pre-Shrunk" },
      { label: "Collar", value: "1.25\" Heavy Ribbed Crewneck" },
      { label: "Origin", value: "Locally Cut & Sewn in Sri Lanka" }
    ],
    care: "Machine wash cold inside out. Tumble dry low or hang dry in shade to preserve wash color. Do not iron directly over graphics."
  },
  {
    id: "DF-002",
    slug: "boxy-raw-fleece-hoodie-sand",
    name: "Boxy Raw Fleece Hoodie — Sand",
    subtitle: "420 GSM Ultra-Heavy French Terry",
    category: "Hoodies & Fleece",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: false,
    isBestSeller: true,
    isSale: false,
    price: 6850,
    originalPrice: 7800,
    rating: 5.0,
    reviewsCount: 52,
    badge: "Iconic Drop",
    image: "assets/images/prod_boxy_hoodie.jpg",
    secondaryImage: "assets/images/about_studio.jpg",
    colors: [
      { name: "Desert Sand", hex: "#d3c3a9" },
      { name: "Washed Black", hex: "#222222" },
      { name: "Oatmeal Melange", hex: "#e5ded4" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 9,
    description: "Engineered for maximum structural drape. Our 420 GSM unbrushed French Terry hoodie features a double-layered crossover hood without drawstrings for a sleek minimalist profile, deep drop shoulders, hidden side seam pockets, and heavyweight ribbing at cuffs and hem.",
    specifications: [
      { label: "Fabric", value: "420 GSM 100% Heavy French Terry" },
      { label: "Fit", value: "Boxy Drop-Shoulder Relaxed Fit" },
      { label: "Hood", value: "Double-Layer Crossover (No Drawcords)" },
      { label: "Pockets", value: "Hidden Inseam Front Pouch" },
      { label: "Weight", value: "Approx. 950g Total Garment Weight" }
    ],
    care: "Gentle machine wash cold. Dry flat in shade. Do not bleach."
  },
  {
    id: "DF-003",
    slug: "tactical-minimalist-cargo-pants",
    name: "Tactical Minimalist Cargo Pants",
    subtitle: "Heavy Cotton Ripstop with Bungee Ankle Cords",
    category: "Pants & Cargos",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: true,
    isBestSeller: true,
    isSale: false,
    price: 5950,
    originalPrice: 6900,
    rating: 4.8,
    reviewsCount: 29,
    badge: "New Arrival",
    image: "assets/images/prod_cargo_pants.jpg",
    secondaryImage: "assets/images/hero_banner.jpg",
    colors: [
      { name: "Matte Black", hex: "#161616" },
      { name: "Slate Grey", hex: "#3e4247" },
      { name: "Desert Khaki", hex: "#b5a38a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 14,
    description: "Blending utilitarian practicality with refined streetwear aesthetics. Constructed from resilient micro-ripstop cotton featuring deep dual bellowed side flap cargo pockets, an elasticated waistband with elongated drawcords, and custom bungee toggles at the hems for switching between wide-leg and tapered fits.",
    specifications: [
      { label: "Fabric", value: "100% Cotton Micro-Ripstop" },
      { label: "Waist", value: "Elasticated Band with Extended Cord" },
      { label: "Cuff", value: "Adjustable Bungee Shock Cords" },
      { label: "Pockets", value: "6 Utilitarian Pockets with Matte Snaps" },
      { label: "Hardware", value: "Matte Black Anodized Metal" }
    ],
    care: "Cold machine wash with similar dark colors. Hang dry. Iron on low if needed."
  },
  {
    id: "DF-004",
    slug: "monogram-street-cap-canvas-pack",
    name: "Monogram Street Cap & Heavy Pack",
    subtitle: "Structured 6-Panel Twill & Heavy Canvas Tote",
    category: "Accessories",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: false,
    isBestSeller: false,
    isSale: true,
    price: 2950,
    originalPrice: 3800,
    rating: 4.7,
    reviewsCount: 19,
    badge: "Sale -22%",
    image: "assets/images/prod_accessories.jpg",
    secondaryImage: "assets/images/about_studio.jpg",
    colors: [
      { name: "Pitch Black", hex: "#121212" },
      { name: "Raw Ecru Beige", hex: "#dfd5c4" }
    ],
    sizes: ["One Size"],
    inStock: true,
    stockCount: 24,
    description: "The essential daily streetwear companion set. Includes our structured 6-panel low-profile dad cap with subtle tonal geometric monogram embroidery, paired with a heavy 16oz raw cotton canvas tote featuring reinforced cross-stitched handles and an interior phone slip pocket.",
    specifications: [
      { label: "Cap Material", value: "100% Brushed Cotton Chino Twill" },
      { label: "Tote Material", value: "16oz Heavyweight Raw Canvas" },
      { label: "Closure", value: "Antiqued Brass Buckle Strap" },
      { label: "Branding", value: "Tonal 3D Minimalist Geometric Monogram" }
    ],
    care: "Spot clean with damp cloth and mild detergent. Air dry naturally."
  },
  {
    id: "DF-005",
    slug: "colombo-studio-minimalist-crewneck",
    name: "Colombo Studio Minimalist Crewneck",
    subtitle: "380 GSM Brushed Loopback Cotton",
    category: "Hoodies & Fleece",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: true,
    isBestSeller: false,
    isSale: false,
    price: 5800,
    originalPrice: 6500,
    rating: 4.9,
    reviewsCount: 16,
    badge: "New Arrival",
    image: "assets/images/about_studio.jpg",
    secondaryImage: "assets/images/prod_boxy_hoodie.jpg",
    colors: [
      { name: "Bone White", hex: "#f0ede6" },
      { name: "Jet Black", hex: "#151515" },
      { name: "Raw Oatmeal", hex: "#d9d0c1" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 11,
    description: "A tailored unisex crewneck designed for elevated everyday dressing. Crafted from thick 380 GSM brushed loopback fleece with dropped shoulder lines and blind-stitched hem and sleeves. Finished with a subtle tonal Colombo Studio coordinates print on the back nape.",
    specifications: [
      { label: "Fabric", value: "380 GSM Organic Loopback Cotton" },
      { label: "Collar", value: "Custom Heavy Rib Knit" },
      { label: "Details", value: "Micro Back Nape Screenprint" },
      { label: "Silhouette", value: "Boxy Modern Streetwear Cut" }
    ],
    care: "Wash inside out at 30°C. Do not tumble dry. Reshape while damp."
  },
  {
    id: "DF-006",
    slug: "acid-wash-vintage-box-tee",
    name: "Acid Wash Vintage Box Tee",
    subtitle: "260 GSM Custom Mineral Enzyme Wash",
    category: "Oversized Tees",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: false,
    isBestSeller: true,
    isSale: true,
    price: 3600,
    originalPrice: 4400,
    rating: 4.8,
    reviewsCount: 31,
    badge: "Sale -18%",
    image: "assets/images/hero_banner.jpg",
    secondaryImage: "assets/images/prod_heavy_tee.jpg",
    colors: [
      { name: "Mineral Charcoal", hex: "#353839" },
      { name: "Washed Sandstone", hex: "#c8beaa" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 15,
    description: "Each piece undergoes a unique stone and mineral acid wash process, giving every t-shirt an exclusive, one-of-a-kind vintage texture and subtle distress. Relaxed wide sleeves and a relaxed chest make this ideal for hot Colombo days and evening street layering.",
    specifications: [
      { label: "Fabric", value: "260 GSM Single Jersey Cotton" },
      { label: "Treatment", value: "Hand Acid Mineral Wash Process" },
      { label: "Shoulder", value: "Drop Shoulder with Reinforced Seam" },
      { label: "Hem", value: "Blind Stitched Clean Hem" }
    ],
    care: "Wash separately in cold water on gentle cycle to protect custom dye wash."
  },
  {
    id: "DF-007",
    slug: "french-terry-heavy-street-shorts",
    name: "French Terry Heavy Street Shorts",
    subtitle: "360 GSM Cotton with Extended Drawstrings",
    category: "Pants & Cargos",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: false,
    isBestSeller: false,
    isSale: true,
    price: 3450,
    originalPrice: 4200,
    rating: 4.7,
    reviewsCount: 22,
    badge: "Limited Drop",
    image: "assets/images/prod_cargo_pants.jpg",
    secondaryImage: "assets/images/prod_heavy_tee.jpg",
    colors: [
      { name: "Washed Black", hex: "#1f1f1f" },
      { name: "Sand Beige", hex: "#d5c9b6" },
      { name: "Heather Grey", hex: "#7a7d81" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 12,
    description: "Casual comfort tuned for tropical urban street life. Cut just above the knee with raw roll-up hem options, heavy cotton drawcords with silver aglets, and deep side zip pockets to keep your phone and essentials secure on the move.",
    specifications: [
      { label: "Fabric", value: "360 GSM Unbrushed French Terry" },
      { label: "Length", value: "Above-the-Knee Relaxed Silhouette" },
      { label: "Pockets", value: "YKK Concealed Metal Zipper Pockets" },
      { label: "Waist", value: "Elasticated Band with Metal Eyelets" }
    ],
    care: "Cold gentle machine wash. Hang dry in shade."
  },
  {
    id: "DF-008",
    slug: "monochrome-streetwear-overshirt",
    name: "Monochrome Streetwear Utility Overshirt",
    subtitle: "Heavy Cotton Bull Denim with Matte Hardware",
    category: "Pants & Cargos",
    gender: ["Unisex", "Men's", "Women's"],
    isNew: true,
    isBestSeller: false,
    isSale: false,
    price: 7200,
    originalPrice: 8000,
    rating: 5.0,
    reviewsCount: 14,
    badge: "New Arrival",
    image: "assets/images/hero_banner.jpg",
    secondaryImage: "assets/images/about_studio.jpg",
    colors: [
      { name: "Desert Sand", hex: "#cfc1ad" },
      { name: "Stealth Black", hex: "#131313" }
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 8,
    description: "The ultimate layering layer. Cut from durable 12oz cotton bull denim in a boxy modern silhouette with twin chest bellows pockets, custom gunmetal snap closures, and a structured pointed collar that stays sharp over our oversized tees.",
    specifications: [
      { label: "Fabric", value: "12oz 100% Cotton Bull Denim" },
      { label: "Hardware", value: "Matte Gunmetal Snap Buttons" },
      { label: "Pockets", value: "Dual Bellows Chest Flap Pockets" },
      { label: "Fit", value: "Structured Oversized Layering Fit" }
    ],
    care: "Dry clean recommended or gentle cold machine wash inside out."
  }
];

// Product Category metadata
var CATEGORIES_DATA = [
  { id: "all", name: "All Collections", count: 8 },
  { id: "oversized-tees", name: "Oversized Tees", count: 2, image: "assets/images/prod_heavy_tee.jpg" },
  { id: "hoodies", name: "Hoodies & Fleece", count: 2, image: "assets/images/prod_boxy_hoodie.jpg" },
  { id: "pants-cargos", name: "Pants & Cargos", count: 3, image: "assets/images/prod_cargo_pants.jpg" },
  { id: "accessories", name: "Street Accessories", count: 1, image: "assets/images/prod_accessories.jpg" }
];

// Size Chart Guide Data
var SIZE_GUIDE_DATA = {
  tops: {
    title: "T-Shirts, Hoodies & Crewnecks (Inches)",
    headers: ["Size", "Chest (Pit-to-Pit)", "Length", "Shoulder Drop", "Recommended Height"],
    rows: [
      ["S", "22.5\"", "28.5\"", "21.5\"", "5'3\" – 5'7\""],
      ["M", "23.5\"", "29.5\"", "22.5\"", "5'7\" – 5'10\""],
      ["L", "24.5\"", "30.5\"", "23.5\"", "5'10\" – 6'1\""],
      ["XL", "25.5\"", "31.5\"", "24.5\"", "6'0\" – 6'3\""],
      ["XXL", "26.5\"", "32.5\"", "25.5\"", "6'2\"+"]
    ],
    note: "All tops feature an intentional boxy drop-shoulder cut. For a classic regular fit, select one size down from your usual size."
  },
  bottoms: {
    title: "Cargos & Street Shorts (Inches)",
    headers: ["Size", "Waist (Elastic Relaxed/Stretched)", "Inseam", "Outseam", "Thigh"],
    rows: [
      ["S (28-30)", "28\" – 32\"", "29.5\"", "39.5\"", "25\""],
      ["M (31-33)", "30\" – 34\"", "30.0\"", "40.5\"", "26\""],
      ["L (34-36)", "32\" – 37\"", "30.5\"", "41.5\"", "27\""],
      ["XL (36-38)", "34\" – 39\"", "31.0\"", "42.0\"", "28\""],
      ["XXL (38-40)", "36\" – 42\"", "31.5\"", "42.5\"", "29\""]
    ],
    note: "Features elasticated waistbands with extended drawstring cords and adjustable bungee ankle cuffs."
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.CATEGORIES_DATA = CATEGORIES_DATA;
  window.SIZE_GUIDE_DATA = SIZE_GUIDE_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRODUCTS_DATA, CATEGORIES_DATA, SIZE_GUIDE_DATA };
}
