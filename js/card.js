import { buscarDadosApi } from "./app.js";
//card com erro bem grande
   const conteiner = document.createElement('div')
   conteiner.id = 'caixa'

    const card = function(dadosApi){
        
        
        const conteinerHorizontal = document.createElement('div')
        dadosApi.forEach(itensSaibaMais =>{
            
            conteinerHorizontal.className = 'conteinerHorizontal'

            const imgSaibaMais = document.createElement('img')
            imgSaibaMais.className = 'imgSaibaMais'
            imgSaibaMais.src = './img/logo_empresa.png'

            const titulo = document.createElement('h2')
            titulo.className = 'tituloSaibaMais'
            titulo.textContent = itensSaibaMais.name

            conteinerHorizontal.append(imgSaibaMais,titulo)
            conteiner.replaceChildren(conteinerHorizontal)    
        });
        
        return conteiner
        
    }


 export async function criarCards(){
    const dadosApi = await buscarDadosApi()
    const main = document.getElementById('main')
    conteiner.replaceChildren()

    dadosApi.forEach(itensCard => {
        
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
        bntSaibaMais.onclick =() => card(dadosApi)

        const subCategoria = document.createElement('p')
        subCategoria.textContent = itensCard.status

        conteiner.append(titulo,imgProduto,miniInformacao,bntSaibaMais,subCategoria)
        main.appendChild(conteiner)
    });


}