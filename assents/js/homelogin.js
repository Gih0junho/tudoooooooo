function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Fechar menu quando clicar fora
document.addEventListener('click', function(event) {
    const userPhoto = document.getElementById('user-photo');
    const menu = document.getElementById('menu');
    if (!userPhoto.contains(event.target)) {
        menu.style.display = 'none';
    }
});

//nome do usuario ao lado da foto
document.addEventListener('click', function(event) {
    const userPhoto = document.getElementById('user-photo');
    const menu = document.getElementById('menu');
    if (!userPhoto.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// adiciona saudação com o nome do usuário
document.addEventListener('DOMContentLoaded', function() {
    const greetingEl = document.getElementById('user-greeting');
    if (!greetingEl) return;

    // tenta obter o nome do localStorage
    let username = localStorage.getItem('username');

    // fallback: tenta ler ?username=Nome na querystring
    if (!username) {
        const params = new URLSearchParams(window.location.search);
        username = params.get('username');
    }

    if (username) {
        greetingEl.textContent = `Olá, ${username}`;
    } else {
        greetingEl.textContent = 'Olá';
    }
});


  let isDark = false;

  function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark-mode');

    const icon = document.getElementById('themeIcon');
    icon.src = isDark ? '/assents/img/2.png' : '/assents/img/3.png';
    icon.alt = isDark ? 'Lua' : 'Sol';
  }

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
