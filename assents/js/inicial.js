// =======================
// 📢 Depoimentos
// =======================
const depoimentos = document.querySelectorAll('.depoimento');
const btnPrev = document.getElementById('prevDepoimento');
const btnNext = document.getElementById('nextDepoimento');
let currentIndex = 0;

function mostrarDepoimento(index) {
  depoimentos.forEach((dep, i) => {
    dep.style.display = i === index ? 'block' : 'none';
  });
}

if (depoimentos.length > 0 && btnPrev && btnNext) {
  btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + depoimentos.length) % depoimentos.length;
    mostrarDepoimento(currentIndex);
  });

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % depoimentos.length;
    mostrarDepoimento(currentIndex);
  });

  mostrarDepoimento(currentIndex);
}

// =======================
// 🔐 Login e Criar Conta
// =======================
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

function abrirModal(modal) {
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // impede rolagem atrás do modal
}
function fecharModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = ''; // restaura rolagem
}

const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
  btnLogin.addEventListener('click', () => abrirModal(modalLogin));
}
if (btnCriarConta) {
  btnCriarConta.addEventListener('click', () => abrirModal(modalCriarConta));
}

if (closeLogin) closeLogin.addEventListener('click', () => fecharModal(modalLogin));
if (closeCriar) closeCriar.addEventListener('click', () => fecharModal(modalCriarConta));

window.addEventListener('click', e => {
  if (e.target === modalLogin) fecharModal(modalLogin);
  if (e.target === modalCriarConta) fecharModal(modalCriarConta);
});

// =======================
// 🚪 Login Unificado
// =======================
const formLogin = document.getElementById('formLogin');
if (formLogin) {
  formLogin.addEventListener('submit', e => {
    e.preventDefault();
    const user = e.target.loginUser.value.trim();
    const pass = e.target.loginPass.value;

    if (usuarios[user] && usuarios[user].senha === pass) {
      localStorage.setItem('username', user);
      localStorage.setItem('dadosUsuario', JSON.stringify(usuarios[user]));
      alert(`Bem-vindo(a), ${user}!`);
      fecharModal(modalLogin);
      e.target.reset();

      console.log('Redirecionando para: pages/homeLogin/homelogin.html');
      window.location.href = 'pages/homeLogin/homelogin.html';
    } else {
      alert('Usuário ou senha incorretos.');
    }
  });
}

// =======================
// ✳️ Criar Conta
// =======================
const formCriarConta = document.getElementById('formCriarConta');
if (formCriarConta) {
  formCriarConta.addEventListener('submit', e => {
    e.preventDefault();

    const user = e.target.newUser.value.trim();
    const pass = e.target.newPass.value;
    const email = e.target.newEmail.value;
    const telefone = e.target.newPhone.value;

    if (!user || !pass || !email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (user in usuarios) {
      alert('Usuário já existe. Escolha outro.');
      return;
    }

    usuarios[user] = {
      senha: pass,
      nome: user,
      email,
      telefone,
      endereco: "",
      foto: ""
    };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Conta criada com sucesso! Agora faça login.');
    fecharModal(modalCriarConta);
    e.target.reset();
  });
}

// =======================
// 🏠 Logo e Navegação
// =======================
if (logo) {
  logo.addEventListener('click', () => {
    if (areaRestrita && areaRestrita.style.display === 'block' && btnSair) {
      btnSair.click();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =======================
// 🔁 Alternar Modais
// =======================
const linkParaLogin = document.getElementById('linkParaLogin');
if (linkParaLogin) {
  linkParaLogin.addEventListener('click', () => {
    fecharModal(modalCriarConta);
    abrirModal(modalLogin);
  });
}

// =======================
// 💳 Botão de Plano
// =======================
const btnPlano = document.getElementById('BT-SB');
if (btnPlano) {
  btnPlano.addEventListener('click', () => {
    window.location.href = 'pages/homeLogin/plano.html';
  });
}
