document.addEventListener("DOMContentLoaded", function () {
  const inputFoto = document.getElementById("input-foto");
  const btnMudarFoto = document.getElementById("lpps");
  const profilePic = document.getElementById("profile-pic");
  const form = document.getElementById("form-usuario");
  const btnLogout = document.getElementById("btn-logout");

  // Carregar dados salvos (se houver)
  const username = localStorage.getItem("username");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const dadosUsuario = usuarios[username] || {};

  if (dadosUsuario) {
    document.getElementById("loginUser").value = dadosUsuario.nome || "";
    document.getElementById("newEmail").value = dadosUsuario.email || "";
    document.getElementById("newPhone").value = dadosUsuario.telefone || "";
    if (dadosUsuario.endereco && document.getElementById("endereco")) {
      document.getElementById("endereco").value = dadosUsuario.endereco;
    }
    if (dadosUsuario.foto) {
      profilePic.src = dadosUsuario.foto;
    }
  }

  // Clique no botão para mudar a foto
  btnMudarFoto.addEventListener("click", () => {
    inputFoto.click();
  });

  // Quando o usuário escolhe uma imagem
  inputFoto.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePic.src = e.target.result;

        // Atualiza a foto no localStorage
        dadosUsuario.foto = e.target.result;
        usuarios[username] = dadosUsuario;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("dadosUsuario", JSON.stringify(dadosUsuario));

        mostrarMensagem("Foto atualizada com sucesso!");
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecione uma imagem válida.");
    }
  });

  // Salvando os dados do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("loginUser").value;
    const email = document.getElementById("newEmail").value;
    const telefone = document.getElementById("newPhone").value;
    const endereco = document.getElementById("endereco")?.value || "";
    const foto = profilePic.src;

    usuarios[username] = {
      ...usuarios[username],
      nome,
      email,
      telefone,
      endereco,
      foto
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("dadosUsuario", JSON.stringify(usuarios[username]));

    mostrarMensagem("Informações salvas com sucesso!");
  });

  // Botão de logout
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("username");
    localStorage.removeItem("dadosUsuario");
    alert("Logout realizado com sucesso!");
    window.location.href = "/index.html";
  });

  // Função para mostrar toast de sucesso
  function mostrarMensagem(texto) {
    const toast = document.getElementById("mensagem-sucesso");
    toast.textContent = texto;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
});
