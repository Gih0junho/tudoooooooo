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

  // Preencher dados do perfil
  if (dadosUsuario) {
    document.getElementById("loginUser").value = dadosUsuario.nome || "";
    document.getElementById("newEmail").value = dadosUsuario.email || "";
    document.getElementById("newPhone").value = dadosUsuario.telefone || "";
    if (dadosUsuario.foto) {
      profilePic.src = dadosUsuario.foto;
    }
  }

  // Mudar foto
  btnMudarFoto.addEventListener("click", () => {
    inputFoto.click();
  });

  inputFoto.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePic.src = e.target.result;
        dadosUsuario.foto = e.target.result;
        usuarios[username] = dadosUsuario;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarMensagem("Foto atualizada com sucesso!");
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecione uma imagem válida.");
    }
  });

  // Salvar dados do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    dadosUsuario.nome = document.getElementById("loginUser").value;
    dadosUsuario.email = document.getElementById("newEmail").value;
    dadosUsuario.telefone = document.getElementById("newPhone").value;
    dadosUsuario.foto = profilePic.src;

    usuarios[username] = dadosUsuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarMensagem("Informações salvas com sucesso!");
  });

  // Logout
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("username");
    alert("Logout realizado com sucesso!");
    window.location.href = "/index.html";
  });

  // Toast de sucesso
  function mostrarMensagem(texto) {
    const toast = document.getElementById("mensagem-sucesso");
    toast.textContent = texto;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Gráfico de barras simples (por tipo de exercício)
  if (document.getElementById("graficoExercicios")) {
    const exercicios = dadosUsuario.exercicios || [];
    const tipos = exercicios.map(e => e.tipo);
    const quantidades = exercicios.map(e => e.quantidade);

    const ctx = document.getElementById("graficoExercicios").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: tipos,
        datasets: [{
          label: "Exercícios Realizados",
          data: quantidades,
          backgroundColor: "#0077c2"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Gráfico com filtro por data e tipo
  if (document.getElementById("graficoLinha")) {
    gerarGrafico();
  }
});

// Função para gerar gráfico com filtros
function gerarGrafico() {
  const username = localStorage.getItem("username");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const dadosUsuario = usuarios[username] || {};
  const exercicios = dadosUsuario.exercicios || [];

  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;
  const tiposSelecionados = Array.from(document.querySelectorAll("#dropdownExercicios input:checked")).map(el => el.value);

  const filtrados = exercicios.filter(e => {
    const dentroDoPeriodo = (!dataInicio || e.data >= dataInicio) && (!dataFim || e.data <= dataFim);
    const tipoSelecionado = tiposSelecionados.length === 0 || tiposSelecionados.includes(e.tipo);
    return dentroDoPeriodo && tipoSelecionado;
  });

  const agrupados = {};
  filtrados.forEach(e => {
    if (!agrupados[e.data]) agrupados[e.data] = 0;
    agrupados[e.data] += e.quantidade;
  });

  const datas = Object.keys(agrupados).sort();
  const quantidades = datas.map(d => agrupados[d]);

  const canvas = document.getElementById("graficoLinha");
  const ctx = canvas.getContext("2d");

  // Limpa gráfico anterior, se houver
  if (window.graficoAtivo) {
    window.graficoAtivo.destroy();
  }

  window.graficoAtivo = new Chart(ctx, {
    type: "line",
    data: {
      labels: datas,
      datasets: [{
        label: "Atividades de Comunicação",
        data: quantidades,
        borderColor: "#0077c2",
        backgroundColor: "rgba(0, 119, 194, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Evolução dos Exercícios"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Quantidade"
          }
        },
        x: {
          title: {
            display: true,
            text: "Data"
          }
        }
      }
    }
  });
}

// Alternar tema claro/escuro
  let isDark = false;

  function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    icon.src = isDark ? '/assents/img/2.png' : '/assents/img/3.png';
    icon.alt = isDark ? 'Lua' : 'Sol';
  }

  document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("graficoLinha");
  if (!canvas) {
    console.error("Canvas com ID 'graficoLinha' não encontrado!");
    return;
  }

  const filtroTipo = document.getElementById("filtroTipo");
  const username = localStorage.getItem("username");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const dadosUsuario = usuarios[username] || {};

  if (filtroTipo && dadosUsuario.exercicios) {
    const tiposUnicos = [...new Set(dadosUsuario.exercicios.map(e => e.tipo))];

    tiposUnicos.forEach(tipo => {
      const option = document.createElement("option");
      option.value = tipo;
      option.textContent = tipo;
      filtroTipo.appendChild(option);
    });
  }
});


  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["2025-10-01", "2025-10-02", "2025-10-03"],
      datasets: [{
        label: "Exemplo de Comunicação",
        data: [3, 2, 5],
        borderColor: "#0077c2",
        backgroundColor: "rgba(0, 119, 194, 0.2)",
        fill: true
      }]
    }
  });

  // Função para abrir/fechar o dropdown de exercícios
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("graficoLinha");
  if (!canvas) {
    console.error("Canvas com ID 'graficoLinha' não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");

  const username = localStorage.getItem("username");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const dadosUsuario = usuarios[username] || {};
  const exercicios = dadosUsuario.exercicios || [];

  // Preenche o dropdown com os tipos de exercício disponíveis
  const tiposUnicos = [...new Set(exercicios.map(e => e.tipo))];
  const dropdownMenu = document.getElementById("dropdownExercicios");

  tiposUnicos.forEach(tipo => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${tipo}"> ${tipo}`;
    dropdownMenu.appendChild(label);
  });

  // Gera o gráfico inicial com todos os dados
  gerarGrafico();
});

// Função para abrir/fechar o dropdown de exercícios
function toggleDropdown() {
  const menu = document.getElementById("dropdownExercicios");
  menu.classList.toggle("show");
}

// Função para gerar o gráfico com base nos filtros
function gerarGrafico() {
  const username = localStorage.getItem("username");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const dadosUsuario = usuarios[username] || {};
  const exercicios = dadosUsuario.exercicios || [];

  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;
  const tiposSelecionados = Array.from(document.querySelectorAll("#dropdownExercicios input:checked")).map(el => el.value);

  const filtrados = exercicios.filter(e => {
    const dentroDoPeriodo = (!dataInicio || e.data >= dataInicio) && (!dataFim || e.data <= dataFim);
    const tipoSelecionado = tiposSelecionados.length === 0 || tiposSelecionados.includes(e.tipo);
    return dentroDoPeriodo && tipoSelecionado;
  });

  const agrupados = {};
  filtrados.forEach(e => {
    if (!agrupados[e.data]) agrupados[e.data] = 0;
    agrupados[e.data] += e.quantidade;
  });

  const datas = Object.keys(agrupados).sort();
  const quantidades = datas.map(d => agrupados[d]);

  const canvas = document.getElementById("graficoLinha");
  const ctx = canvas.getContext("2d");

  // Limpa gráfico anterior, se houver
  if (window.graficoAtivo) {
    window.graficoAtivo.destroy();
  }

  window.graficoAtivo = new Chart(ctx, {
    type: "line",
    data: {
      labels: datas,
      datasets: [{
        label: "Atividades de Comunicação",
        data: quantidades,
        borderColor: "#2980b9",
        backgroundColor: "rgba(41, 128, 185, 0.2)",
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Evolução dos Exercícios"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Quantidade"
          }
        },
        x: {
          title: {
            display: true,
            text: "Data"
          }
        }
      }
    }
  });
}
