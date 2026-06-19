import { buscarDadosApi } from "./app.js"

function randomImagens(dados){
    if(!dados || dados.length === 0) return "";

    const imgTodas = dados.length
    const random = Math.random() * imgTodas
    const randomImg = Math.floor(random)
    const imgSorteado = dados[randomImg]

    if (!imgSorteado || !imgSorteado.imagem) return "";

    const urlImg = imgSorteado.imagem.trim();

    if (urlImg.startsWith('http://') || urlImg.startsWith('https://')) {
        return urlImg;
    } 
    
    if (urlImg.includes('.')) {
        return `https://${urlImg}`;
    }

    return urlImg;
}

async function criarFotosCarrossel(dados){
    const pegarImage = randomImagens(dados)
    if(!pegarImage) return; 

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

    if(!dados || dados.length === 0) return;

    setInterval(() => {
        if(ulCarrossel.children.length === 0){
            for(let i = 0; i < 10; i++){
                criarFotosCarrossel(dados)
            }
        }
        
        criarFotosCarrossel(dados)
        
        ulCarrossel.style.transition = 'transform 0.5s ease-in-out'
        ulCarrossel.style.transform = `translateX(-230px)`

        setTimeout(() => {
            const primeiroItem = ulCarrossel.querySelector('.listaCarrossel');
            if (primeiroItem) {
                primeiroItem.remove();
            }
            ulCarrossel.style.transition = 'none'
            ulCarrossel.style.transform = 'translateX(0px)'
        }, 500)

    }, 1800)
}