const usersList = document.getElementById('usersList');
const addUserForm = document.getElementById('addUserForm');
const localStorageKey = 'userData';

// Função para carregar usuários da API ou do localStorage
async function loadUsers() {
  let users = JSON.parse(localStorage.getItem(localStorageKey));

  if (!users) {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    users = data.users;
    localStorage.setItem(localStorageKey, JSON.stringify(users)); // Salva no localStorage
  }

  displayUsers(users);
}

// Função para exibir os usuários na tela
function displayUsers(users) {
  usersList.innerHTML = ''; // Limpa a lista antes de exibir
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
      <div>
        <p><strong>${user.firstName} ${user.lastName}</strong></p>
        <p>Email: ${user.email}</p>
        <p>Idade: ${user.age}</p>
      </div>
      <button onclick="removeUser(${user.id})">Remover</button>
    `;
    usersList.appendChild(li);
  });
}

// Função para remover usuário
function removeUser(userId) {
  let users = JSON.parse(localStorage.getItem(localStorageKey));
  users = users.filter(user => user.id !== userId);
  localStorage.setItem(localStorageKey, JSON.stringify(users)); // Atualiza o localStorage
  displayUsers(users); // Atualiza a lista exibida
}

// Função para adicionar um novo usuário
function addUser(event) {
  event.preventDefault(); // Impede o envio do formulário
  let users = JSON.parse(localStorage.getItem(localStorageKey)) || [];

  // Obtém os valores do formulário
  const firstName = document.getElementById('userFirstName').value;
  const lastName = document.getElementById('userLastName').value;
  const email = document.getElementById('userEmail').value;
  const age = parseInt(document.getElementById('userAge').value, 10);
  const image = document.getElementById('userImage').value || 'https://via.placeholder.com/100';

  // Validação básica
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    firstName.length < 3 || firstName.length > 50 ||
    lastName.length < 3 || lastName.length > 50 ||
    !emailRegex.test(email) ||
    isNaN(age) || age <= 0 || age >= 120
  ) {
    alert('Por favor, preencha os campos corretamente.');
    return;
  }

  // Cria um novo usuário
  const newUser = {
    id: Date.now(), // Gera um ID único com timestamp
    firstName,
    lastName,
    email,
    age,
    image,
  };

  // Adiciona o novo usuário à lista
  users.push(newUser);
  localStorage.setItem(localStorageKey, JSON.stringify(users)); // Atualiza o localStorage
  displayUsers(users); // Atualiza a lista exibida

  addUserForm.reset(); // Limpa o formulário
  alert('Usuário adicionado com sucesso!');
}

// Event Listener para o formulário de adição de usuários
addUserForm.addEventListener('submit', addUser);

// Carrega os usuários ao carregar a página
loadUsers();

