/**
 * D FASHION - Shopping Cart & WhatsApp Order Engine
 * Handles cart state, local persistence, quantity adjustments,
 * subtotal calculations, and formatted WhatsApp message generation.
 */

const Cart = {
  STORAGE_KEY: 'dfashion_cart_items',

  // Get current cart items from localStorage
  getItems() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse cart data from storage', e);
      return [];
    }
  },

  // Save cart items to localStorage and trigger change event
  saveItems(items) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items, count: this.getTotalCount() } }));
    } catch (e) {
      console.error('Failed to save cart items', e);
    }
  },

  // Add item with specified size, color, and quantity
  addItem(productId, size, color, quantity = 1) {
    const product = window.PRODUCTS_DATA?.find(p => p.id === productId);
    if (!product) {
      console.error(`Product ${productId} not found`);
      return false;
    }

    const items = this.getItems();
    // Unique key for same product with exact same size and color
    const itemKey = `${productId}__${size}__${color.name || color}`;

    const existingIndex = items.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      items[existingIndex].quantity += Number(quantity);
    } else {
      items.push({
        key: itemKey,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        color: color.name || color,
        colorHex: color.hex || '#111111',
        quantity: Number(quantity)
      });
    }

    this.saveItems(items);
    return true;
  },

  // Update item quantity
  updateQuantity(itemKey, newQuantity) {
    let items = this.getItems();
    const qty = parseInt(newQuantity, 10);

    if (qty <= 0) {
      this.removeItem(itemKey);
      return;
    }

    items = items.map(item => {
      if (item.key === itemKey) {
        return { ...item, quantity: qty };
      }
      return item;
    });

    this.saveItems(items);
  },

  // Remove single item by composite key
  removeItem(itemKey) {
    const items = this.getItems().filter(item => item.key !== itemKey);
    this.saveItems(items);
  },

  // Clear entire cart
  clearCart() {
    this.saveItems([]);
  },

  // Total quantity of items in cart
  getTotalCount() {
    return this.getItems().reduce((total, item) => total + item.quantity, 0);
  },

  // Calculate subtotals and delivery rates
  getTotals() {
    const items = this.getItems();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const freeThreshold = window.STORE_CONFIG?.delivery?.freeDeliveryThreshold || 8000;
    const standardFee = window.STORE_CONFIG?.delivery?.standardFee || 350;

    const isFreeDelivery = subtotal >= freeThreshold;
    const deliveryFee = items.length === 0 ? 0 : (isFreeDelivery ? 0 : standardFee);
    const amountNeededForFree = Math.max(0, freeThreshold - subtotal);
    const deliveryProgressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
    const grandTotal = subtotal + deliveryFee;

    return {
      subtotal,
      deliveryFee,
      isFreeDelivery,
      freeThreshold,
      amountNeededForFree,
      deliveryProgressPercent,
      grandTotal,
      itemCount: this.getTotalCount()
    };
  },

  /**
   * Generates formatted WhatsApp Click-to-Chat URL for a single product order inquiry
   */
  getSingleProductWhatsAppUrl(product, size, color, quantity = 1) {
    const phone = window.STORE_CONFIG?.whatsapp?.phoneNumber || "94771234567";
    const colorName = color?.name || color || "Standard";
    const unitPrice = product.price;
    const lineTotal = unitPrice * quantity;

    const lines = [
      `*D FASHION — DIRECT ORDER INQUIRY*`,
      `---------------------------------`,
      `Hello D FASHION, I would like to order:`,
      `• *Item:* ${product.name}`,
      `• *SKU:* ${product.id}`,
      `• *Size:* ${size}`,
      `• *Color:* ${colorName}`,
      `• *Quantity:* ${quantity}`,
      `• *Price:* Rs. ${unitPrice.toLocaleString('en-LK')}`,
      `• *Estimated Total:* Rs. ${lineTotal.toLocaleString('en-LK')}`,
      `---------------------------------`,
      `Please confirm availability, islandwide delivery timeline, and payment details (COD / Bank Transfer).`,
      `Thank you!`
    ];

    const message = lines.join('\n');
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Generates formatted WhatsApp Click-to-Chat URL for the entire cart checkout
   */
  getCartCheckoutWhatsAppUrl(customer) {
    const phone = window.STORE_CONFIG?.whatsapp?.phoneNumber || "94771234567";
    const items = this.getItems();
    const totals = this.getTotals();

    if (items.length === 0) return null;

    const itemsSummary = items.map((item, idx) => {
      const itemSubtotal = item.price * item.quantity;
      return `${idx + 1}. *${item.name}*\n   Size: ${item.size} | Color: ${item.color}\n   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString('en-LK')} = Rs. ${itemSubtotal.toLocaleString('en-LK')}`;
    }).join('\n\n');

    const deliveryText = totals.isFreeDelivery 
      ? `FREE Islandwide Delivery (Order > Rs. ${totals.freeThreshold.toLocaleString('en-LK')})`
      : `Rs. ${totals.deliveryFee} (Standard Islandwide)`;

    const lines = [
      `*D FASHION — NEW ORDER CHECKOUT*`,
      `=================================`,
      `*Customer Information:*`,
      `• *Name:* ${customer.name || 'Valued Customer'}`,
      `• *Contact Phone:* ${customer.phone || 'Not provided'}`,
      `• *Delivery Address:* ${customer.address || ''}`,
      `• *City / District:* ${customer.city || 'Colombo'}`,
      `• *Preferred Payment:* ${customer.paymentMethod || 'Cash on Delivery (COD)'}`,
      customer.notes ? `• *Order Notes:* ${customer.notes}` : '',
      `=================================`,
      `*Order Items (${totals.itemCount} items):*`,
      itemsSummary,
      `=================================`,
      `*Subtotal:* Rs. ${totals.subtotal.toLocaleString('en-LK')}`,
      `*Delivery:* ${deliveryText}`,
      `*ESTIMATED TOTAL:* Rs. ${totals.grandTotal.toLocaleString('en-LK')}`,
      `=================================`,
      `Please confirm my order and share the tracking details. Thank you!`
    ].filter(Boolean);

    const message = lines.join('\n');
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Generates text preview of the WhatsApp order message for customer preview
   */
  getCartMessagePreview(customer) {
    const items = this.getItems();
    const totals = this.getTotals();

    if (items.length === 0) return "Your cart is empty.";

    const itemsSummary = items.map((item, idx) => {
      const itemSubtotal = item.price * item.quantity;
      return `${idx + 1}. ${item.name} (${item.size} / ${item.color}) - Qty ${item.quantity} = Rs. ${itemSubtotal.toLocaleString('en-LK')}`;
    }).join('\n');

    const deliveryText = totals.isFreeDelivery ? 'FREE' : `Rs. ${totals.deliveryFee}`;

    return [
      `ORDER SUMMARY FOR D FASHION`,
      `Name: ${customer.name || '-'}`,
      `Phone: ${customer.phone || '-'}`,
      `Address: ${customer.address || '-'}, ${customer.city || '-'}`,
      `Payment: ${customer.paymentMethod || 'Cash on Delivery'}`,
      `---------------------------------`,
      itemsSummary,
      `---------------------------------`,
      `Subtotal: Rs. ${totals.subtotal.toLocaleString('en-LK')}`,
      `Delivery: ${deliveryText}`,
      `Total: Rs. ${totals.grandTotal.toLocaleString('en-LK')}`
    ].join('\n');
  }
};

// Export to window or module
if (typeof window !== 'undefined') {
  window.Cart = Cart;
}
