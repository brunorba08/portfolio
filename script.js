//fundo galaxia
const canvas = document.getElementById('galaxy')
const ctx = canvas.getContext('2d')

let stars = []
let planets = []
let mouseTrail = []
let explosionParticles = []
let sunExploded = false
let planetsMovingAway = false

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener('resize', () => {
  resizeCanvas()
  createStars(200)
  createPlanets()
})

function createStars(count) {
  stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 2 + 0.5,
    })
  }
}

function createPlanets() {
  planets = [
    {
      radius: 4,
      orbitRadius: 50,
      speed: 0.025,
      angle: 0,
      texture: 'mercury',
      exploded: false,
    },
    {
      radius: 6,
      orbitRadius: 80,
      speed: 0.021,
      angle: 1,
      texture: 'venus',
      exploded: false,
    },
    {
      radius: 8,
      orbitRadius: 110,
      speed: 0.018,
      angle: 2,
      texture: 'earth',
      exploded: false,
    },
    {
      radius: 7,
      orbitRadius: 145,
      speed: 0.016,
      angle: 3,
      texture: 'mars',
      exploded: false,
    },
    {
      radius: 14,
      orbitRadius: 190,
      speed: 0.012,
      angle: 4,
      texture: 'jupiter',
      exploded: false,
    },
    {
      radius: 12,
      orbitRadius: 240,
      speed: 0.01,
      angle: 5,
      texture: 'saturn',
      exploded: false,
    },
    {
      radius: 10,
      orbitRadius: 290,
      speed: 0.008,
      angle: 6,
      texture: 'uranus',
      exploded: false,
    },
    {
      radius: 10,
      orbitRadius: 340,
      speed: 0.007,
      angle: 7,
      texture: 'neptune',
      exploded: false,
    },
  ]
}

function drawStars() {
  ctx.fillStyle = 'white'
  for (let star of stars) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()

    star.x -= star.speed
    if (star.x < 0) {
      star.x = canvas.width
      star.y = Math.random() * canvas.height
    }
  }
}

function drawPlanet(x, y, radius, texture) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)

  let baseColor = '#fff'
  switch (texture) {
    case 'mercury':
      baseColor = '#aaa'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#555')
      break
    case 'venus':
      baseColor = '#f9e85e'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#c8b63b')
      break
    case 'earth':
      baseColor = '#3498db'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#1f6395')
      break
    case 'mars':
      baseColor = '#ff5e3a'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#c0392b')
      break
    case 'jupiter':
      baseColor = '#f5b041'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#d35400')
      break
    case 'saturn':
      baseColor = '#f7dc6f'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#d4ac0d')
      break
    case 'uranus':
      baseColor = '#82e0aa'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#39c0ed')
      break
    case 'neptune':
      baseColor = '#5dade2'
      gradient.addColorStop(0, baseColor)
      gradient.addColorStop(1, '#2c3e50')
      break
  }

  ctx.save()
  ctx.shadowColor = baseColor
  ctx.shadowBlur = 40

  ctx.beginPath()
  ctx.arc(x, y, radius + 1, 0, Math.PI * 2)
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.restore()
}

function drawPlanets() {
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  if (!sunExploded) {
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2)
    ctx.fillStyle = 'yellow'
    ctx.shadowColor = 'orange'
    ctx.shadowBlur = 30
    ctx.fill()
    ctx.shadowBlur = 0

    for (let p of planets) {
      if (!p.exploded) {
        p.angle += p.speed
        const x = centerX + Math.cos(p.angle) * p.orbitRadius
        const y = centerY + Math.sin(p.angle) * p.orbitRadius
        drawPlanet(x, y, p.radius, p.texture)
      }
    }
  } else {
    for (let p of planets) {
      if (!p.exploded) {
        p.x += p.vx
        p.y += p.vy
        drawPlanet(p.x, p.y, p.radius, p.texture)
      }
    }
  }
}

function drawExplosion() {
  for (let part of explosionParticles) {
    ctx.beginPath()
    ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2)
    ctx.fillStyle = part.color
    ctx.fill()
  }
}

function createExplosion(x, y, radius) {
  let numParts = 50
  for (let i = 0; i < numParts; i++) {
    let angle = Math.random() * Math.PI * 2
    let speed = Math.random() * 2 + 1
    let part = {
      x: x,
      y: y,
      radius: Math.random() * 3 + 1,
      color: 'white',
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
    }
    explosionParticles.push(part)
  }
  planetsMovingAway = true
}

function updateExplosion() {
  for (let i = explosionParticles.length - 1; i >= 0; i--) {
    let part = explosionParticles[i]
    part.x += part.dx
    part.y += part.dy

    if (
      part.x < 0 ||
      part.x > canvas.width ||
      part.y < 0 ||
      part.y > canvas.height
    ) {
      explosionParticles.splice(i, 1)
    }
  }
}

function drawMouseTrail() {
  for (let i = 0; i < mouseTrail.length - 1; i++) {
    let t1 = mouseTrail[i]
    let t2 = mouseTrail[i + 1]

    const progress = i / mouseTrail.length

    // Gradiente de cores: branco → azul → roxo
    const r = Math.floor(255 - 100 * progress)
    const g = Math.floor(255 - 200 * progress)
    const b = Math.floor(255)

    const alpha = t1.alpha * (1 - progress)
    const lineWidth = 6 * progress + 1 // agora começa grosso e afina

    ctx.beginPath()
    ctx.moveTo(t1.x, t1.y)
    ctx.lineTo(t2.x, t2.y)
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.lineWidth = lineWidth
    ctx.lineCap = 'round' // suaviza a ponta
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 1.5})`
    ctx.shadowBlur = 25 * (1 - progress)
    ctx.stroke()
  }

  ctx.shadowBlur = 0

  // Esmaecer o rastro
  for (let i = 0; i < mouseTrail.length; i++) {
    mouseTrail[i].alpha -= 0.02
  }

  mouseTrail = mouseTrail.filter((t) => t.alpha > 0)
}

canvas.addEventListener('mousemove', (e) => {
  mouseTrail.push({ x: e.clientX, y: e.clientY, alpha: 1 })
  if (mouseTrail.length > 20) {
    mouseTrail.shift()
  }
})

canvas.addEventListener('click', (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  const sunDist = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2)

  if (sunDist <= 30 && !sunExploded) {
    createExplosion(centerX, centerY, 30)
    sunExploded = true
    planetsMovingAway = true

    for (let p of planets) {
      const angle = p.angle
      const speed = 1 + Math.random() * 1.5

      const x = centerX + Math.cos(angle) * p.orbitRadius
      const y = centerY + Math.sin(angle) * p.orbitRadius

      p.x = x
      p.y = y

      p.vx = Math.cos(angle) * speed
      p.vy = Math.sin(angle) * speed
    }

    return
  }

  if (!sunExploded) {
    for (let p of planets) {
      if (p.exploded) continue

      const x = centerX + Math.cos(p.angle) * p.orbitRadius
      const y = centerY + Math.sin(p.angle) * p.orbitRadius
      const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)

      if (dist <= p.radius) {
        createExplosion(x, y, p.radius)
        p.exploded = true

        p.vx = (Math.random() - 0.5) * 10
        p.vy = (Math.random() - 0.5) * 10

        break
      }
    }
  }
})

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawStars()
  drawPlanets()
  drawExplosion()
  updateExplosion()
  drawMouseTrail()
  requestAnimationFrame(animate)
}

createStars(200)
createPlanets()
animate()

// corpo script

function calcularIdade(dataNascimento) {
  const hoje = new Date()
  const nascimento = new Date(dataNascimento)
  let idade = hoje.getFullYear() - nascimento.getFullYear()
  const mesAtual = hoje.getMonth()
  const diaAtual = hoje.getDate()

  if (
    mesAtual < nascimento.getMonth() ||
    (mesAtual === nascimento.getMonth() && diaAtual < nascimento.getDate())
  ) {
    idade--
  }

  return idade
}

document.getElementById('idade').textContent = calcularIdade('2003-08-08')

document
  .getElementById('toggle-itpower')
  .addEventListener('click', function () {
    const descricao = document.getElementById('descricao-itpower')
    descricao.style.display =
      descricao.style.display === 'none' || descricao.style.display === ''
        ? 'block'
        : 'none'
  })

const inicio = new Date(2024, 6)
const hoje = new Date()
const diffMeses =
  (hoje.getFullYear() - inicio.getFullYear()) * 12 +
  (hoje.getMonth() - inicio.getMonth())
document.getElementById('tempo-itpower').textContent = `${diffMeses} mês${
  diffMeses !== 1 ? 'es' : ''
}`

function calcularMesesDesdeJulho2024() {
  const inicio = new Date(2024, 6)
  const hoje = new Date()
  const anos = hoje.getFullYear() - inicio.getFullYear()
  const meses = hoje.getMonth() - inicio.getMonth() + anos * 12
  return meses <= 1 ? `${meses} mês` : `${meses} meses`
}

document.getElementById('tempo-itpower').innerText =
  calcularMesesDesdeJulho2024()

document.querySelectorAll('.projeto-box').forEach((box) => {
  box.addEventListener('click', () => {
    const modalId = box.getAttribute('data-modal')
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.style.display = 'block'

      let slides = modal.querySelectorAll('.slide')
      let slideIndex = 0

      mostrarSlide(slideIndex, slides)

      const next = modal.querySelector('.next')
      const prev = modal.querySelector('.prev')

      if (next && prev) {
        next.onclick = () => {
          slideIndex = (slideIndex + 1) % slides.length
          mostrarSlide(slideIndex, slides)
        }

        prev.onclick = () => {
          slideIndex = (slideIndex - 1 + slides.length) % slides.length
          mostrarSlide(slideIndex, slides)
        }
      }

      const fechar = modal.querySelector('.fechar-modal')
      const voltar = modal.querySelector('.voltar-modal')

      fechar.onclick = () => (modal.style.display = 'none')
      voltar.onclick = () => (modal.style.display = 'none')

      window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none'
      }
    }
  })
})

function mostrarSlide(n, slides) {
  slides.forEach((slide) => (slide.style.display = 'none'))
  if (slides[n]) slides[n].style.display = 'block'
}

function trocarCor(cor) {
  let root = document.documentElement

  if (cor === 'verde') {
    root.style.setProperty('--cor-destaque', '#4caf50')
    root.style.setProperty('--cor-sombra', 'rgba(76, 175, 80, 0.7)')
    root.style.setProperty('--cor-overlay', 'rgba(76, 175, 80, 0.85)')
    root.style.setProperty('--cor-titulo', '#4caf50')
    // document.body.style.backgroundColor = '#d0f0c0';
  } else if (cor === 'vermelho') {
    root.style.setProperty('--cor-destaque', '#f44336')
    root.style.setProperty('--cor-sombra', 'rgba(244, 67, 54, 0.7)')
    root.style.setProperty('--cor-overlay', 'rgba(244, 67, 54, 0.85)')
    root.style.setProperty('--cor-titulo', '#f44336')
    //  document.body.style.backgroundColor = '#fdd';
  } else if (cor === 'padrao') {
    root.style.setProperty('--cor-destaque', '#61dafb')
    root.style.setProperty('--cor-sombra', 'rgba(97, 218, 251, 0.7)')
    root.style.setProperty('--cor-overlay', 'rgba(97, 218, 251, 0.85)')
    root.style.setProperty('--cor-titulo', '#61dafb')
    // document.body.style.backgroundColor = '#e3f2fd';
  }
}

const titulos = [
  'Desenvolvedor Web',
  'Full Stack Developer',
  'Criador de Interfaces',
]

let tituloIndex = 0
let charIndex = 0
let apagando = false
const elemento = document.getElementById('titulo-animado')

function digitar() {
  const textoAtual = titulos[tituloIndex]

  if (!apagando) {
    charIndex++
    const textoVisivel = textoAtual.substring(0, charIndex)

    // Separa a primeira palavra do resto
    const palavras = textoVisivel.split(' ')
    const primeiraPalavra = palavras.shift()
    const restante = palavras.join(' ')

    if (restante.length > 0) {
      elemento.innerHTML = `<span style="color: white;">${primeiraPalavra}</span> <span style="color: var(--cor-destaque);">${restante}</span>`
    } else {
      elemento.innerHTML = `<span style="color: white;">${textoVisivel}</span>`
    }

    if (charIndex > textoAtual.length) {
      apagando = true
      setTimeout(digitar, 1200) // Pausa antes de apagar
      return
    }
  } else {
    charIndex--
    const textoVisivel = textoAtual.substring(0, charIndex)

    const palavras = textoVisivel.split(' ')
    const primeiraPalavra = palavras.shift()
    const restante = palavras.join(' ')

    if (restante.length > 0) {
      elemento.innerHTML = `<span style="color: white;">${primeiraPalavra}</span> <span style="color: var(--cor-destaque);">${restante}</span>`
    } else {
      elemento.innerHTML = `<span style="color: white;">${textoVisivel}</span>`
    }

    if (charIndex < 0) {
      apagando = false
      tituloIndex = (tituloIndex + 1) % titulos.length
    }
  }

  setTimeout(digitar, apagando ? 40 : 90)
}

digitar()

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      } else {
        entry.target.classList.remove('visible')
      }
    })
  },
  {
    threshold: 0.2,
  }
)

document.querySelectorAll('section').forEach((section) => {
  observer.observe(section)
})

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          entry.target.classList.remove('hide')
        } else {
          entry.target.classList.remove('show')
          entry.target.classList.add('hide')
        }
      })
    },
    {
      threshold: 0.1,
    }
  )

  cards.forEach((card) => observer.observe(card))
})
const traducoes = {
  pt: {
    sobre: 'Sobre',
    habilidades: 'Habilidades',
    projetos: 'Projetos',
    contato: 'Contato',

    // Menu
    sobre: 'Sobre',
    habilidades: 'Habilidades',
    projetos: 'Projetos',
    contato: 'Contato',
    // Seção Sobre
    tituloSobre: 'Sobre',
    tituloMim: 'mim',
    paragrafo1: `Olá! Meu nome é <strong>Bruno Ribeiro</strong>, tenho <strong><span id="idade"></span> anos</strong>, sou formado em <strong>Análise e Desenvolvimento de Sistemas</strong> e atuo como <strong>desenvolvedor full stack</strong>, com uma forte preferência por <strong>front-end</strong>.`,
    paragrafo2: `Possuo conhecimento avançado em <strong>JavaScript</strong>, <strong>ColdFusion</strong> e <strong>SQL Server</strong>, além de experiência intermediária com <strong>C#</strong>, <strong>React</strong> e <strong>controle de versão com Git</strong>.`,
    paragrafo3: `Me considero <strong>proativo</strong>, <strong>responsável</strong> e <strong>focado em resultados</strong>. Gosto de trabalhar em equipe e estou sempre em busca de aprender e evoluir. Tenho paixão por criar <strong>interfaces modernas e funcionais</strong> que entreguem a melhor experiência possível para o usuário.`,
    botaoCV: 'Ver meu currículo',
    // Habilidades
    tituloHabilidades: 'Minhas habilidades',
    descricaoHabilidades:
      'Confira as tecnologias e ferramentas com as quais tenho experiência:',
    tituloProjetos: 'Projetos',
    descricaoProjetos:
      'Veja alguns dos projetos que desenvolvi ao longo da minha trajetória:',
    projeto1: 'Sistema Solar',
    projeto2: 'Padaria',
    projeto3: 'Igreja',
    projeto4: 'Concessionária',

    modalProjeto1Titulo: 'Sistema Solar',
    modalProjeto1Descricao: `Este projeto foi criado inicialmente apenas como um plano de fundo para outro trabalho, mas o resultado ficou tão legal que resolvi transformá-lo em um projeto à parte e incluí-lo aqui no meu portfólio. Ele demonstra a integração de HTML, CSS e JavaScript em um layout visualmente moderno e dinâmico.`,
    abrirProjeto: 'Abrir Meu Projeto',
    voltar: 'Voltar',
    projeto2Titulo: 'Padaria',
    projeto2Descricao: 'Ainda estou desenvolvendo esse projeto.',
    abrirProjeto: 'Abrir Meu Projeto',
    voltar: 'Voltar',
    projeto3Titulo: 'Igreja',
    projeto3Descricao: 'Ainda estou desenvolvendo esse projeto.',
    projeto4Titulo: 'Concessionária',
    projeto4Descricao: 'Ainda estou desenvolvendo esse projeto.',
    contatoTitulo: 'Contato',
    contatoTexto: 'Entre em contato comigo através dos canais abaixo:',
    linkedinTitulo: 'LinkedIn',
    linkedinLink: 'Visitar Perfil',
    githubTitulo: 'GitHub',
    githubLink: 'Ver Repositórios',
    emailTitulo: 'Email',
    telefoneTitulo: 'Telefone',
    trajetoriaTitulo: 'Minha trajetória',
    atualmenteITPower: 'Atualmente na ITPower',
    itpowerDescricao1:
      'A ITPower é uma empresa de tecnologia que atua no desenvolvimento e sustentação de sistemas para o setor de seguros, com foco em grandes clientes como AON Brasil, AON México, Caixa Seguradora, Zurich, SulAmérica, entre outros.',
    itpowerDescricao2:
      'Na empresa, trabalho com ColdFusion, JavaScript, SQL Server e Git, dando suporte e implementando melhorias nos sistemas internos das corretoras, além de otimizar processos e entregar soluções que agregam valor ao negócio.',
    footerTexto: '© Todos os direitos reservados — Bruno Ribeiro',
    tempoMes: 'mês',
    tempoMeses: 'meses',
  },
  en: {
    sobre: 'About',
    habilidades: 'Skills',
    projetos: 'Projects',
    contato: 'Contact',
    // Menu
    sobre: 'About',
    habilidades: 'Skills',
    projetos: 'Projects',
    contato: 'Contact',
    // Seção Sobre
    tituloSobre: 'About',
    tituloMim: 'me',
    paragrafo1: `Hello! My name is <strong>Bruno Ribeiro</strong>, I am <strong><span id="idade"></span> years old</strong>, I have a degree in <strong>Systems Analysis and Development</strong> and I work as a <strong>full stack developer</strong>, with a strong preference for <strong>front-end</strong>.`,
    paragrafo2: `I have advanced knowledge in <strong>JavaScript</strong>, <strong>ColdFusion</strong>, and <strong>SQL Server</strong>, as well as intermediate experience with <strong>C#</strong>, <strong>React</strong>, and <strong>version control using Git</strong>.`,
    paragrafo3: `I consider myself <strong>proactive</strong>, <strong>responsible</strong>, and <strong>results-oriented</strong>. I enjoy working in a team and am always looking to learn and grow. I’m passionate about creating <strong>modern and functional interfaces</strong> that deliver the best possible user experience.`,
    botaoCV: 'View my resume',
    // Habilidades
    tituloHabilidades: 'My Skills',
    descricaoHabilidades:
      'Check out the technologies and tools I have experience with:',
    tituloProjetos: 'Projects',
    descricaoProjetos:
      'Check out some of the projects I’ve developed throughout my journey:',
    projeto1: 'Solar System',
    projeto2: 'Bakery',
    projeto3: 'Church',
    projeto4: 'Car Dealership',
    modalProjeto1Titulo: 'Solar System',
    modalProjeto1Descricao: `This project was initially created just as a background for another work, but the result turned out so nice that I decided to turn it into a standalone project and include it here in my portfolio. It showcases the integration of HTML, CSS, and JavaScript in a visually modern and dynamic layout.`,
    abrirProjeto: 'Open My Project',
    voltar: 'Back',
    projeto2Titulo: 'Bakery',
    projeto2Descricao: 'I am still developing this project.',
    abrirProjeto: 'Open My Project',
    voltar: 'Back',
    projeto3Titulo: 'Church',
    projeto3Descricao: 'I am still developing this project.',
    projeto4Titulo: 'Car Dealership',
    projeto4Descricao: 'I am still developing this project.',
    contatoTitulo: 'Contact',
    contatoTexto: 'Get in touch with me through the channels below:',
    linkedinTitulo: 'LinkedIn',
    linkedinLink: 'Visit Profile',
    githubTitulo: 'GitHub',
    githubLink: 'View Repositories',
    emailTitulo: 'Email',
    telefoneTitulo: 'Phone',
    trajetoriaTitulo: 'My Journey',
    atualmenteITPower: 'Currently at ITPower',
    itpowerDescricao1:
      'ITPower is a technology company focused on the development and maintenance of systems for the insurance sector, serving major clients like AON Brazil, AON Mexico, Caixa Seguradora, Zurich, SulAmérica, and others.',
    itpowerDescricao2:
      'At the company, I work with ColdFusion, JavaScript, SQL Server, and Git, supporting and improving internal systems for brokers, optimizing processes, and delivering solutions that add value to the business.',
    footerTexto: '© All rights reserved — Bruno Ribeiro',
    tempoMes: 'month',
    tempoMeses: 'months',
  },
}

let idiomaAtual = 'pt'

function mudarIdioma() {
  idiomaAtual = idiomaAtual === 'pt' ? 'en' : 'pt'
  document.getElementById('link-sobre').textContent =
    traducoes[idiomaAtual].sobre
  document.getElementById('link-habilidades').textContent =
    traducoes[idiomaAtual].habilidades
  document.getElementById('link-projetos').textContent =
    traducoes[idiomaAtual].projetos
  document.getElementById('link-contato').textContent =
    traducoes[idiomaAtual].contato

  // Menu
  document.getElementById('link-sobre').textContent =
    traducoes[idiomaAtual].sobre
  document.getElementById('link-habilidades').textContent =
    traducoes[idiomaAtual].habilidades
  document.getElementById('link-projetos').textContent =
    traducoes[idiomaAtual].projetos
  document.getElementById('link-contato').textContent =
    traducoes[idiomaAtual].contato

  // Sobre mim
  document.getElementById('titulo-sobre').textContent =
    traducoes[idiomaAtual].tituloSobre
  document.getElementById('titulo-mim').textContent =
    traducoes[idiomaAtual].tituloMim
  document.getElementById('sobre-paragrafo1').innerHTML =
    traducoes[idiomaAtual].paragrafo1
  document.getElementById('sobre-paragrafo2').innerHTML =
    traducoes[idiomaAtual].paragrafo2
  document.getElementById('sobre-paragrafo3').innerHTML =
    traducoes[idiomaAtual].paragrafo3
  document.getElementById('botao-cv').textContent =
    traducoes[idiomaAtual].botaoCV

  // Habilidades
  document.getElementById('titulo-habilidades').textContent =
    traducoes[idiomaAtual].tituloHabilidades
  document.getElementById('descricao-habilidades').textContent =
    traducoes[idiomaAtual].descricaoHabilidades

  // Projetos
  document.getElementById('titulo-projetos').textContent =
    traducoes[idiomaAtual].tituloProjetos
  document.getElementById('descricao-projetos').textContent =
    traducoes[idiomaAtual].descricaoProjetos
  document.getElementById('projeto1').textContent =
    traducoes[idiomaAtual].projeto1
  document.getElementById('projeto2').textContent =
    traducoes[idiomaAtual].projeto2
  document.getElementById('projeto3').textContent =
    traducoes[idiomaAtual].projeto3
  document.getElementById('projeto4').textContent =
    traducoes[idiomaAtual].projeto4

  document.getElementById('modalProjeto1Titulo').textContent =
    traducoes[idiomaAtual].modalProjeto1Titulo
  document.getElementById('modalProjeto1Descricao').textContent =
    traducoes[idiomaAtual].modalProjeto1Descricao
  document.getElementById('abrirProjetoBtn').textContent =
    traducoes[idiomaAtual].abrirProjeto
  document.getElementById('voltarModalBtn').textContent =
    traducoes[idiomaAtual].voltar

  document.getElementById('modal2-titulo').textContent =
    traducoes[idiomaAtual].projeto2Titulo
  document.getElementById('modal2-descricao').textContent =
    traducoes[idiomaAtual].projeto2Descricao
  document.getElementById('modal2-abrir').textContent =
    traducoes[idiomaAtual].abrirProjeto
  document.getElementById('modal2-voltar').textContent =
    traducoes[idiomaAtual].voltar
  document.getElementById('modal3-titulo').textContent =
    traducoes[idiomaAtual].projeto3Titulo
  document.getElementById('modal3-descricao').textContent =
    traducoes[idiomaAtual].projeto3Descricao
  document.getElementById('modal3-abrir').textContent =
    traducoes[idiomaAtual].abrirProjeto
  document.getElementById('modal3-voltar').textContent =
    traducoes[idiomaAtual].voltar
  // Modal Projeto 4
  document.getElementById('modal4-titulo').textContent =
    traducoes[idiomaAtual].projeto4Titulo
  document.getElementById('modal4-descricao').textContent =
    traducoes[idiomaAtual].projeto4Descricao
  document.getElementById('modal4-abrir').textContent =
    traducoes[idiomaAtual].abrirProjeto
  document.getElementById('modal4-voltar').textContent =
    traducoes[idiomaAtual].voltar

  document.getElementById('contato-titulo').textContent =
    traducoes[idiomaAtual].contatoTitulo
  document.getElementById('contato-texto').textContent =
    traducoes[idiomaAtual].contatoTexto
  document.getElementById('linkedin-titulo').textContent =
    traducoes[idiomaAtual].linkedinTitulo
  document.getElementById('linkedin-link').textContent =
    traducoes[idiomaAtual].linkedinLink
  document.getElementById('github-titulo').textContent =
    traducoes[idiomaAtual].githubTitulo
  document.getElementById('github-link').textContent =
    traducoes[idiomaAtual].githubLink
  document.getElementById('email-titulo').textContent =
    traducoes[idiomaAtual].emailTitulo
  document.getElementById('telefone-titulo').textContent =
    traducoes[idiomaAtual].telefoneTitulo

  document.getElementById('trajetoria-titulo').textContent =
    traducoes[idiomaAtual].trajetoriaTitulo
  document.getElementById('toggle-itpower').textContent =
    traducoes[idiomaAtual].atualmenteITPower
  document.getElementById('itpower-descricao1').innerHTML =
    traducoes[idiomaAtual].itpowerDescricao1
  document.getElementById('itpower-descricao2').innerHTML =
    traducoes[idiomaAtual].itpowerDescricao2
  document.getElementById('footer-texto').textContent =
    traducoes[idiomaAtual].footerTexto

  document.querySelector("button[onclick='mudarIdioma()']").textContent =
    idiomaAtual === 'pt' ? 'English' : 'Português'
}
