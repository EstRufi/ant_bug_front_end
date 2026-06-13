import { buscarDadosApi } from "./app.js"

function randomImagens(dados){
    const imgTodas = dados.length

    if(imgTodas > 0){
        const random = Math.random() * imgTodas
        const randomImg = Math.floor(random)
                    // Aqui ta assim por que o ramdon ta enviando o id para dados
        const imgSorteado = dados[randomImg]

        //caso precise mudar é aqui
        if(imgSorteado.image.medium){

            // para pegar as imagens da api
            const img = imgSorteado.image.medium

            return img
        }
        else{
            // Aqui caso tenha uma foto null, ele ira pedir novamente pro ramdon pega outro id
            return randomImagens(dados)
        }
    }
    else{
        let alerta =alert("Não fez o random")
        return alerta
    }
}

async function criarFotosCarrossel(dados){
    const pegarImage = randomImagens(dados)

    const ulCarrossel = document.getElementById('carrossel')
    const li = document.createElement('li')
    const imageProduto = document.createElement('img')

    li.className = 'listaCarrossel'

    imageProduto.src = pegarImage
    imageProduto.className = 'imageProduto'

    li.appendChild(imageProduto)
    ulCarrossel.appendChild(li)
}

 export async function moverCarrossel(){
    const ulCarrossel = document.getElementById('carrossel')
    let dados = await buscarDadosApi()

    // aqui é para acontecer de forma infinita
    setInterval( () => {
        // ele ta falando se os filhos da ul tiver vazia pode prencher com as 10 images
        // de uma vez, se não ira ser uma por vez
        if(ulCarrossel.children.length === 0){

            for(let i = 0;i < 10;i++){
                criarFotosCarrossel(dados)
            }
        }
        // Precisa dele aqui fora para quando der 10 imagens ele ainda gerar mais uma para passar pro lado
        //então se quiser que seja infinito precisa dele aqui
        criarFotosCarrossel(dados)
        
        // aqui para ele se mover na velocidade 0,5segundos ao inicio ao fim
        ulCarrossel.style.transition = 'transform 0.5s ease-in-out'
        // aqui é para se mover do eixo X para esquerda ou direita 230px. ( se tiver positivo ou negativo indica se vai para esquerda ou direita)
        ulCarrossel.style.transform = `translateX(-230px)`

        // aqui é para acontecer somente quando o tempo indicado acontecer
        setTimeout(() => {
            // aqui é para buscar la no html oq foi pedido no caso o . é para achar a classe expecifica e se for id use #
            const primeiroItem = ulCarrossel.querySelector('.listaCarrossel');
            if (primeiroItem) {
                primeiroItem.remove(); // Apaga a foto que sumiu na esquerda
            }
            ulCarrossel.style.transition = 'none'
            ulCarrossel.style.transform = 'translateX(0px)'
        },500)
    },1800)
}