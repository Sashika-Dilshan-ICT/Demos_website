/**
 * D FASHION - Global Configuration & Store Information
 * Unisex Contemporary Streetwear | Colombo, Sri Lanka
 * 
 * Easily update the WhatsApp number, business information, currency,
 * delivery rates, and social links in this file.
 */

const STORE_CONFIG = {
  brand: {
    name: "D FASHION",
    tagline: "UNISEX CONTEMPORARY STREETWEAR",
    subtagline: "Heavyweight silhouettes crafted for modern street culture.",
    founded: "2024",
    location: "Colombo, Sri Lanka",
    country: "Sri Lanka",
    currency: {
      code: "LKR",
      symbol: "Rs.",
      format: (amount) => `Rs. ${Number(amount).toLocaleString('en-LK')}`
    }
  },

  // WhatsApp Configuration for Click-to-Chat Orders
  whatsapp: {
    // International format without '+' or spaces for wa.me links
    phoneNumber: "94771234567",
    // Formatted display number for website UI
    displayNumber: "+94 77 123 4567",
    defaultWelcomeMessage: "Hello D FASHION, I have an inquiry about your streetwear collections.",
    orderDepartmentMessage: "Hello D FASHION, I would like to place an order."
  },

  contact: {
    phone: "+94 77 123 4567",
    secondaryPhone: "+94 11 234 5678",
    email: "orders@dfashion.lk",
    supportEmail: "support@dfashion.lk",
    address: {
      street: "No. 42, Galle Road, Bambalapitiya",
      city: "Colombo 03",
      postalCode: "00300",
      country: "Sri Lanka",
      mapsUrl: "https://maps.google.com/?q=Colombo+03+Sri+Lanka"
    },
    hours: {
      weekdays: "Monday – Saturday: 10:00 AM – 8:00 PM",
      sunday: "Sunday: 11:00 AM – 6:00 PM",
      onlineSupport: "WhatsApp Online Support: 24/7 Available"
    }
  },

  social: {
    instagram: "https://instagram.com/dfashion.lk",
    facebook: "https://facebook.com/dfashion.lk",
    tiktok: "https://tiktok.com/@dfashion.lk",
    handle: "@dfashion.lk"
  },

  delivery: {
    standardFee: 350,
    freeDeliveryThreshold: 8000,
    timelines: {
      colombo: "1 – 2 Business Days",
      suburbs: "2 – 3 Business Days",
      islandwide: "2 – 4 Business Days"
    },
    paymentMethods: [
      { name: "Cash on Delivery (COD)", note: "Pay when you receive the package anywhere in Sri Lanka" },
      { name: "Bank Transfer", note: "Direct deposit to Commercial Bank / HNB with receipt verification via WhatsApp" },
      { name: "Koko / Mintpay (Coming Soon)", note: "Split into 3 interest-free installments" }
    ]
  },

  policies: {
    exchangeDays: 7,
    exchangeNote: "Hassle-free size exchange within 7 days. Items must be unworn, unwashed with original tags attached.",
    deliveryGuarantee: "All orders packed with tamper-proof security seals and tracked delivery."
  }
};

// Export for module or browser window
if (typeof window !== 'undefined') {
  window.STORE_CONFIG = STORE_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = STORE_CONFIG;
}
