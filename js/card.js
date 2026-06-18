import { buscarDadosApi } from "./app.js";
//card com erro bem grande
const vitrineSaibaMais = document.createElement('div');
vitrineSaibaMais.id = 'vitrine-cards';

const card = function(dados){
    vitrineSaibaMais.replaceChildren();
    vitrineSaibaMais.className = 'informacaoCard'
    const conteinerHorizontal = document.createElement('div')    
    conteinerHorizontal.className = 'conteinerHorizontal'

    const imgSaibaMais = document.createElement('img')
    imgSaibaMais.className = 'imgSaibaMais'
    imgSaibaMais.src = dados.image.medium

    const titulo = document.createElement('h2')
    titulo.className = 'tituloSaibaMais'
    titulo.textContent = dados.name

    conteinerHorizontal.append(imgSaibaMais,titulo)

    const conteinerInformacao = document.createElement('div')
    conteinerInformacao.className = 'conteinerInformacao'
    
    const subCategoriaInfo = document.createElement('span')
    subCategoriaInfo.className = 'subCategoriaInfo'
    subCategoriaInfo.textContent = dados.type

    const descricao = document.createElement('p')
    descricao.className = "descricao"
    descricao.textContent = dados.summary

    conteinerInformacao.append(subCategoriaInfo,descricao)
    vitrineSaibaMais.append(conteinerHorizontal,conteinerInformacao)
        
}

export async function criarCards(){
    const dadosApi = await buscarDadosApi()
    const main = document.getElementById('main')

    vitrineSaibaMais.className = "cardsAll"

    dadosApi.forEach(itensCard => {
        const conteiner = document.createElement('div')
        conteiner.className = 'conteinerCards'
        
        const titulo = document.createElement('h2')
        titulo.className = 'titulo' 
        titulo.textContent = itensCard.name

        const imgProduto = document.createElement('img')
        imgProduto.src = itensCard.image.medium
        imgProduto.className = 'imgProduto'

        const miniInformacao = document.createElement('p')
        miniInformacao.textContent = itensCard.language

        const bntSaibaMais = document.createElement('button')
        bntSaibaMais.className = 'saibaMais'
        bntSaibaMais.textContent = "Saiba Mais"
        // o onclick = ao clicar
        bntSaibaMais.onclick =() => card(itensCard)

        const subCategoria = document.createElement('p')
        subCategoria.textContent = itensCard.status

        conteiner.append(imgProduto,titulo,miniInformacao,bntSaibaMais,subCategoria)
        vitrineSaibaMais.appendChild(conteiner)
    });

    main.appendChild(vitrineSaibaMais)
}