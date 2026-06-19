import { buscarDadosApi } from "./app.js";

const vitrineSaibaMais = document.createElement('div');
vitrineSaibaMais.id = 'vitrine-cards';

function formatarLinkLocal(urlImg) {
    if (!urlImg) return "";
    const url = urlImg.trim();
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.includes('.')) return `https://${url}`;
    return url;
}

const card = function(dados){
    vitrineSaibaMais.replaceChildren();
    vitrineSaibaMais.className = 'informacaoCard'
    
    const conteinerHorizontal = document.createElement('div')    
    conteinerHorizontal.className = 'conteinerHorizontal'

    const imgSaibaMais = document.createElement('img')
    imgSaibaMais.className = 'imgSaibaMais'
    imgSaibaMais.src = formatarLinkLocal(dados.imagem);

    const titulo = document.createElement('p')
    titulo.className = 'tituloSaibaMais'
    titulo.textContent = dados.nome

    conteinerHorizontal.append(imgSaibaMais, titulo)

    const conteinerInformacao = document.createElement('div')
    conteinerInformacao.className = 'conteinerInformacao'
    
    const subCategoriaInfo = document.createElement('span')
    subCategoriaInfo.className = 'subCategoriaInfo'
    subCategoriaInfo.textContent = `Sub Categoria: ${dados.subcategoria}`

    const descricao = document.createElement('p')
    descricao.className = "descricao"
    descricao.textContent = dados.descricao

    conteinerInformacao.append(subCategoriaInfo, descricao)
    vitrineSaibaMais.append(conteinerHorizontal, conteinerInformacao)
}

export async function criarCards(){
    const dadosApi = await buscarDadosApi()
    const main = document.getElementById('main')

    vitrineSaibaMais.className = "cardsAll"
    vitrineSaibaMais.replaceChildren();

    dadosApi.forEach(itensCard => {
        const conteiner = document.createElement('div')
        conteiner.className = 'conteinerCards'
        
        const titulo = document.createElement('h2')
        titulo.className = 'titulo' 
        titulo.textContent = itensCard.nome

        const imgProduto = document.createElement('img')
        imgProduto.className = 'imgProduto'
        imgProduto.src = formatarLinkLocal(itensCard.imagem);

        const miniInformacao = document.createElement('p')
        miniInformacao.textContent = itensCard.detalhes

        const bntSaibaMais = document.createElement('button')
        bntSaibaMais.className = 'saibaMais'
        bntSaibaMais.textContent = "Saiba Mais"
        bntSaibaMais.onclick = () => card(itensCard)

        const subCategoria = document.createElement('p')
        subCategoria.textContent = `Categoria: ${itensCard.categoria}`

        conteiner.append(imgProduto, titulo, miniInformacao, bntSaibaMais, subCategoria)
        vitrineSaibaMais.appendChild(conteiner)
    });

    main.appendChild(vitrineSaibaMais)
}