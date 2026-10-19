/* ===== 1. VERIFICAÇÃO DE IDADE + BOAS-VINDAS ===== */
function boasVindas() {
  alert("Bem-vindo à Névoa Store!");
}

function confirmarIdade(maior) {
  const caixa = document.getElementById("idade");
  if (maior) {
    try { sessionStorage.setItem("maior18", "1"); } catch (e) {}
    caixa.hidden = true;
    document.body.classList.remove("bloqueado");
    boasVindas();
  } else {
    // Menor de idade: esconde o site e mostra aviso
    document.body.classList.add("bloqueado");
    caixa.querySelector("h2").textContent = "Acesso não permitido";
    caixa.querySelector("p").textContent = "Este site é apenas para maiores de 18 anos.";
    caixa.querySelector(".botoes").style.display = "none";
  }
}

/* ===== 2. BOTÃO INTERATIVO ===== */
function mostrarMensagem() {
  alert("Obrigado pela sua visita!");
}

/* ===== 3. ALTERAR COR DE FUNDO ===== */
const cores = ["#dbeafe", "#fde8c8", "#e2f5e9", "#f0e6ff", "#eef1f3"];
let indiceCor = 0;

function mudarCor() {
  document.body.style.backgroundColor = cores[indiceCor];
  indiceCor = (indiceCor + 1) % cores.length;
}

/* ===== 4. MODO ESCURO ===== */
function modoEscuro() {
  document.body.classList.toggle("dark");
  const ativo = document.body.classList.contains("dark");

  // Remove a cor escolhida manualmente para o modo escuro funcionar
  document.body.style.backgroundColor = "";

  document.getElementById("btnModo").textContent =
    ativo ? "☀️ Modo claro" : "🌙 Modo escuro";

  try { localStorage.setItem("modoEscuro", ativo); } catch (e) {}
}

/* ===== 5. CONTADOR DE VISITAS ===== */
let visitas = 0;

function contarVisita() {
  try {
    visitas = Number(localStorage.getItem("visitas")) || 0;
  } catch (e) {
    visitas = 0;
  }
  visitas++;
  try { localStorage.setItem("visitas", visitas); } catch (e) {}
  document.getElementById("contador").innerHTML = "Visitas: " + visitas;
}

/* ===== 6. DICAS DE UTILIZAÇÃO RESPONSÁVEL (frases aleatórias) ===== */
const frases = [
  "Lê sempre o rótulo e o manual antes de usar um produto.",
  "Guarda líquidos e baterias longe do alcance das crianças.",
  "Usa apenas carregadores e baterias adequados ao teu dispositivo.",
  "A nicotina causa dependência. Escolhe o teor com aconselhamento.",
  "Se queres deixar de fumar, fala com o teu médico ou farmacêutico."
];

function novaFrase() {
  const el = document.getElementById("frase");
  let nova;
  do {
    nova = frases[Math.floor(Math.random() * frases.length)];
  } while (nova === el.textContent && frases.length > 1);
  el.textContent = nova;
}

/* ===== 7. MENU RESPONSIVO ===== */
function configurarMenu() {
  const botao = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  botao.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto);
  });

  menu.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", false);
    })
  );
}

/* ===== 8. GALERIA (ampliar imagem) ===== */
function configurarGaleria() {
  const lightbox = document.getElementById("lightbox");
  const imgGrande = document.getElementById("lightboxImg");

  document.querySelectorAll(".galeria img").forEach(img =>
    img.addEventListener("click", () => {
      imgGrande.src = img.src;
      imgGrande.alt = img.alt;
      lightbox.hidden = false;
    })
  );

  lightbox.addEventListener("click", () => (lightbox.hidden = true));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightbox.hidden = true;
  });
}

/* ===== 9. FORMULÁRIO DE CONTACTO ===== */
function configurarFormulario() {
  const form = document.getElementById("formContacto");
  const feedback = document.getElementById("feedback");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    if (nome === "" || !email.includes("@")) {
      feedback.textContent = "Preenche o nome e um email válido.";
      feedback.className = "feedback erro";
      return;
    }
    if (!form.maior.checked) {
      feedback.textContent = "Tens de confirmar que tens 18 anos ou mais.";
      feedback.className = "feedback erro";
      return;
    }

    feedback.textContent = "Obrigado, " + nome + "! Entraremos em contacto em breve.";
    feedback.className = "feedback ok";
    form.reset();
  });
}

/* ===== 10. JANELA DE DETALHES DO PRODUTO ===== */
const produtos = {
  pod: {
    titulo: "Dispositivos pod",
    img: "imagens/foto1.svg",
    desc: "Dispositivos compactos e fáceis de usar, pensados para adultos que querem uma alternativa simples.",
    lista: ["Tamanho de bolso", "Recarregável por USB-C", "Cartuchos substituíveis", "Manual em português"]
  },
  kit: {
    titulo: "Kits completos",
    img: "imagens/foto2.svg",
    desc: "Tudo o que é preciso para começar, num único pack e com garantia.",
    lista: ["Dispositivo e carregador incluídos", "Resistência de origem", "Caixa de oferta", "2 anos de garantia"]
  },
  liquidos: {
    titulo: "Líquidos",
    img: "imagens/foto3.svg",
    desc: "Líquidos com rótulo conforme a lei, em vários teores de nicotina, incluindo sem nicotina.",
    lista: ["Teores: 0, 3, 6 e 12 mg", "Frascos de 10 ml", "Rótulo com avisos de saúde", "Tampa de segurança para crianças"]
  },
  acessorios: {
    titulo: "Acessórios",
    img: "imagens/foto4.svg",
    desc: "Peças de substituição e acessórios para manter o equipamento em bom estado.",
    lista: ["Resistências", "Baterias e carregadores", "Cartuchos de substituição", "Disponível sob encomenda"]
  }
};

function abrirProduto(id) {
  const p = produtos[id];
  if (!p) return;

  document.getElementById("modalTitulo").textContent = p.titulo;
  document.getElementById("modalDesc").textContent = p.desc;

  const img = document.getElementById("modalImg");
  img.src = p.img;
  img.alt = p.titulo;

  const lista = document.getElementById("modalLista");
  lista.innerHTML = "";
  p.lista.forEach(texto => {
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
  });

  document.getElementById("modalProduto").showModal();
}

function configurarProdutos() {
  const modal = document.getElementById("modalProduto");

  document.querySelectorAll(".cartao[data-produto]").forEach(cartao => {
    cartao.addEventListener("click", () => abrirProduto(cartao.dataset.produto));
    cartao.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrirProduto(cartao.dataset.produto);
      }
    });
  });

  document.getElementById("modalFechar").addEventListener("click", () => modal.close());
  document.getElementById("modalContacto").addEventListener("click", () => modal.close());

  // Fecha ao clicar fora da janela
  modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
}

/* ===== 11. ANIMAÇÃO AO FAZER SCROLL ===== */
function configurarRevelar() {
  const itens = document.querySelectorAll(".cartao, .destaque, .galeria img, .formulario");
  if (!("IntersectionObserver" in window)) return;

  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("visivel");
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.15 });

  itens.forEach(el => { el.classList.add("revelar"); obs.observe(el); });
}

/* ===== 12. ARRANQUE ===== */
window.addEventListener("load", () => {
  try {
    if (localStorage.getItem("modoEscuro") === "true") modoEscuro();
  } catch (e) {}

  contarVisita();
  novaFrase();
  configurarMenu();
  configurarGaleria();
  configurarFormulario();
  configurarProdutos();
  configurarRevelar();

  // Se já confirmou a idade nesta sessão, não pergunta outra vez
  let jaConfirmou = false;
  try { jaConfirmou = sessionStorage.getItem("maior18") === "1"; } catch (e) {}
  if (jaConfirmou) document.getElementById("idade").hidden = true;
});
