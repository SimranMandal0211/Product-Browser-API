const CATEGORIES = [
  'electronics', 'footwear', 'apparel', 'home-kitchen',
  'books', 'toys', 'sports', 'beauty', 'groceries', 'automotive',
];

const productRows = document.getElementById('productRows');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const categoryFilter = document.getElementById('categoryFilter');
const resetBtn = document.getElementById('resetBtn');
const statusEl = document.getElementById('status');

let currentCursor = null;
let currentCategory = '';

function populateCategoryDropdown() {
  CATEGORIES.forEach((cat) => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });
}

function renderProducts(items) {
  items.forEach((p) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>${new Date(p.createdAt).toLocaleString()}</td>
    `;
    productRows.appendChild(row);
  });
}

async function loadPage({ reset = false } = {}) {
  if (reset) {
    productRows.innerHTML = '';
    currentCursor = null;
  }

  statusEl.textContent = 'Loading...';

  const params = new URLSearchParams();
  params.set('limit', '20');
  if (currentCategory) params.set('category', currentCategory);
  if (currentCursor) params.set('cursor', currentCursor);

  const res = await fetch(`/products?${params.toString()}`);
  const data = await res.json();

  renderProducts(data.items);
  currentCursor = data.nextCursor;
  loadMoreBtn.disabled = !data.hasNextPage;
  statusEl.textContent = data.hasNextPage
    ? `Showing ${productRows.children.length} products. More available.`
    : `Showing ${productRows.children.length} products. End of list.`;
}

loadMoreBtn.addEventListener('click', () => loadPage());

categoryFilter.addEventListener('change', (e) => {
  currentCategory = e.target.value;
  loadPage({ reset: true });
});

resetBtn.addEventListener('click', () => {
  currentCategory = '';
  categoryFilter.value = '';
  loadPage({ reset: true });
});

populateCategoryDropdown();
loadPage({ reset: true });