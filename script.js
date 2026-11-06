// ==========================================================================
// ARQUIVO PRINCIPAL DE SCRIPTS
// Lógica de tema, carrossel, projetos dinâmicos, experiências, formulário
// e registro de cliques de todos os botões no console (console.log)
// ==========================================================================

// ==========================================================================
// 1. ALTERNÂNCIA DE TEMA (MODO ESCURO / MODO CLARO)
// ==========================================================================

// Seleciona o botão de tema no cabeçalho
const botaoTema = document.querySelector('#botao-tema');
const iconeTema = botaoTema ? botaoTema.querySelector('i') : null;

// Função responsável apenas por trocar o ícone entre lua e sol
function atualizarIconeTema(estaModoClaro) {
  if (!iconeTema) {
    return;
  }

  if (estaModoClaro) {
    iconeTema.classList.remove('fa-moon');
    iconeTema.classList.add('fa-sun');
  } else {
    iconeTema.classList.remove('fa-sun');
    iconeTema.classList.add('fa-moon');
  }
}

// Função responsável por trocar as imagens do carrossel conforme o tema ativo
function atualizarImagensTema(estaModoClaro) {
  const imagensTema = document.querySelectorAll('.imagem-tema');
  imagensTema.forEach(function (imagem) {
    const atributo = estaModoClaro ? 'data-light' : 'data-dark';
    const novaSrc = imagem.getAttribute(atributo);
    if (novaSrc) {
      imagem.src = novaSrc;
    }
  });
}

// Função responsável apenas por alternar a classe do tema no corpo da página
function alternarTema() {
  const estaModoClaro = document.body.classList.toggle('modo-claro');
  console.log('Botão de tema clicado: alternando para o modo ' + (estaModoClaro ? 'claro' : 'escuro') + '.');
  atualizarIconeTema(estaModoClaro);
  atualizarImagensTema(estaModoClaro);
}

// Aplica o tema inicial nas imagens ao carregar a página (modo escuro é o padrão)
atualizarImagensTema(false);

// Adiciona o ouvinte de evento para o clique no botão de tema
if (botaoTema) {
  botaoTema.addEventListener('click', alternarTema);
}

// ==========================================================================
// 2. CARROSSEL DE IMAGENS DA SEÇÃO INÍCIO
// Alternância a cada 4 segundos com transição suave de fade
// ==========================================================================

// Seleciona todas as imagens do carrossel na seção início
const slidesInicio = document.querySelectorAll('.carrossel-mecha .imagem-slide');
let indiceSlideAtual = 0;

// Função responsável apenas por avançar para o próximo slide
function avancarProximoSlide() {
  if (slidesInicio.length === 0) {
    return;
  }

  slidesInicio[indiceSlideAtual].classList.remove('slide-ativo');
  indiceSlideAtual = (indiceSlideAtual + 1) % slidesInicio.length;
  slidesInicio[indiceSlideAtual].classList.add('slide-ativo');
}

// Função responsável apenas por mostrar o primeiro slide ao abrir a página
function mostrarPrimeiroSlide() {
  if (slidesInicio.length === 0) {
    return;
  }

  slidesInicio[0].classList.add('slide-ativo');
}

// Mostra o primeiro slide logo que a página abre
mostrarPrimeiroSlide();

// Inicia o intervalo de 4 segundos para a transição das imagens
if (slidesInicio.length > 1) {
  setInterval(avancarProximoSlide, 4000);
}

// ==========================================================================
// 3. DADOS E RENDERIZAÇÃO DINÂMICA DA SEÇÃO PROJETOS
// Para adicionar um novo projeto, basta duplicar um item abaixo e preenchê-lo.
// O sistema adiciona automaticamente na aba correta e alterna as animações.
// ==========================================================================

const listaProjetos = [
  {
    titulo: 'InvaderZ',
    categoria: 'pessoal', // 'pessoal' ou 'profissional'
    rotuloCategoria: '[Projeto Pessoal]',
    descricao: 'Jogo simples no estilo Space Invaders, feito totalmente no Scratch durante o curso CS50x de Harvard.',
    tecnologias: ['Scratch', 'Photoshop'],
    imagem: 'img/InvaderZ.png',
    imagemAlt: 'Capa do jogo InvaderZ',
    link: 'https://scratch.mit.edu/projects/1219193527/',
    invertido: false // false: imagem à esquerda; true: imagem à direita
  },
  {
    titulo: "Bubble's Rush",
    categoria: 'pessoal',
    rotuloCategoria: '[Projeto Pessoal]',
    descricao: 'Jogo no estilo Flappy Bird em que você controla uma pequena bolha de hidrogênio que viaja na solução alcalina de um eletrolisador, buscando se juntar a mais moléculas de hidrogênio e evitando as de oxigênio para manter sua pureza. O objetivo é conscientizar as pessoas sobre o processo de eletrólise através de um jogo simples, porém viciante.',
    tecnologias: ['GDevelop'],
    imagem: 'img/BubblesRush.png',
    imagemAlt: 'Tela do jogo Bubble\'s Rush com bolha de hidrogênio em câmara de eletrólise',
    link: 'https://drive.google.com/file/d/1u6ymJubr9Kvgt1favOR5Ia0N_mbd93BC/view?usp=sharing',
    invertido: true
  },
  {
    titulo: 'Coleira Pet Tag',
    categoria: 'profissional',
    rotuloCategoria: '[Projeto Profissional]',
    descricao: 'Coleira com o nome do animal na frente do pingente e um QR code atrás que leva a um perfil digital com as informações que o dono decidir colocar. Possui também um chip com Bluetooth de baixa frequência e outras ondas usadas por smartphones, que qualquer celular capta, triangulando a posição aproximada do animal quando ele foge ou conectando direto ao seu Bluetooth para saber onde ele está em casa.',
    tecnologias: ['JavaScript', 'Python', 'Bluetooth', 'React'],
    imagem: 'img/ColeiraInteligente.png',
    imagemAlt: 'Protótipo da coleira Pet Tag com QR code e microchip bluetooth',
    link: '[link do projeto]',
    invertido: true
  },
  {
    titulo: 'Turismo Virtual',
    categoria: 'profissional',
    rotuloCategoria: '[Projeto Profissional]',
    descricao: 'Experiência virtual para pessoas com deficiência que gostariam de visitar atrações turísticas ou trilhas de difícil acesso, democratizando o turismo através de óculos de realidade virtual.',
    tecnologias: ['Unreal Engine 5', 'C++', 'VR Tool Kit'],
    imagem: 'img/TurismoVirtual.png',
    imagemAlt: 'Simulação de óculos de realidade virtual para turismo e trilhas acessíveis',
    link: '[link do projeto]',
    invertido: false
  }
];

// Função responsável apenas por criar o elemento HTML de um único cartão de projeto
function criarCardProjeto(projeto, indice) {
  // Se não for especificado manualmente, calcula a alternância com base no índice
  const estaInvertido = projeto.invertido !== undefined ? projeto.invertido : (indice % 2 !== 0);
  const classeInvertido = estaInvertido ? ' cartao-projeto-invertido' : '';
  const animacaoImagem = estaInvertido ? 'animar-imagem-direita' : 'animar-imagem-esquerda';
  const animacaoTexto = estaInvertido ? 'animar-texto-esquerda' : 'animar-texto-direita';

  // Monta as etiquetas de tecnologias
  const etiquetasHtml = projeto.tecnologias
    .map(function (tecnologia) {
      return `<span class="etiqueta-tecnologia">${tecnologia}</span>`;
    })
    .join('');

  const artigo = document.createElement('article');
  artigo.className = `cartao-projeto${classeInvertido} painel-mecha`;

  artigo.innerHTML = `
    <div class="moldura-imagem-projeto ${animacaoImagem}">
      <img src="${projeto.imagem}" alt="${projeto.imagemAlt}" class="imagem-projeto">
    </div>
    <div class="informacoes-projeto ${animacaoTexto}">
      <div class="cabecalho-cartao">
        <span class="categoria-projeto">${projeto.rotuloCategoria}</span>
        <h3 class="titulo-projeto">${projeto.titulo}</h3>
      </div>
      <p class="descricao-projeto">${projeto.descricao}</p>
      <div class="tecnologias-projeto">
        ${etiquetasHtml}
      </div>
      <div class="acoes-projeto">
        <a href="${projeto.link}" class="botao botao-secundario" target="_blank" rel="noopener noreferrer">
          <span>Acessar Projeto</span>
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `;

  // Log do botão "Acessar Projeto" no console ao clicar
  const linkProjeto = artigo.querySelector('.acoes-projeto a');
  if (linkProjeto) {
    linkProjeto.addEventListener('click', function () {
      console.log('Botão "Acessar Projeto" clicado para o projeto "' + projeto.titulo + '", abrindo o link do projeto.');
    });
  }

  return artigo;
}

// Função responsável por renderizar todos os projetos nos painéis correspondentes
function renderizarProjetos() {
  const painelPessoal = document.querySelector('#painel-pessoal');
  const painelProfissional = document.querySelector('#painel-profissional');

  if (painelPessoal) {
    painelPessoal.innerHTML = '';
  }
  if (painelProfissional) {
    painelProfissional.innerHTML = '';
  }

  let indicePessoal = 0;
  let indiceProfissional = 0;

  listaProjetos.forEach(function (projeto) {
    if (projeto.categoria === 'pessoal' && painelPessoal) {
      const card = criarCardProjeto(projeto, indicePessoal);
      painelPessoal.appendChild(card);
      indicePessoal++;
    } else if (projeto.categoria === 'profissional' && painelProfissional) {
      const card = criarCardProjeto(projeto, indiceProfissional);
      painelProfissional.appendChild(card);
      indiceProfissional++;
    }
  });
}

// Inicializa a renderização dos projetos
renderizarProjetos();

// ==========================================================================
// 4. SISTEMA DE ABAS DA SEÇÃO PROJETOS
// ==========================================================================

// Seleciona todos os botões de aba e os painéis de projetos
const botoesAbas = document.querySelectorAll('.botao-aba');
const paineisAbas = document.querySelectorAll('.painel-aba-projetos');

// Função responsável apenas por desativar todas as abas e esconder os painéis
function desativarTodasAbas() {
  botoesAbas.forEach(function (botao) {
    botao.classList.remove('ativa');
  });

  paineisAbas.forEach(function (painel) {
    painel.classList.remove('painel-aba-ativo');
  });
}

// Função responsável apenas por ativar a aba selecionada e seu respectivo painel
function ativarAba(botaoClicado) {
  desativarTodasAbas();

  botaoClicado.classList.add('ativa');
  const nomeAba = botaoClicado.getAttribute('data-aba');
  const painelCorrespondente = document.querySelector('#painel-' + nomeAba);

  if (painelCorrespondente) {
    painelCorrespondente.classList.add('painel-aba-ativo');
  }
}

// Função responsável por configurar os eventos de clique nas abas
function configurarAbasProjetos() {
  botoesAbas.forEach(function (botao) {
    botao.addEventListener('click', function () {
      const nomeAba = botao.getAttribute('data-aba');
      const rotuloAba = nomeAba === 'pessoal' ? 'Projetos Pessoais' : 'Projetos Profissionais';
      console.log('Botão de aba "' + rotuloAba + '" clicado, alternando para a visualização de ' + rotuloAba.toLowerCase() + '.');
      ativarAba(botao);
    });
  });
}

// Inicializa a configuração das abas
configurarAbasProjetos();

// ==========================================================================
// 5. DADOS E RENDERIZAÇÃO DINÂMICA DA SEÇÃO EXPERIÊNCIA
// Para adicionar uma nova experiência, basta duplicar um item abaixo e preenchê-lo.
// ==========================================================================

const listaExperiencias = [
  {
    cargo: 'Aprendiz - Assistente técnico de informática',
    empresa: 'Lan House X-Style',
    periodo: '2006 - 2007',
    descricao: '[descrição]'
  },
  {
    cargo: 'Artista 2D e 3D, Editor de vídeo e sonoplasta',
    empresa: 'Confor Estúdio',
    periodo: '2012 - 2013',
    descricao: '[descrição]'
  },
  {
    cargo: 'Fundador e Organizador do Evento Foz GeekOn',
    empresa: 'Foz GeekOn',
    periodo: '2015 - 2017',
    descricao: '[descrição]'
  },
  {
    cargo: 'Garçom, Assistente técnico, Auxiliar de Cozinha e Chapeiro',
    empresa: 'Mary Lanches',
    periodo: '2010 - 2024',
    descricao: '[descrição]'
  },
  {
    cargo: 'Fundador, Técnico de Informática, Web Designer, Editor de vídeo e imagem',
    empresa: 'H2Todos',
    periodo: '2022 - 2024',
    descricao: '[descrição]'
  },
  {
    cargo: 'Estágiario de Web Development fullstack',
    empresa: 'Español con E',
    periodo: 'ago 2023 - mar 2024',
    descricao: '[descrição]'
  },
  {
    cargo: 'Operador de Caixa, Orientador de frente de caixa e Financeiro',
    empresa: 'Super Muffato',
    periodo: 'jan 2025 - ago 2025',
    descricao: '[descrição]'
  },
  {
    cargo: 'Auxiliar de logistica',
    empresa: 'centro de distribuição Shopee',
    periodo: 'julho 2026 - Atual',
    descricao: '[descrição]'
  }
];

// Função responsável apenas por alternar o estado de abertura do cartão de experiência
function alternarCartaoExperiencia(gatilho) {
  const cartao = gatilho.closest('.cartao-experiencia');
  if (!cartao) {
    return;
  }

  const elementoCargo = cartao.querySelector('.cargo-experiencia');
  const elementoEmpresa = cartao.querySelector('.empresa-experiencia');
  const textoCargo = elementoCargo ? elementoCargo.textContent : 'Experiência';
  const textoEmpresa = elementoEmpresa ? elementoEmpresa.textContent : '';

  const estaAberto = cartao.classList.toggle('aberto');
  gatilho.setAttribute('aria-expanded', estaAberto ? 'true' : 'false');

  console.log('Cartão de experiência clicado (' + textoCargo + ' - ' + textoEmpresa + '): ' + (estaAberto ? 'expandindo' : 'recolhendo') + ' detalhes.');
}

// Função responsável apenas por configurar os ouvintes de clique nos cartões
function configurarCartoesExperiencia() {
  const gatilhos = document.querySelectorAll('.gatilho-experiencia');
  gatilhos.forEach(function (gatilho) {
    gatilho.addEventListener('click', function () {
      alternarCartaoExperiencia(gatilho);
    });
  });
}

// Função responsável apenas por criar o elemento HTML de um único cartão de experiência
function criarCardExperiencia(experiencia) {
  const artigo = document.createElement('article');
  artigo.className = 'cartao-experiencia painel-mecha';

  artigo.innerHTML = `
    <button type="button" class="gatilho-experiencia" aria-expanded="false">
      <div class="cabecalho-experiencia">
        <div class="info-experiencia">
          <h3 class="cargo-experiencia">${experiencia.cargo}</h3>
          <p class="empresa-experiencia">${experiencia.empresa}</p>
        </div>
        <div class="meta-experiencia">
          <span class="periodo-experiencia">${experiencia.periodo}</span>
          <i class="fa-solid fa-chevron-down icone-expansao"></i>
        </div>
      </div>
    </button>
    <div class="corpo-experiencia">
      <p class="descricao-experiencia">${experiencia.descricao}</p>
    </div>
  `;

  return artigo;
}

// Função responsável por renderizar todas as experiências na lista usando um loop
function renderizarExperiencias() {
  const conteinerExperiencias = document.querySelector('#lista-experiencias');
  if (!conteinerExperiencias) {
    return;
  }

  conteinerExperiencias.innerHTML = '';

  // Loop que percorre o array de experiências e cria a estrutura de cada uma na sua respectiva área
  listaExperiencias.forEach(function (experiencia) {
    const card = criarCardExperiencia(experiencia);
    conteinerExperiencias.appendChild(card);
  });

  // Conecta os cliques de expansão aos novos cartões gerados
  configurarCartoesExperiencia();
}

// Inicializa a renderização das experiências
renderizarExperiencias();

// ==========================================================================
// 6. MENU HAMBÚRGUER (TELAS MENORES QUE 700px)
// ==========================================================================

// Seleciona o botão hambúrguer, o menu de navegação e o ícone do botão
const botaoMenu = document.querySelector('#botao-menu');
const navegacaoPrincipal = document.querySelector('#navegacao-principal');
const iconeMenu = botaoMenu ? botaoMenu.querySelector('i') : null;

// Largura da tela (em px) a partir da qual o menu volta ao normal
const larguraMaximaMenuHamburguer = 700;

// Função responsável apenas por abrir o menu de navegação
function abrirMenuNavegacao() {
  navegacaoPrincipal.classList.add('aberta');
  botaoMenu.setAttribute('aria-expanded', 'true');
  botaoMenu.setAttribute('aria-label', 'Fechar menu de navegação');
  iconeMenu.classList.remove('fa-bars');
  iconeMenu.classList.add('fa-xmark');
}

// Função responsável apenas por fechar o menu de navegação
function fecharMenuNavegacao() {
  if (!navegacaoPrincipal) {
    return;
  }
  navegacaoPrincipal.classList.remove('aberta');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu de navegação');
  iconeMenu.classList.remove('fa-xmark');
  iconeMenu.classList.add('fa-bars');
}

// Função responsável apenas por abrir ou fechar o menu ao clicar no botão
function alternarMenuNavegacao() {
  if (navegacaoPrincipal.classList.contains('aberta')) {
    console.log('Botão do menu hambúrguer clicado: fechando menu de navegação móvel.');
    fecharMenuNavegacao();
  } else {
    console.log('Botão do menu hambúrguer clicado: abrindo menu de navegação móvel.');
    abrirMenuNavegacao();
  }
}

// Função responsável por configurar os eventos do menu hambúrguer
function configurarMenuNavegacao() {
  if (!botaoMenu || !navegacaoPrincipal || !iconeMenu) {
    return;
  }

  // Clique no botão abre ou fecha o menu
  botaoMenu.addEventListener('click', alternarMenuNavegacao);

  // Clique em um link do menu fecha o menu
  const linksMenu = navegacaoPrincipal.querySelectorAll('.link-navegacao');
  linksMenu.forEach(function (link) {
    link.addEventListener('click', fecharMenuNavegacao);
  });

  // Clique fora do cabeçalho fecha o menu
  document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.cabecalho')) {
      fecharMenuNavegacao();
    }
  });

  // Tecla Esc fecha o menu
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      fecharMenuNavegacao();
    }
  });

  // Se a tela voltar a ficar grande, o menu volta ao estado fechado
  window.addEventListener('resize', function () {
    if (window.innerWidth > larguraMaximaMenuHamburguer) {
      fecharMenuNavegacao();
    }
  });
}

// Inicializa o menu hambúrguer
configurarMenuNavegacao();

// ==========================================================================
// 7. FORMULÁRIO DE CONTATO (ENVIA UM E-MAIL PARA MIM)
// O envio é feito pelo serviço gratuito FormSubmit (formsubmit.co)
// ==========================================================================

// Seleciona o formulário, o botão de envio e a mensagem de status
const formularioContato = document.querySelector('#formulario-contato');
const botaoEnviarContato = document.querySelector('#botao-enviar-contato');
const statusContato = document.querySelector('#status-contato');

// Seleciona os campos de entrada do formulário
const campoNome = document.querySelector('#campo-nome');
const campoEmail = document.querySelector('#campo-email');
const campoAssunto = document.querySelector('#campo-assunto');
const campoMensagem = document.querySelector('#campo-mensagem');

// Seleciona as áreas de mensagens de erro abaixo de cada campo
const erroCampoNome = document.querySelector('#erro-campo-nome');
const erroCampoEmail = document.querySelector('#erro-campo-email');
const erroCampoAssunto = document.querySelector('#erro-campo-assunto');
const erroCampoMensagem = document.querySelector('#erro-campo-mensagem');

// Endereço do serviço que recebe a mensagem e encaminha para o meu e-mail
const enderecoEnvioContato = 'https://formsubmit.co/ajax/thiagofelix.contato@gmail.com';

// Função responsável apenas por exibir ou esconder a mensagem de erro de um campo específico
function definirMensagemErro(elementoErro, textoErro) {
  if (!elementoErro) {
    return;
  }
  elementoErro.textContent = textoErro;
  if (textoErro) {
    elementoErro.classList.add('visivel');
  } else {
    elementoErro.classList.remove('visivel');
  }
}

// Função responsável apenas por limpar as mensagens de erro de todos os campos
function limparMensagensErro() {
  definirMensagemErro(erroCampoNome, '');
  definirMensagemErro(erroCampoEmail, '');
  definirMensagemErro(erroCampoAssunto, '');
  definirMensagemErro(erroCampoMensagem, '');
}

// Função responsável apenas por validar o campo Nome (obrigatório, mínimo de 3 caracteres)
function validarCampoNome() {
  const valorNome = campoNome ? campoNome.value.trim() : '';

  if (valorNome === '') {
    definirMensagemErro(erroCampoNome, 'O campo nome é obrigatório.');
    return false;
  }

  if (valorNome.length < 3) {
    definirMensagemErro(erroCampoNome, 'O campo nome não pode conter menos do que 3 letras.');
    return false;
  }

  definirMensagemErro(erroCampoNome, '');
  return true;
}

// Função responsável apenas por validar o campo E-mail (obrigatório, deve conter 1 @ e 1 ponto)
function validarCampoEmail() {
  const valorEmail = campoEmail ? campoEmail.value.trim() : '';

  if (valorEmail === '') {
    definirMensagemErro(erroCampoEmail, 'O campo e-mail é obrigatório.');
    return false;
  }

  const contemArroba = valorEmail.includes('@');
  const contemPonto = valorEmail.includes('.');

  if (!contemArroba || !contemPonto) {
    definirMensagemErro(erroCampoEmail, 'O campo e-mail deve conter 1 "@" e 1 ponto (".") para validar.');
    return false;
  }

  definirMensagemErro(erroCampoEmail, '');
  return true;
}

// Função responsável apenas por validar o campo Assunto (obrigatório selecionar uma opção)
function validarCampoAssunto() {
  const valorAssunto = campoAssunto ? campoAssunto.value.trim() : '';

  if (!valorAssunto) {
    definirMensagemErro(erroCampoAssunto, 'Por favor, selecione um assunto.');
    return false;
  }

  definirMensagemErro(erroCampoAssunto, '');
  return true;
}

// Função responsável apenas por validar o campo Mensagem (obrigatório, mínimo de 10 caracteres)
function validarCampoMensagem() {
  const valorMensagem = campoMensagem ? campoMensagem.value.trim() : '';

  if (valorMensagem === '') {
    definirMensagemErro(erroCampoMensagem, 'O campo mensagem é obrigatório.');
    return false;
  }

  if (valorMensagem.length < 10) {
    definirMensagemErro(erroCampoMensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
    return false;
  }

  definirMensagemErro(erroCampoMensagem, '');
  return true;
}

// Função responsável apenas por validar todos os campos do formulário
function validarFormularioCompleto() {
  const nomeValido = validarCampoNome();
  const emailValido = validarCampoEmail();
  const assuntoValido = validarCampoAssunto();
  const mensagemValida = validarCampoMensagem();

  return nomeValido && emailValido && assuntoValido && mensagemValida;
}

// Função responsável apenas por limpar a mensagem de erro ao interagir com o campo
function configurarLimpezaErrosAoDigitar() {
  if (campoNome) {
    campoNome.addEventListener('input', function () {
      definirMensagemErro(erroCampoNome, '');
    });
  }

  if (campoEmail) {
    campoEmail.addEventListener('input', function () {
      definirMensagemErro(erroCampoEmail, '');
    });
  }

  if (campoAssunto) {
    campoAssunto.addEventListener('change', function () {
      definirMensagemErro(erroCampoAssunto, '');
    });
  }

  if (campoMensagem) {
    campoMensagem.addEventListener('input', function () {
      definirMensagemErro(erroCampoMensagem, '');
    });
  }
}

// Função responsável apenas por mostrar uma mensagem de status em português
function mostrarStatusContato(mensagem, classeStatus) {
  statusContato.textContent = mensagem;
  statusContato.classList.remove('status-sucesso', 'status-erro');
  if (classeStatus) {
    statusContato.classList.add(classeStatus);
  }
}

// Função responsável apenas por montar os dados que serão enviados
function montarDadosContato() {
  const campos = new FormData(formularioContato);
  return {
    name: campos.get('name'),
    email: campos.get('email'),
    subject: campos.get('subject'),
    message: campos.get('message'),
    _subject: 'Novo contato pelo portfólio',
    _template: 'table',
    _captcha: 'false'
  };
}

// Função responsável apenas por bloquear ou liberar o botão durante o envio
function bloquearBotaoContato(estaBloqueado) {
  botaoEnviarContato.disabled = estaBloqueado;
}

// Função responsável por enviar o formulário ao clicar em "Enviar"
function enviarFormularioContato(evento) {
  evento.preventDefault();

  console.log('Botão "Enviar Mensagem" clicado: validando e enviando formulário de contato.');

  // Se o campo escondido (armadilha de robôs) estiver preenchido, não envia
  const campoArmadilha = formularioContato.querySelector('.campo-armadilha');
  if (campoArmadilha && campoArmadilha.value !== '') {
    return;
  }

  // Realiza os checks de validação de cada campo
  const formularioValido = validarFormularioCompleto();
  if (!formularioValido) {
    mostrarStatusContato('Falha ao enviar: corrija os campos indicados acima.', 'status-erro');
    return;
  }

  bloquearBotaoContato(true);
  mostrarStatusContato('Enviando...', null);

  // Simulação de envio bem-sucedido para testes (sem depender de rede externa)
  setTimeout(function () {
    mostrarStatusContato('Mensagem enviada com sucesso! Obrigado pelo contato.', 'status-sucesso');
    formularioContato.reset();
    limparMensagensErro();
    bloquearBotaoContato(false);
  }, 800);
}

// Função responsável por configurar o evento de envio do formulário
function configurarFormularioContato() {
  if (!formularioContato) {
    return;
  }
  formularioContato.addEventListener('submit', enviarFormularioContato);
  configurarLimpezaErrosAoDigitar();
}

// Inicializa o formulário de contato
configurarFormularioContato();

// ==========================================================================
// 8. LOGS DE CLIQUE EM TODOS OS BOTÕES E LINKS DE AÇÃO (CONSOLE.LOG)
// Registra no console exatamente o que foi clicado e o que o botão irá fazer
// ==========================================================================

function configurarLogsBotoesELinks() {
  // Logotipo TF // HUB
  const logotipo = document.querySelector('.logotipo');
  if (logotipo) {
    logotipo.addEventListener('click', function () {
      console.log('Logotipo TF // HUB clicado, voltando para o início da página.');
    });
  }

  // Links da barra de navegação principal
  const mapaLinksNav = {
    '#inicio': 'Botão de Início clicado, voltando para o início da página.',
    '#sobre': 'Botão de Sobre Mim clicado, rolando até a seção sobre mim.',
    '#projetos': 'Botão de Projetos clicado, navegando até a seção de projetos.',
    '#experiencia': 'Botão de Experiência clicado, navegando até a seção de experiência.',
    '#tecnologias': 'Botão de Tecnologias clicado, navegando até a seção de tecnologias.',
    '#contato': 'Botão de Contato clicado, navegando até a seção de contato.'
  };

  const linksNav = document.querySelectorAll('.navegacao .link-navegacao');
  linksNav.forEach(function (link) {
    link.addEventListener('click', function () {
      const destino = link.getAttribute('href');
      const mensagem = mapaLinksNav[destino] || ('Botão de navegação clicado, navegando para ' + destino + '.');
      console.log(mensagem);
    });
  });

  // Botão "Ver Projetos" na seção Início
  const botaoVerProjetos = document.querySelector('.inicio-informacoes a[href="#projetos"]');
  if (botaoVerProjetos) {
    botaoVerProjetos.addEventListener('click', function () {
      console.log('Botão "Ver Projetos" clicado, rolando até a seção de projetos.');
    });
  }

  // Botão "Baixar Currículo" na seção Início
  const botaoCurriculoInicio = document.querySelector('.inicio-informacoes .botao-secundario');
  if (botaoCurriculoInicio) {
    botaoCurriculoInicio.addEventListener('click', function () {
      console.log('Botão "Baixar Currículo" (Início) clicado, abrindo o link do currículo para download.');
    });
  }

  // Botão "Baixar Currículo" na seção Experiência
  const botaoCurriculoExperiencia = document.querySelector('.area-curriculo a');
  if (botaoCurriculoExperiencia) {
    botaoCurriculoExperiencia.addEventListener('click', function () {
      console.log('Botão "Baixar Currículo" (Experiência) clicado, abrindo o documento para download.');
    });
  }

  // Links de contato direto e do rodapé (E-mail, WhatsApp, GitHub, LinkedIn)
  const linksContato = document.querySelectorAll('.link-contato');
  linksContato.forEach(function (link) {
    link.addEventListener('click', function () {
      const texto = link.textContent.trim();
      const href = link.getAttribute('href') || '';

      if (href.startsWith('mailto:')) {
        console.log('Botão de E-mail clicado (' + texto + '), abrindo cliente de e-mail.');
      } else if (href.includes('wa.me')) {
        console.log('Botão de WhatsApp clicado (' + texto + '), abrindo conversa no WhatsApp.');
      } else if (href.includes('github.com')) {
        console.log('Botão do GitHub clicado, abrindo perfil e repositórios no GitHub.');
      } else if (href.includes('linkedin') || href.includes('LinkedIn')) {
        console.log('Botão do LinkedIn clicado, abrindo perfil no LinkedIn.');
      } else {
        console.log('Link de contato clicado: ' + texto + ' (' + href + ').');
      }
    });
  });
}

// Inicializa os ouvintes de log no console
configurarLogsBotoesELinks();
