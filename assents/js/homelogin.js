// --- MENU LATERAL ---
function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

// Fechar menu ao clicar fora (em telas pequenas)
document.addEventListener('click', function(event) {
  const sidebar = document.getElementById('sidebar');
  const userPhoto = document.getElementById('user-photo');
  if (window.innerWidth <= 900 && !sidebar.contains(event.target) && !userPhoto.contains(event.target)) {
    sidebar.classList.remove('active');
  }
});

// --- SAUDAÇÃO DO USUÁRIO ---
document.addEventListener('DOMContentLoaded', function() {
  const greetingEl = document.getElementById('user-greeting');
  if (!greetingEl) return;

  let username = localStorage.getItem('username');
  if (!username) {
    const params = new URLSearchParams(window.location.search);
    username = params.get('username');
  }

  greetingEl.textContent = username ? `Olá, ${username}` : 'Olá, Usuário';
});

// --- FOTO DO USUÁRIO ---
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const dadosUsuario = usuarios[username] || {};

  if (dadosUsuario.foto) {
    const avatar = document.getElementById("avatar-principal");
    if (avatar) {
      avatar.src = dadosUsuario.foto;
    }
  }
});

// --- TEMA ESCURO/CLARO COM SALVAMENTO ---
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('themeIcon');
  const isDark = body.classList.toggle('dark-mode');

  // troca ícone
  icon.src = isDark ? '/assents/img/2.png' : '/assents/img/3.png';
  icon.alt = isDark ? 'Lua' : 'Sol';

  // salva no localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  const backdrop = document.getElementById('backdrop');
  const isMobile = window.innerWidth <= 900;

  if (isMobile) {
    menu.classList.toggle('active');
    backdrop.classList.toggle('active');
  }
}
document.getElementById('backdrop').addEventListener('click', () => {
  document.getElementById('menu').classList.remove('active');
  document.getElementById('backdrop').classList.remove('active');
});


// aplica o tema salvo
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('themeIcon');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    icon.src = '/assents/img/2.png';
    icon.alt = 'Lua';
  } else {
    icon.src = '/assents/img/3.png';
    icon.alt = 'Sol';
  }
});
