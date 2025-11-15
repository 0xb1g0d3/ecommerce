<script setup>
import { computed, ref } from 'vue'

const inventory = [
  {
    id: 'smartphone-pro',
    title: 'iPhone 15 Pro Max 256GB',
    price: 8899,
    installments: '12x R$ 741,58 sem juros',
    shipping: 'Frete grátis Mercado Envios',
    badge: 'OFERTA DO DIA',
    description: 'Tela Super Retina XDR, chip A17 Pro e câmera tripla com modo cinema.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'smart-tv-55',
    title: 'Smart TV Samsung Neo QLED 55"',
    price: 3999,
    installments: '10x R$ 399,90 sem juros',
    shipping: 'Entrega Full em 48h',
    badge: 'FULL',
    description: 'Painel QLED 4K com Mini LED, Alexa integrada e taxa de 120Hz.',
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'console-next',
    title: 'PlayStation 5 Slim + Spider-Man 2',
    price: 4299,
    installments: '12x R$ 358,25 sem juros',
    shipping: 'Retire hoje em São Paulo',
    badge: 'LANÇAMENTO',
    description: 'Bundle oficial com o jogo exclusivo mais aguardado do ano.',
    image:
      'https://images.unsplash.com/photo-1606813902917-832a1f29cf2b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'smartwatch',
    title: 'Apple Watch Series 9 GPS',
    price: 3499,
    installments: '10x R$ 349,90 sem juros',
    shipping: 'Frete grátis',
    badge: 'ENVIO RÁPIDO',
    description: 'Monitoramento avançado de saúde, detecção de treino e tela sempre ativa.',
    image:
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=600&q=80',
  },
]

const cartItems = ref([])
const isCartOpen = ref(false)

const cartTotal = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0),
)

const formattedCartTotal = computed(() =>
  cartTotal.value.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' }),
)

function addToCart(product) {
  const existing = cartItems.value.find((item) => item.id === product.id)

  if (existing) {
    existing.quantity += 1
    return
  }

  cartItems.value.push({
    id: product.id,
    title: product.title,
    price: product.price,
    quantity: 1,
  })

  isCartOpen.value = true
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })
}

function toggleCart() {
  isCartOpen.value = !isCartOpen.value
}

function closeCart() {
  isCartOpen.value = false
}
</script>

<template>
  <div class="site-shell">
    <header class="top-bar">
      <div class="top-bar__wrapper">
        <div class="top-bar__location">
          <span class="location-icon">📦</span>
          <span>Enviar para São Paulo - Bela Vista</span>
        </div>
        <nav class="top-bar__links">
          <a href="#">Ofertas</a>
          <a href="#">Histórico</a>
          <a href="#">Supermercado</a>
          <a href="#">Moda</a>
        </nav>
      </div>
    </header>

    <header class="main-header">
      <div class="main-header__inner">
        <div class="main-header__brand">
          <span class="brand-mark">Mercadinho</span>
          <span class="brand-tagline">inspirado no Mercado Livre</span>
        </div>

        <label class="search">
          <input type="search" placeholder="Buscar produtos, marcas e muito mais..." />
          <button type="button">Buscar</button>
        </label>

        <div class="header-actions">
          <a href="#">Crie a sua conta</a>
          <a href="#">Entre</a>
          <button class="cart-button" type="button" @click="toggleCart">
            Carrinho ({{ cartItems.length }})
          </button>
        </div>
      </div>
    </header>

    <div class="page-content">
      <main>
        <section class="hero">
          <div class="hero__content">
            <p class="hero__eyebrow">Frete grátis acima de R$ 79</p>
            <h1>Ganhe cashback para abastecer sua casa</h1>
            <p>
              Electronicos, mercado, moda e mais com entrega rápida e benefícios Mercado Pontos.
            </p>

            <div class="hero__cta">
              <button type="button">Ver ofertas do dia</button>
              <span>Pagamento rápido com Mercado Pago</span>
            </div>
          </div>
          <div class="hero__image">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
              alt="Pessoa feliz recebendo compras"
            />
          </div>
        </section>

        <section class="products">
          <header class="section-header">
            <h2>Ofertas selecionadas para você</h2>
            <a href="#">Ver tudo</a>
          </header>

          <div class="products__grid">
            <article v-for="product in inventory" :key="product.id" class="product-card">
              <span class="product-card__badge">{{ product.badge }}</span>

              <div class="product-card__image">
                <img :src="product.image" :alt="product.title" />
              </div>

              <div class="product-card__body">
                <h3>{{ product.title }}</h3>
                <p class="description">{{ product.description }}</p>

                <strong class="price">{{ formatPrice(product.price) }}</strong>
                <span class="installments">{{ product.installments }}</span>
                <span class="shipping">{{ product.shipping }}</span>
              </div>

              <button class="product-card__cta" type="button" @click="addToCart(product)">
                Adicionar ao carrinho
              </button>
            </article>
          </div>
        </section>
      </main>
    </div>

    <div class="cart-drawer" :class="{ 'cart-drawer--open': isCartOpen }">
      <div class="cart-drawer__header">
        <h2>Seu carrinho</h2>
        <button class="close-btn" type="button" @click="closeCart">Fechar</button>
      </div>

      <div class="cart-drawer__body">
        <p v-if="cartItems.length === 0" class="empty-cart">Seu carrinho está vazio.</p>
        <ul v-else>
          <li v-for="item in cartItems" :key="item.id">
            <div>
              <p class="cart-item__title">{{ item.title }}</p>
              <span class="cart-item__quantity">Qtd: {{ item.quantity }}</span>
            </div>
            <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
          </li>
        </ul>
      </div>

      <div class="cart-drawer__footer">
        <div class="cart-total">
          <span>Total</span>
          <strong>{{ formattedCartTotal }}</strong>
        </div>
        <div class="cart-actions">
          <button class="secondary" type="button">Ir para o carrinho</button>
          <button type="button">Finalizar compra</button>
        </div>
      </div>
    </div>

    <div class="cart-backdrop" :class="{ 'cart-backdrop--visible': isCartOpen }" @click="closeCart" />
  </div>
</template>

<style scoped>
:global(:root) {
  --ml-yellow: #fff159;
  --ml-blue: #3483fa;
  --ml-green: #00a650;
}

.top-bar {
  background-color: var(--ml-yellow);
  padding: 0.25rem 0;
}

.top-bar__wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.35rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.85rem;
}

.top-bar__links {
  display: flex;
  gap: 1rem;
}

.top-bar__links a {
  color: #333;
}

.top-bar__location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4c4c4c;
}

.location-icon {
  font-size: 1.2rem;
}

.main-header {
  background-color: #fff159;
  padding: 1rem 0;
}

.main-header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: grid;
  grid-template-columns: 220px 1fr auto;
  align-items: center;
  gap: 1rem;
}

.main-header__brand {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.brand-mark {
  font-size: 1.35rem;
  font-weight: 700;
  color: #333;
}

.brand-tagline {
  color: #666;
  font-size: 0.85rem;
}

.search {
  display: grid;
  grid-template-columns: 1fr auto;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
}

.search input {
  border: none;
  padding: 0.75rem 1.25rem;
  outline: none;
  font-size: 0.95rem;
}

.search button {
  border: none;
  background-color: var(--ml-yellow);
  font-weight: 600;
  cursor: pointer;
  padding: 0 1.5rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  align-items: center;
}

.header-actions a {
  color: #4c4c4c;
}

.cart-button {
  border: 1px solid #d9a600;
  background: #ffe680;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-weight: 600;
  color: #4c4c4c;
}

.site-shell {
  display: grid;
  gap: 1.5rem;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem 2rem 1.25rem;
}

main {
  display: grid;
  gap: 1.5rem;
}

.hero {
  background: linear-gradient(135deg, var(--ml-yellow) 0%, #ffe07b 100%);
  border-radius: 1rem;
  padding: clamp(1.25rem, 4vw, 2rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  align-items: center;
}

.hero__content h1 {
  font-size: clamp(1.4rem, 4vw, 1.9rem);
  color: #333;
  margin-bottom: 0.5rem;
}

.hero__content p {
  color: #4c4c4c;
}

.hero__eyebrow {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero__cta {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.hero__cta button {
  background-color: var(--ml-blue);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.75rem;
  font-weight: 600;
  cursor: pointer;
}

.hero__image img {
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  min-height: 240px;
}

.products {
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.07);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.section-header h2 {
  font-size: 1.25rem;
  color: #333;
}

.section-header a {
  color: var(--ml-blue);
}

.products__grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.product-card {
  border: 1px solid #f1f1f1;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: box-shadow 0.2s ease;
}

.product-card:hover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

.product-card__badge {
  background-color: #e8f2ff;
  color: var(--ml-blue);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  align-self: flex-start;
}

.product-card__image {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 0.75rem;
  background: #f8f8f8;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__body h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.product-card__body .description {
  color: #666;
  font-size: 0.9rem;
  margin: 0.35rem 0;
}

.product-card__body .price {
  display: block;
  font-size: 1.35rem;
  margin-bottom: 0.2rem;
}

.installments {
  color: #333;
  font-size: 0.9rem;
}

.shipping {
  color: var(--ml-green);
  font-weight: 600;
  font-size: 0.85rem;
}

.product-card__cta {
  margin-top: auto;
  border: none;
  background: var(--ml-blue);
  color: #fff;
  border-radius: 0.65rem;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: 600;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(380px, 90vw);
  height: 100vh;
  background: #fff;
  box-shadow: -12px 0 35px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.25s ease;
  display: flex;
  flex-direction: column;
  z-index: 20;
}

.cart-drawer--open {
  transform: translateX(0);
}

.cart-drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f1f1;
}

.cart-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem;
}

.cart-drawer__body ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart-drawer__body li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 0.5rem;
}

.cart-item__title {
  font-weight: 600;
  color: #333;
}

.cart-item__quantity {
  font-size: 0.85rem;
  color: #666;
}

.cart-drawer__footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #f1f1f1;
  display: grid;
  gap: 0.75rem;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-actions {
  display: grid;
  gap: 0.5rem;
}

.cart-actions button {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  cursor: pointer;
}

.cart-actions .secondary {
  background: #f3f3f3;
  color: #333;
  border: 1px solid #e0e0e0;
}

.cart-actions button:not(.secondary) {
  background: var(--ml-green);
  color: #fff;
}

.close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
  color: #555;
}

.cart-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease;
  z-index: 10;
}

.cart-backdrop--visible {
  opacity: 1;
  pointer-events: all;
}

.empty-cart {
  color: #666;
}

@media (max-width: 768px) {
  .top-bar__wrapper {
    justify-content: space-between;
    align-items: center;
    row-gap: 0.35rem;
  }

  .top-bar__links {
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    gap: 0.5rem 0.75rem;
    padding-bottom: 0.35rem;
  }

  .main-header {
    padding: 0.6rem 0;
  }

  .main-header__inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.75rem;
    align-items: center;
  }

  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.5rem;
  }

  .search {
    width: 100%;
    grid-template-columns: 1fr 4rem;
  }

  .search button {
    padding: 0 1rem;
    font-size: 0.85rem;
  }

  .cart-button {
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .hero {
    padding: 1.25rem;
  }

  .hero__cta {
    justify-content: center;
    text-align: center;
    gap: 0.75rem;
  }

  .products {
    padding: 1rem;
  }

  .products__grid {
    grid-template-columns: 1fr;
  }

  .product-card {
    padding: 0.9rem;
  }
}

@media (min-width: 1024px) {
  .main-header__inner {
    grid-template-columns: 220px 1fr auto;
  }

  .page-content {
    padding-inline: 1.5rem;
  }
}

@media (max-width: 480px) {
  .top-bar__wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-header__inner {
    padding: 0 1rem;
  }

  .brand-mark {
    font-size: 1.2rem;
  }

  .brand-tagline {
    font-size: 0.8rem;
  }

  .search input {
    padding: 0.6rem 0.9rem;
  }

  .search button {
    padding: 0 0.85rem;
  }

  .hero__content h1 {
    font-size: 1.35rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .products {
    padding: 0.9rem;
  }

  .product-card__body .description {
    font-size: 0.85rem;
  }
}
</style>
