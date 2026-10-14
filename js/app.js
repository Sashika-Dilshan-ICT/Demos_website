/**
 * D FASHION - Application Controller
 * Handles UI interactions, product rendering, filtering,
 * modal dialogs, WhatsApp dispatching, and drawer state.
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  // Current Filter State
  state: {
    activeCategory: 'all',
    searchQuery: '',
    selectedSizes: [],
    selectedColor: null,
    maxPrice: 10000,
    sortBy: 'featured',
    currentDetailProduct: null,
    selectedDetailColor: null,
    selectedDetailSize: null,
    detailQuantity: 1
  },

  init() {
    this.cacheDOMElements();
    this.bindEvents();
    this.renderProducts();
    this.updateCartUI();
    this.initHeaderScroll();
    this.initFaqAccordions();
  },

  cacheDOMElements() {
    // Nav & Drawers
    this.siteHeader = document.querySelector('.site-header');
    this.menuToggleBtn = document.getElementById('menuToggleBtn');
    this.mobileDrawer = document.getElementById('mobileNavDrawer');
    this.mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');
    this.cartDrawer = document.getElementById('cartDrawer');
    this.cartDrawerCloseBtn = document.getElementById('cartDrawerCloseBtn');
    this.cartTriggers = document.querySelectorAll('.cart-trigger');
    this.drawerOverlay = document.getElementById('drawerOverlay');

    // Cart Badges
    this.cartCountBadges = document.querySelectorAll('.cart-count-badge');
    this.cartItemsList = document.getElementById('cartItemsList');
    this.cartEmptyState = document.getElementById('cartEmptyState');
    this.cartSubtotalEl = document.getElementById('cartSubtotal');
    this.cartDeliveryEl = document.getElementById('cartDelivery');
    this.cartGrandTotalEl = document.getElementById('cartGrandTotal');
    this.freeDeliveryNotice = document.getElementById('freeDeliveryNotice');
    this.freeDeliveryProgressFill = document.getElementById('freeDeliveryProgressFill');

    // Shop Elements
    this.productsGrid = document.getElementById('productsGrid');
    this.categoryPills = document.querySelectorAll('.category-pill');
    this.productSearchInput = document.getElementById('productSearchInput');
    this.sortSelect = document.getElementById('sortSelect');
    this.filterToggleBtn = document.getElementById('filterToggleBtn');
    this.filterDrawerPanel = document.getElementById('filterDrawerPanel');
    this.priceRangeSlider = document.getElementById('priceRangeSlider');
    this.currentPriceLabel = document.getElementById('currentPriceLabel');
    this.sizeChips = document.querySelectorAll('.size-chip');
    this.colorDotsFilter = document.querySelectorAll('.color-dot-filter');
    this.activeFiltersSummary = document.getElementById('activeFiltersSummary');
    this.resetFiltersBtn = document.getElementById('resetFiltersBtn');

    // Modals
    this.productDetailModal = document.getElementById('productDetailModal');
    this.sizeGuideModal = document.getElementById('sizeGuideModal');
    this.waCheckoutModal = document.getElementById('waCheckoutModal');
    this.toastContainer = document.getElementById('toastContainer');
  },

  bindEvents() {
    // Header & Mobile Drawer
    this.menuToggleBtn?.addEventListener('click', () => this.openMobileDrawer());
    this.mobileDrawerCloseBtn?.addEventListener('click', () => this.closeDrawers());

    // Cart Drawer Triggers
    this.cartTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCartDrawer();
      });
    });
    this.cartDrawerCloseBtn?.addEventListener('click', () => this.closeDrawers());
    this.drawerOverlay?.addEventListener('click', () => this.closeDrawers());

    // Cart update event listener
    window.addEventListener('cart:updated', () => this.updateCartUI());

    // Shop Category Tabs
    this.categoryPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        this.categoryPills.forEach(p => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.activeCategory = e.currentTarget.dataset.category || 'all';
        this.renderProducts();
      });
    });

    // Category Shortcuts in Hero / Categories Section
    document.querySelectorAll('[data-shortcut-category]').forEach(card => {
      card.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.shortcutCategory;
        const targetPill = document.querySelector(`.category-pill[data-category="${cat}"]`);
        if (targetPill) {
          targetPill.click();
        }
        document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Search Input
    this.productSearchInput?.addEventListener('input', (e) => {
      this.state.searchQuery = e.target.value.trim().toLowerCase();
      this.renderProducts();
    });

    // Filter Toggle Button
    this.filterToggleBtn?.addEventListener('click', () => {
      this.filterDrawerPanel?.classList.toggle('open');
    });

    // Price Slider
    this.priceRangeSlider?.addEventListener('input', (e) => {
      this.state.maxPrice = parseInt(e.target.value, 10);
      if (this.currentPriceLabel) {
        this.currentPriceLabel.textContent = `Rs. ${this.state.maxPrice.toLocaleString('en-LK')}`;
      }
      this.renderProducts();
    });

    // Size Chips Filter
    this.sizeChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const size = e.currentTarget.dataset.size;
        e.currentTarget.classList.toggle('active');
        if (this.state.selectedSizes.includes(size)) {
          this.state.selectedSizes = this.state.selectedSizes.filter(s => s !== size);
        } else {
          this.state.selectedSizes.push(size);
        }
        this.renderProducts();
      });
    });

    // Color Dots Filter
    this.colorDotsFilter.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const color = e.currentTarget.dataset.color;
        if (this.state.selectedColor === color) {
          this.state.selectedColor = null;
          e.currentTarget.classList.remove('active');
        } else {
          this.colorDotsFilter.forEach(d => d.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this.state.selectedColor = color;
        }
        this.renderProducts();
      });
    });

    // Reset Filters
    this.resetFiltersBtn?.addEventListener('click', () => {
      this.resetAllFilters();
    });

    // Sort Dropdown
    this.sortSelect?.addEventListener('change', (e) => {
      this.state.sortBy = e.target.value;
      this.renderProducts();
    });

    // Checkout Modal Launch
    document.getElementById('btnOpenWaCheckout')?.addEventListener('click', () => {
      this.openWaCheckoutModal();
    });

    // Checkout Form Live WhatsApp Message Preview
    const checkoutForm = document.getElementById('waCheckoutForm');
    if (checkoutForm) {
      checkoutForm.addEventListener('input', () => this.updateWaCheckoutPreview());
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitWaCheckout();
      });
    }

    // Contact Form WhatsApp Dispatch
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactFormSubmit(contactForm);
      });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.showToast('Thank you for subscribing to D FASHION Drops!');
        newsletterForm.reset();
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // Global Keydown: Escape key closes modals and drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDrawers();
        this.closeAllModals();
      }
    });
  },

  // Header Scroll Shadow
  initHeaderScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        this.siteHeader?.classList.add('scrolled');
      } else {
        this.siteHeader?.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  // FAQ Accordions
  initFaqAccordions() {
    document.querySelectorAll('.faq-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const card = e.currentTarget.closest('.faq-card');
        card.classList.toggle('open');
      });
    });
  },

  // Drawers Handling
  openMobileDrawer() {
    this.mobileDrawer?.classList.add('open');
    this.drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  openCartDrawer() {
    this.closeAllModals();
    this.mobileDrawer?.classList.remove('open');
    this.cartDrawer?.classList.add('open');
    this.drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updateCartUI();
  },

  closeDrawers() {
    this.mobileDrawer?.classList.remove('open');
    this.cartDrawer?.classList.remove('open');
    this.drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  },

  closeAllModals() {
    this.productDetailModal?.classList.remove('open');
    this.sizeGuideModal?.classList.remove('open');
    this.waCheckoutModal?.classList.remove('open');
    if (!this.cartDrawer?.classList.contains('open') && !this.mobileDrawer?.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  },

  // Product Filtering & Sorting Logic
  getFilteredProducts() {
    let products = [...(window.PRODUCTS_DATA || [])];

    // Filter by Category
    if (this.state.activeCategory && this.state.activeCategory !== 'all') {
      const cat = this.state.activeCategory.toLowerCase();
      products = products.filter(p => {
        if (cat === 'new-arrivals') return p.isNew;
        if (cat === 'sale') return p.isSale;
        if (cat === 'unisex') return p.gender?.includes('Unisex');
        if (cat === "men's" || cat === 'mens') return p.gender?.includes("Men's") || p.gender?.includes('Unisex');
        if (cat === "women's" || cat === 'womens') return p.gender?.includes("Women's") || p.gender?.includes('Unisex');
        // Check subcategory
        const categorySlug = p.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
        return categorySlug.includes(cat) || p.category.toLowerCase() === cat;
      });
    }

    // Filter by Search Query
    if (this.state.searchQuery) {
      const q = this.state.searchQuery;
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }

    // Filter by Max Price
    if (this.state.maxPrice) {
      products = products.filter(p => p.price <= this.state.maxPrice);
    }

    // Filter by Sizes
    if (this.state.selectedSizes.length > 0) {
      products = products.filter(p => 
        this.state.selectedSizes.some(size => p.sizes.includes(size))
      );
    }

    // Filter by Color
    if (this.state.selectedColor) {
      const col = this.state.selectedColor.toLowerCase();
      products = products.filter(p => 
        p.colors.some(c => c.name.toLowerCase().includes(col))
      );
    }

    // Sorting
    switch (this.state.sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured'
        products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return products;
  },

  // Reset Filters
  resetAllFilters() {
    this.state.searchQuery = '';
    this.state.selectedSizes = [];
    this.state.selectedColor = null;
    this.state.maxPrice = 10000;
    this.state.sortBy = 'featured';

    if (this.productSearchInput) this.productSearchInput.value = '';
    if (this.priceRangeSlider) this.priceRangeSlider.value = 10000;
    if (this.currentPriceLabel) this.currentPriceLabel.textContent = 'Rs. 10,000';
    if (this.sortSelect) this.sortSelect.value = 'featured';

    this.sizeChips.forEach(c => c.classList.remove('active'));
    this.colorDotsFilter.forEach(d => d.classList.remove('active'));

    this.renderProducts();
  },

  // Render Product Cards
  renderProducts() {
    if (!this.productsGrid) return;

    const products = this.getFilteredProducts();

    if (products.length === 0) {
      this.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-inline: auto; color: var(--color-sand-400); margin-bottom: 1rem;">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3 style="font-family: var(--font-heading); font-size: 1.25rem; margin-bottom: 0.5rem;">No street styles found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Try adjusting your search filters or price threshold.</p>
          <button class="btn btn-secondary btn-sm" onclick="App.resetAllFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    this.productsGrid.innerHTML = products.map(product => {
      // Badge HTML
      let badgeHtml = '';
      if (product.badge) {
        let badgeClass = 'badge-best-seller';
        if (product.badge.toLowerCase().includes('sale')) badgeClass = 'badge-sale';
        else if (product.badge.toLowerCase().includes('new')) badgeClass = 'badge-new';
        badgeHtml = `<span class="badge-tag ${badgeClass}">${product.badge}</span>`;
      }

      // Color Dots HTML
      const colorsHtml = product.colors.map(c => `
        <span class="color-dot-mini" style="background-color: ${c.hex};" title="${c.name}"></span>
      `).join('');

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-badges">
              ${badgeHtml}
            </div>
            <div class="product-quick-actions">
              <button class="btn-quick-view" onclick="App.openProductDetailModal('${product.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Quick View
              </button>
              <button class="btn-quick-wa" title="Order via WhatsApp" onclick="App.openDirectProductWhatsApp('${product.id}')">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-colors-preview">
              ${colorsHtml}
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); margin-left: 4px;">${product.colors.length} colors</span>
            </div>
            <div class="product-pricing">
              <span class="price-current">Rs. ${product.price.toLocaleString('en-LK')}</span>
              ${product.originalPrice ? `<span class="price-original">Rs. ${product.originalPrice.toLocaleString('en-LK')}</span>` : ''}
            </div>
            <div class="product-card-footer">
              <button class="btn-add-cart-card" onclick="App.handleQuickAddToCart('${product.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                Add To Bag
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  },

  // Open Product Details Modal
  openProductDetailModal(productId) {
    const product = window.PRODUCTS_DATA?.find(p => p.id === productId);
    if (!product) return;

    this.state.currentDetailProduct = product;
    this.state.selectedDetailColor = product.colors[0];
    this.state.selectedDetailSize = product.sizes[0];
    this.state.detailQuantity = 1;

    // Render Modal Content
    const modalContainer = this.productDetailModal?.querySelector('.modal-container');
    if (!modalContainer) return;

    const colorsHtml = product.colors.map((c, i) => `
      <button class="color-option-btn ${i === 0 ? 'active' : ''}" 
        style="background-color: ${c.hex};" 
        data-color-name="${c.name}"
        data-color-hex="${c.hex}"
        title="${c.name}"
        onclick="App.selectDetailColor(this, '${c.name}', '${c.hex}')">
      </button>
    `).join('');

    const sizesHtml = product.sizes.map((s, i) => `
      <button class="size-option-btn ${i === 0 ? 'active' : ''}" 
        data-size="${s}" 
        onclick="App.selectDetailSize(this, '${s}')">
        ${s}
      </button>
    `).join('');

    const specsHtml = product.specifications?.map(spec => `
      <div class="spec-item">
        <span class="spec-label">${spec.label}</span>
        <span>${spec.value}</span>
      </div>
    `).join('') || '';

    modalContainer.innerHTML = `
      <button class="modal-close-btn modal-close-trigger" onclick="App.closeAllModals()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="product-detail-layout">
        <!-- Gallery -->
        <div class="detail-gallery">
          <div class="detail-main-image-wrap">
            <img id="detailMainImg" src="${product.image}" alt="${product.name}" class="detail-main-image">
          </div>
          <div class="detail-thumbs">
            <div class="detail-thumb active" onclick="App.switchDetailThumb(this, '${product.image}')">
              <img src="${product.image}" alt="${product.name}">
            </div>
            ${product.secondaryImage ? `
              <div class="detail-thumb" onclick="App.switchDetailThumb(this, '${product.secondaryImage}')">
                <img src="${product.secondaryImage}" alt="${product.name}">
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Info & Actions -->
        <div class="detail-info">
          <div class="detail-header">
            <div class="detail-sku">SKU: ${product.id} • ${product.category}</div>
            <h2 class="detail-title">${product.name}</h2>
            <p class="detail-subtitle">${product.subtitle || ''}</p>
          </div>

          <div class="detail-pricing-stock">
            <div class="detail-prices">
              <span class="detail-price-main">Rs. ${product.price.toLocaleString('en-LK')}</span>
              ${product.originalPrice ? `<span class="detail-price-was">Rs. ${product.originalPrice.toLocaleString('en-LK')}</span>` : ''}
            </div>
            <span class="stock-indicator in-stock">In Stock — Dispatched in 24h</span>
          </div>

          <!-- Color Selector -->
          <div class="option-label">
            <span>Color: <strong class="option-selected-name" id="selectedColorLabel">${product.colors[0].name}</strong></span>
          </div>
          <div class="detail-color-options">
            ${colorsHtml}
          </div>

          <!-- Size Selector & Size Guide Link -->
          <div class="option-label">
            <span>Size: <strong class="option-selected-name" id="selectedSizeLabel">${product.sizes[0]}</strong></span>
            <button class="btn-open-size-guide" onclick="App.openSizeGuideModal()">Size Guide Chart ↗</button>
          </div>
          <div class="detail-size-options">
            ${sizesHtml}
          </div>

          <!-- Quantity & Dual Actions -->
          <div class="detail-purchase-row">
            <div class="quantity-control">
              <button class="qty-btn" onclick="App.changeDetailQuantity(-1)">−</button>
              <span class="qty-value" id="detailQtyValue">1</span>
              <button class="qty-btn" onclick="App.changeDetailQuantity(1)">+</button>
            </div>
            <button class="btn btn-primary btn-block" onclick="App.addCurrentDetailToCart()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Add To Bag
            </button>
          </div>

          <!-- Direct WhatsApp Order Button -->
          <div class="detail-actions-group">
            <button class="btn btn-whatsapp btn-block" onclick="App.dispatchDetailWhatsAppOrder()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Direct Order via WhatsApp
            </button>
          </div>

          <!-- Product Specs Accordion -->
          <div class="accordion-group">
            <div class="accordion-item active">
              <button class="accordion-trigger" onclick="this.parentElement.classList.toggle('active')">
                <span>Description & Fabric</span>
                <span class="accordion-icon">▼</span>
              </button>
              <div class="accordion-content">
                <p style="margin-bottom: 0.85rem;">${product.description}</p>
                <div class="spec-list">
                  ${specsHtml}
                </div>
              </div>
            </div>

            <div class="accordion-item">
              <button class="accordion-trigger" onclick="this.parentElement.classList.toggle('active')">
                <span>Delivery & COD Info</span>
                <span class="accordion-icon">▼</span>
              </button>
              <div class="accordion-content">
                <p>• <strong>Colombo (1-15):</strong> 1 – 2 Business Days (Express delivery available)</p>
                <p>• <strong>Outstation Sri Lanka:</strong> 2 – 4 Business Days via tracked courier</p>
                <p>• <strong>Payment:</strong> Cash on Delivery (COD) or Direct Bank Deposit</p>
                <p>• <strong>Free Delivery:</strong> On orders over Rs. 8,000</p>
              </div>
            </div>

            <div class="accordion-item">
              <button class="accordion-trigger" onclick="this.parentElement.classList.toggle('active')">
                <span>Garment Care & 7-Day Exchange</span>
                <span class="accordion-icon">▼</span>
              </button>
              <div class="accordion-content">
                <p style="margin-bottom: 0.5rem;">${product.care || 'Gentle cold wash inside out. Hang dry in shade.'}</p>
                <p>Enjoy our 7-day hassle-free size exchange policy. Keep tags attached and unwashed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.productDetailModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  selectDetailColor(btn, colorName, colorHex) {
    document.querySelectorAll('.color-option-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.state.selectedDetailColor = { name: colorName, hex: colorHex };
    const label = document.getElementById('selectedColorLabel');
    if (label) label.textContent = colorName;
  },

  selectDetailSize(btn, size) {
    document.querySelectorAll('.size-option-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    this.state.selectedDetailSize = size;
    const label = document.getElementById('selectedSizeLabel');
    if (label) label.textContent = size;
  },

  changeDetailQuantity(delta) {
    let newQty = this.state.detailQuantity + delta;
    if (newQty < 1) newQty = 1;
    this.state.detailQuantity = newQty;
    const el = document.getElementById('detailQtyValue');
    if (el) el.textContent = newQty;
  },

  switchDetailThumb(thumb, imgSrc) {
    document.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    const mainImg = document.getElementById('detailMainImg');
    if (mainImg) mainImg.src = imgSrc;
  },

  // Add from Detail Modal
  addCurrentDetailToCart() {
    if (!this.state.currentDetailProduct) return;
    const success = window.Cart.addItem(
      this.state.currentDetailProduct.id,
      this.state.selectedDetailSize,
      this.state.selectedDetailColor,
      this.state.detailQuantity
    );
    if (success) {
      this.showToast(`Added ${this.state.currentDetailProduct.name} to your bag!`);
      this.closeAllModals();
      this.openCartDrawer();
    }
  },

  // Direct WhatsApp Order from Modal
  dispatchDetailWhatsAppOrder() {
    if (!this.state.currentDetailProduct) return;
    const url = window.Cart.getSingleProductWhatsAppUrl(
      this.state.currentDetailProduct,
      this.state.selectedDetailSize,
      this.state.selectedDetailColor,
      this.state.detailQuantity
    );
    window.open(url, '_blank');
  },

  // Quick Action: Add to Bag directly from grid
  handleQuickAddToCart(productId) {
    const product = window.PRODUCTS_DATA?.find(p => p.id === productId);
    if (!product) return;
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];

    window.Cart.addItem(product.id, defaultSize, defaultColor, 1);
    this.showToast(`Added ${product.name} (${defaultSize}) to bag!`);
    this.openCartDrawer();
  },

  // Direct WhatsApp from grid
  openDirectProductWhatsApp(productId) {
    const product = window.PRODUCTS_DATA?.find(p => p.id === productId);
    if (!product) return;
    const url = window.Cart.getSingleProductWhatsAppUrl(product, product.sizes[0], product.colors[0], 1);
    window.open(url, '_blank');
  },

  // Open Size Guide Modal
  openSizeGuideModal() {
    const guide = window.SIZE_GUIDE_DATA;
    if (!guide || !this.sizeGuideModal) return;

    const topsTable = `
      <table class="size-table">
        <thead>
          <tr>${guide.tops.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${guide.tops.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;

    const bottomsTable = `
      <table class="size-table">
        <thead>
          <tr>${guide.bottoms.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${guide.bottoms.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;

    const container = this.sizeGuideModal.querySelector('.modal-container');
    container.innerHTML = `
      <button class="modal-close-btn modal-close-trigger" onclick="App.closeAllModals()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div style="padding: 1.5rem;">
        <span class="section-tag">Fit & Sizing</span>
        <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 700; margin-bottom: 0.5rem;">D FASHION Size Guide</h2>
        <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.5rem;">
          Our garments are engineered for contemporary streetwear drape with dropped shoulders and relaxed boxy cuts.
        </p>

        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.5rem;">${guide.tops.title}</h3>
        <div class="size-table-wrap">${topsTable}</div>
        <p class="size-guide-tips">${guide.tops.note}</p>

        <h3 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.5rem;">${guide.bottoms.title}</h3>
        <div class="size-table-wrap">${bottomsTable}</div>
        <p class="size-guide-tips">${guide.bottoms.note}</p>
      </div>
    `;

    this.sizeGuideModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  // Update Cart Drawer UI
  updateCartUI() {
    const items = window.Cart.getItems();
    const totals = window.Cart.getTotals();

    // Update Badges
    this.cartCountBadges.forEach(badge => {
      badge.textContent = totals.itemCount;
      badge.classList.remove('bump');
      void badge.offsetWidth; // trigger reflow
      badge.classList.add('bump');
    });

    // Update Bottom Navigation Badge
    const bottomCartBadge = document.querySelector('.bottom-cart-badge');
    if (bottomCartBadge) {
      bottomCartBadge.textContent = totals.itemCount;
    }

    // Toggle Empty State vs Items
    if (items.length === 0) {
      if (this.cartItemsList) this.cartItemsList.style.display = 'none';
      if (this.cartEmptyState) this.cartEmptyState.style.display = 'flex';
      const checkoutBtn = document.getElementById('btnOpenWaCheckout');
      if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
      if (this.cartItemsList) this.cartItemsList.style.display = 'flex';
      if (this.cartEmptyState) this.cartEmptyState.style.display = 'none';
      const checkoutBtn = document.getElementById('btnOpenWaCheckout');
      if (checkoutBtn) checkoutBtn.disabled = false;

      // Render Items
      if (this.cartItemsList) {
        this.cartItemsList.innerHTML = items.map(item => `
          <div class="cart-item-card" data-key="${item.key}">
            <div class="cart-item-thumb">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-content">
              <div class="cart-item-header">
                <h4 class="cart-item-name">${item.name}</h4>
                <button class="cart-item-remove-btn" title="Remove Item" onclick="App.removeCartItem('${item.key}')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div class="cart-item-variants">
                Size: ${item.size} • Color: ${item.color}
              </div>
              <div class="cart-item-footer">
                <div class="cart-qty-controls">
                  <button class="cart-qty-btn" onclick="App.updateCartQty('${item.key}', ${item.quantity - 1})">−</button>
                  <span class="cart-qty-num">${item.quantity}</span>
                  <button class="cart-qty-btn" onclick="App.updateCartQty('${item.key}', ${item.quantity + 1})">+</button>
                </div>
                <span class="cart-item-subtotal">Rs. ${(item.price * item.quantity).toLocaleString('en-LK')}</span>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    // Update Totals
    if (this.cartSubtotalEl) {
      this.cartSubtotalEl.textContent = `Rs. ${totals.subtotal.toLocaleString('en-LK')}`;
    }
    if (this.cartDeliveryEl) {
      this.cartDeliveryEl.textContent = totals.isFreeDelivery ? 'FREE' : `Rs. ${totals.deliveryFee}`;
    }
    if (this.cartGrandTotalEl) {
      this.cartGrandTotalEl.textContent = `Rs. ${totals.grandTotal.toLocaleString('en-LK')}`;
    }

    // Update Free Delivery Progress Bar
    if (this.freeDeliveryNotice && this.freeDeliveryProgressFill) {
      if (totals.isFreeDelivery) {
        this.freeDeliveryNotice.innerHTML = `
          <div class="free-delivery-text" style="color: var(--color-whatsapp-dark); font-weight: 700;">
            ✓ You unlocked FREE Islandwide Delivery!
          </div>
          <div class="delivery-progress-track">
            <div class="delivery-progress-fill" style="width: 100%;"></div>
          </div>
        `;
      } else {
        this.freeDeliveryNotice.innerHTML = `
          <div class="free-delivery-text">
            Add <strong>Rs. ${totals.amountNeededForFree.toLocaleString('en-LK')}</strong> more for <strong>FREE Islandwide Delivery</strong>!
          </div>
          <div class="delivery-progress-track">
            <div class="delivery-progress-fill" style="width: ${totals.deliveryProgressPercent}%;"></div>
          </div>
        `;
      }
    }
  },

  updateCartQty(itemKey, newQty) {
    window.Cart.updateQuantity(itemKey, newQty);
  },

  removeCartItem(itemKey) {
    window.Cart.removeItem(itemKey);
    this.showToast('Item removed from your bag', 'remove');
  },

  // Open WhatsApp Checkout Modal
  openWaCheckoutModal() {
    const items = window.Cart.getItems();
    if (items.length === 0) return;

    this.closeDrawers();
    this.updateWaCheckoutPreview();
    this.waCheckoutModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  getCheckoutFormData() {
    return {
      name: document.getElementById('checkoutName')?.value || '',
      phone: document.getElementById('checkoutPhone')?.value || '',
      address: document.getElementById('checkoutAddress')?.value || '',
      city: document.getElementById('checkoutCity')?.value || 'Colombo',
      paymentMethod: document.getElementById('checkoutPayment')?.value || 'Cash on Delivery (COD)',
      notes: document.getElementById('checkoutNotes')?.value || ''
    };
  },

  updateWaCheckoutPreview() {
    const previewBox = document.getElementById('waOrderPreviewText');
    if (!previewBox) return;
    const customer = this.getCheckoutFormData();
    previewBox.textContent = window.Cart.getCartMessagePreview(customer);
  },

  submitWaCheckout() {
    const customer = this.getCheckoutFormData();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert('Please fill in your Name, Phone Number, and Delivery Address to proceed.');
      return;
    }

    const url = window.Cart.getCartCheckoutWhatsAppUrl(customer);
    if (url) {
      window.open(url, '_blank');
      this.closeAllModals();
      this.showToast('Redirecting to WhatsApp to send your order...');
    }
  },

  // Contact Form handler
  handleContactFormSubmit(form) {
    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const subject = form.querySelector('[name="subject"]')?.value || 'General Inquiry';
    const message = form.querySelector('[name="message"]')?.value || '';

    const storePhone = window.STORE_CONFIG?.whatsapp?.phoneNumber || '94771234567';

    const text = [
      `*D FASHION — NEW CUSTOMER INQUIRY*`,
      `---------------------------------`,
      `• *From:* ${name}`,
      `• *Phone:* ${phone}`,
      `• *Subject:* ${subject}`,
      `• *Message:* ${message}`,
      `---------------------------------`,
      `Sent via dfashion.lk website contact form`
    ].join('\n');

    const waUrl = `https://wa.me/${storePhone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    this.showToast('Inquiry opened in WhatsApp!');
    form.reset();
  },

  // Toast Notification System
  showToast(message, type = 'success') {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'remove' ? 'toast-remove' : ''}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastIn 0.3s ease reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Global Exposure
window.App = App;
