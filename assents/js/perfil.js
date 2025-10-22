// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
    const inputFoto = document.getElementById("input-foto");
    const btnMudarFoto = document.getElementById("btn-mudar-foto");
    const profilePic = document.getElementById("profile-pic");
    const form = document.getElementById("form-usuario");
    const btnLogout = document.getElementById("btn-logout");

    // Carregar dados salvos (se houver)
   const username = localStorage.getItem("username");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
const dadosUsuario = usuarios[username];

if (dadosUsuario) {
    document.getElementById("loginUser").value = dadosUsuario.nome || "";
    document.getElementById("newEmail").value = dadosUsuario.email || "";
    document.getElementById("newPhone").value = dadosUsuario.telefone || "";
    document.getElementById("endereco").value = dadosUsuario.endereco || "";
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
                salvarDados({
                    ...dadosUsuario,
                    foto: e.target.result
                });
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione uma imagem válida.");
        }
    });

    // Salvando os dados do formulário
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita recarregamento

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const foto = profilePic.src;
    //alertar que atualizacao foi feita com sucesso
    alert("Atualizando informações...");

 usuarios[username] = {
        ...usuarios[username],
        nome,
        email,
        telefone,
        endereco,
        foto
};

localStorage.setItem("usuarios", JSON.stringify(usuarios));

       mostrarMensagem("Informações salvas com sucesso!");

    });

    // Botão de logout
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("username");
        alert("Logout realizado com sucesso!");
        window.location.href = "inicial.html";
    });

    // Função para salvar no localStorage
    function salvarDados(dados) {
  localStorage.setItem("dadosUsuario", JSON.stringify(dados));

  // Atualiza também no objeto geral de usuários
  const todosUsuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const nomeUsuario = localStorage.getItem("username");

  if (nomeUsuario && todosUsuarios[nomeUsuario]) {
    todosUsuarios[nomeUsuario] = {
      ...todosUsuarios[nomeUsuario],
      ...dados
    };
    localStorage.setItem("usuarios", JSON.stringify(todosUsuarios));
    function mostrarMensagem(texto) {
    const toast = document.getElementById("mensagem-sucesso");
    toast.textContent = texto;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000); // some após 3 segundos
}

}}});

  