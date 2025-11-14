document.addEventListener("DOMContentLoaded", () => {

    // ---- Foto e nome do usuário ----
    const username = localStorage.getItem("username") || "Usuário";
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const dados = usuarios[username] || {};

    document.getElementById("nome-user").textContent = username;

    if (dados.foto) {
        document.getElementById("foto-user").src = dados.foto;
    }

    // ---- Plano escolhido (veio do botão "Assinar") ----
    const plano = localStorage.getItem("plano_escolhido") || "free";

    const planos = {
        free: {
            nome: "Free",
            preco: "R$ 0,00",
            beneficios: ["Vídeos básicos digitais", "Acesso limitado", "Sem suporte profissional"]
        },
        basic: {
            nome: "Basic",
            preco: "R$ 19,90",
            beneficios: ["Vídeos + exercícios extras", "Mentoria básica", "Suporte por chat"]
        },
        premium: {
            nome: "Premium",
            preco: "R$ 39,90",
            beneficios: ["Tudo do Basic", "Acesso total", "Contato direto com mentor", "Palestras e workshops exclusivos"]
        }
    };

    const planoAtual = planos[plano];

    document.getElementById("plano-nome").textContent = planoAtual.nome;
    document.getElementById("plano-preco").textContent = planoAtual.preco;

    // adiciona lista
    const ul = document.getElementById("plano-beneficios");
    planoAtual.beneficios.forEach(item => {
        const li = document.createElement("li");
        li.textContent = "• " + item;
        ul.appendChild(li);
    });

    // ---- Formas de pagamento ----
    document.querySelectorAll("input[name='pagamento']").forEach(radio => {
        radio.addEventListener("change", function () {
            document.getElementById("area-cartao").classList.add("hidden");
            document.getElementById("area-pix").classList.add("hidden");
            document.getElementById("area-boleto").classList.add("hidden");

            document.getElementById("area-" + this.value).classList.remove("hidden");
        });
    });

    // ---- Botão confirmar ----
    document.getElementById("btn-confirmar").addEventListener("click", () => {
        alert("Pagamento confirmado! Obrigado por adquirir o plano " + planoAtual.nome);
        // depois direciona para home
        window.location.href = "/pages/homeLogin/homelogin.html";
    });
});
