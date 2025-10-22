// Depoimentos
const depoimentos = document.querySelectorAll('.depoimento');
const btnPrev = document.getElementById('prevDepoimento');
const btnNext = document.getElementById('nextDepoimento');
let currentIndex = 0;

function mostrarDepoimento(index) {
  depoimentos.forEach((dep, i) => {
    dep.style.display = i === index ? 'block' : 'none';
  });
}

btnPrev.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) currentIndex = depoimentos.length - 1;
  mostrarDepoimento(currentIndex);
});

btnNext.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= depoimentos.length) currentIndex = 0;
  mostrarDepoimento(currentIndex);
});

mostrarDepoimento(currentIndex);

// Modal login e criar conta
const btnLogin = document.getElementById('btnLogin');
const btnCriarConta = document.getElementById('btnCriarConta');
const modalLogin = document.getElementById('modalLogin');
const modalCriarConta = document.getElementById('modalCriarConta');
const closeLogin = document.getElementById('closeLogin');
const closeCriar = document.getElementById('closeCriar');
const areaRestrita = document.getElementById('areaRestrita');
const mainSections = [...document.querySelectorAll('main > section:not(#areaRestrita)')];
const btnSair = document.getElementById('btnSair');
const logo = document.getElementById('logo');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

function abrirModal(modal) { modal.style.display = 'flex'; }
function fecharModal(modal) { modal.style.display = 'none'; }

btnLogin.addEventListener('click', () => abrirModal(modalLogin));
btnCriarConta.addEventListener('click', () => abrirModal(modalCriarConta));
closeLogin.addEventListener('click', () => fecharModal(modalLogin));
closeCriar.addEventListener('click', () => fecharModal(modalCriarConta));

window.addEventListener('click', e => {
  if(e.target === modalLogin) fecharModal(modalLogin);
  if(e.target === modalCriarConta) fecharModal(modalCriarConta);
});

// Login unificado e redirecionamento

document.getElementById('formLogin').addEventListener('submit', e => {
  e.preventDefault();
  const user = e.target.loginUser.value.trim();
  const pass = e.target.loginPass.value;

 if (usuarios[user] && usuarios[user].senha === pass) {
    localStorage.setItem('username', user);
    localStorage.setItem('dadosUsuario', JSON.stringify(usuarios[user]));
    alert(`Bem-vindo(a), ${user}!`);
    fecharModal(modalLogin);
    e.target.reset();
    
    // Corrige o caminho do redirecionamento
    console.log('Redirecionando para:', 'pages/homeLogin/homelogin.html');
    window.location.href = 'pages/homeLogin/homelogin.html';
  } else {
    alert('Usuário ou senha incorretos.');
  }
});


// Criar conta
document.getElementById('formCriarConta').addEventListener('submit', e => {
  e.preventDefault();

  const user = e.target.newUser.value.trim();
  const pass = e.target.newPass.value;
  const email = e.target.newEmail.value;
  const telefone = e.target.newPhone.value;

  if(user in usuarios) {
    alert('Usuário já existe. Escolha outro.');
    return;
  }

  // Salva todos os dados
  usuarios[user] = {
    senha: pass,
    nome: user,
    email: email,
    telefone: telefone,
    endereco: "",
    foto: ""
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Conta criada com sucesso! Agora faça login.');
  fecharModal(modalCriarConta);
  e.target.reset();
});

// Logo volta para o início
logo.addEventListener('click', () => {
  if(areaRestrita.style.display === 'block') {
    btnSair.click();
  }
  window.scrollTo({top:0, behavior:'smooth'});
});
