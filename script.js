// Declaração Variaveis

const html = document.querySelector('html')

const foco = document.querySelector('.app__card-button--foco')

const curto = document.querySelector('.app__card-button--curto')

const longo = document.querySelector('.app__card-button--longo')

const banner = document.querySelector('.app__image')

const titulo = document.querySelector('.app__title')

const botoes = document.querySelectorAll('.app__card-button')

const inputmsc = document.querySelector('#alternar-musica')

const startpause = document.querySelector('#start-pause')

const musica = new Audio('/sons/luna-rise-part-one.mp3')

const beep = new Audio ('/sons/beep.mp3')

const pausesound = new Audio ('/sons/pause.mp3')

const playaudio = new Audio ('/sons/play.wav')

const botaoinicia = document.querySelector('#start-pause span')

const imagembotao = document.querySelector('.app__card-primary-butto-icon')

const timernatela = document.querySelector('#timer')

musica.loop = true

let temposeg = 1500;
let intervalid = null;

// Altera cores e imagens

function AlteraContexto(contexto) {
    mostraTempo()
    html.setAttribute('data-contexto', contexto)  // <- Muda background
    banner.setAttribute('src' ,`/imagens/${contexto}.png` ) // <- Muda imagem
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?
            <strong class="app__title-strong">Faça uma pausa curta <strong/>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superfície.<strong class="app__title-strong">Faça uma pausa longa <strong/>`

        default:
         break;
    }

    // Muda seleção do botão
    botoes.forEach((contexto) => {
        contexto.classList.remove('active')
    })
}

// Pausa e da play na musica

inputmsc.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})


// chama função

foco.addEventListener('click', () => {
    temposeg = 1500
    AlteraContexto('foco')
    foco.classList.add('active')
})

curto.addEventListener('click', () => {
    temposeg = 300
    AlteraContexto('descanso-curto')
    curto.classList.add('active')
})

longo.addEventListener('click' , () => {
    temposeg = 900
    AlteraContexto('descanso-longo')
    longo.classList.add('active')
})


// Inicia contador de tempo

const contagem = () => {
    if (temposeg <= 0) {
        zerar()
        beep.play()
        return
    }
    temposeg -= 1;
    mostraTempo()
        
}

startpause.addEventListener('click', iniciaandpause ,)


function iniciaandpause () {
    if (intervalid) {
        zerar()
        pausesound.play()
        botaoinicia.textContent = "Começar"
        imagembotao.setAttribute('src' , '/imagens/play_arrow.png')
        return
    }
    intervalid = setInterval(contagem , 1000)
    playaudio.play()
    botaoinicia.textContent = "Pausar"
    imagembotao.setAttribute('src' ,'/imagens/pause.png' )
    
}

// Reinicia Contador

function zerar() {
    clearInterval(intervalid)
    intervalid = null;
}

// Mostra timer na tela

function mostraTempo () {
    const tempo = new Date(temposeg * 1000)
    const tempoformat = tempo.toLocaleString('pt-br' , {minute: '2-digit' , second:'2-digit'})
    timernatela.innerHTML = `${tempoformat}`
}

mostraTempo()

