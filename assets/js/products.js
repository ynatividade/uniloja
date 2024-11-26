const productsList = document.getElementById('productsList');
const addProductForm = document.getElementById('addProductForm');
const localStorageKey = 'productData';

// Função para carregar produtos da API ou do localStorage
async function loadProducts() {
  let products = JSON.parse(localStorage.getItem(localStorageKey));

  if (!products) {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products;
    localStorage.setItem(localStorageKey, JSON.stringify(products)); // Salva no localStorage
  }

  displayProducts(products);
}

// Função para exibir os produtos na tela
function displayProducts(products) {
  productsList.innerHTML = ''; // Limpa a lista antes de exibir
  products.forEach((product) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <div>
        <p><strong>${product.title}</strong></p>
        <p>${product.description}</p>   
        <p>Marca: ${product.brand}</p>
        <p>Categoria: ${product.category}</p>
        <p><strong>Preço: R$ ${product.price.toFixed(2)}</strong></p>
      </div>
      <button onclick="removeProduct(${product.id})">Remover</button>
    `;
    productsList.appendChild(li);
  });
}

// Função para remover produto
function removeProduct(productId) {
  let products = JSON.parse(localStorage.getItem(localStorageKey));
  products = products.filter(product => product.id !== productId);
  localStorage.setItem(localStorageKey, JSON.stringify(products)); // Atualiza o localStorage
  displayProducts(products); // Atualiza a lista exibida
}

// Função para adicionar um novo produto
function addProduct(event) {
  event.preventDefault(); // Impede o envio do formulário
  let products = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // Obtém os valores do formulário
  const title = document.getElementById('productTitle').value;
  const description = document.getElementById('productDescription').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const brand = document.getElementById('productBrand').value;
  const category = document.getElementById('productCategory').value;
  const thumbnail = document.getElementById('productThumbnail').value || 'https://via.placeholder.com/100';

  // Validação básica
  if (
    title.length < 3 || title.length > 50 ||
    description.length < 3 || description.length > 50 ||
    brand.length < 3 || brand.length > 50 ||
    category.length < 3 || category.length > 50 ||
    isNaN(price) || price <= 0
  ) {
    alert('Por favor, preencha os campos corretamente.');
    return;
  }

  // Cria um novo produto
  const newProduct = {
    id: Date.now(), // Gera um ID único com timestamp
    title,
    description,
    price,
    brand,
    category,
    thumbnail,
  };

  // Adiciona o novo produto à lista
  products.push(newProduct);
  localStorage.setItem(localStorageKey, JSON.stringify(products)); // Atualiza o localStorage
  displayProducts(products); // Atualiza a lista exibida

  addProductForm.reset(); // Limpa o formulário
  alert('Produto adicionado com sucesso!');
}

// Event Listener para o formulário de adição de produtos
addProductForm.addEventListener('submit', addProduct);

// Carrega os produtos ao carregar a página
loadProducts();


