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

  // Script para calcular tempo de atuação desde julho de 2024
  const inicio = new Date(2024, 6); // julho é mês 6 (zero-based)
  const hoje = new Date();
  const diffMeses = (hoje.getFullYear() - inicio.getFullYear()) * 12 + (hoje.getMonth() - inicio.getMonth());
  document.getElementById("tempo-itpower").textContent = `${diffMeses} mês${diffMeses !== 1 ? 'es' : ''}`;
 
  function calcularMesesDesdeJulho2024() {
    const inicio = new Date(2024, 6); // Julho = 6 (0 indexado)
    const hoje = new Date();
    const anos = hoje.getFullYear() - inicio.getFullYear();
    const meses = hoje.getMonth() - inicio.getMonth() + anos * 12;
    return meses <= 1 ? `${meses} mês` : `${meses} meses`;
  }

  document.getElementById('tempo-itpower').innerText = calcularMesesDesdeJulho2024();

  // Ao clicar em uma box de projeto
  document.querySelectorAll('.projeto-box').forEach(box => {
    box.addEventListener('click', () => {
      const modalId = box.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";

        // Iniciar slide index para esse modal
        let slides = modal.querySelectorAll('.slide');
        let slideIndex = 0;

        // Mostrar o primeiro slide
        mostrarSlide(slideIndex, slides);

        // Setas dentro dessa modal
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

        // Botões para fechar
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

  // Função para mostrar slide específico
  function mostrarSlide(n, slides) {
    slides.forEach(slide => slide.style.display = "none");
    if (slides[n]) slides[n].style.display = "block";
  }
