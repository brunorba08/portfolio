  function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    if (
      mesAtual < nascimento.getMonth() ||
      (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
    ) {
      idade--;
    }

    return idade;
  }

  document.getElementById("idade").textContent = calcularIdade("2003-08-08");

  document.getElementById("toggle-itpower").addEventListener("click", function () {
    const descricao = document.getElementById("descricao-itpower");
    descricao.style.display = descricao.style.display === "none" || descricao.style.display === "" ? "block" : "none";
  });

  const inicio = new Date(2024, 6); 
  const hoje = new Date();
  const diffMeses = (hoje.getFullYear() - inicio.getFullYear()) * 12 + (hoje.getMonth() - inicio.getMonth());
  document.getElementById("tempo-itpower").textContent = `${diffMeses} mês${diffMeses !== 1 ? 'es' : ''}`;
 
  function calcularMesesDesdeJulho2024() {
    const inicio = new Date(2024, 6); 
    const hoje = new Date();
    const anos = hoje.getFullYear() - inicio.getFullYear();
    const meses = hoje.getMonth() - inicio.getMonth() + anos * 12;
    return meses <= 1 ? `${meses} mês` : `${meses} meses`;
  }

  document.getElementById('tempo-itpower').innerText = calcularMesesDesdeJulho2024();

  document.querySelectorAll('.projeto-box').forEach(box => {
    box.addEventListener('click', () => {
      const modalId = box.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";

        let slides = modal.querySelectorAll('.slide');
        let slideIndex = 0;

        mostrarSlide(slideIndex, slides);

        const next = modal.querySelector('.next');
        const prev = modal.querySelector('.prev');

        if (next && prev) {
          next.onclick = () => {
            slideIndex = (slideIndex + 1) % slides.length;
            mostrarSlide(slideIndex, slides);
          };

          prev.onclick = () => {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            mostrarSlide(slideIndex, slides);
          };
        }

        const fechar = modal.querySelector('.fechar-modal');
        const voltar = modal.querySelector('.voltar-modal');

        fechar.onclick = () => modal.style.display = "none";
        voltar.onclick = () => modal.style.display = "none";

        window.onclick = (e) => {
          if (e.target === modal) modal.style.display = "none";
        };
      }
    });
  });

  function mostrarSlide(n, slides) {
    slides.forEach(slide => slide.style.display = "none");
    if (slides[n]) slides[n].style.display = "block";
  }

  function trocarCor(cor) {
    let root = document.documentElement;
  
    if (cor === 'verde') {
      root.style.setProperty('--cor-destaque', '#4caf50');
      root.style.setProperty('--cor-sombra', 'rgba(76, 175, 80, 0.7)');
      root.style.setProperty('--cor-overlay', 'rgba(76, 175, 80, 0.85)');
      root.style.setProperty('--cor-titulo', '#4caf50'); 
      document.body.style.backgroundColor = '#d0f0c0';
    } else if (cor === 'vermelho') {
      root.style.setProperty('--cor-destaque', '#f44336');
      root.style.setProperty('--cor-sombra', 'rgba(244, 67, 54, 0.7)');
      root.style.setProperty('--cor-overlay', 'rgba(244, 67, 54, 0.85)');
      root.style.setProperty('--cor-titulo', '#f44336'); 
      document.body.style.backgroundColor = '#fdd';
    } else if (cor === 'padrao') {
      root.style.setProperty('--cor-destaque', '#61dafb');
      root.style.setProperty('--cor-sombra', 'rgba(97, 218, 251, 0.7)');
      root.style.setProperty('--cor-overlay', 'rgba(97, 218, 251, 0.85)');
      root.style.setProperty('--cor-titulo', '#61dafb'); 
      document.body.style.backgroundColor = '#e3f2fd';
    }
  }
  
  
  
