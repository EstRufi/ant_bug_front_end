'use strict'
import { criarCards } from "./card.js";
import { moverCarrossel } from "./carrossel.js";
import { dropdown } from "./dropdown.js";
import { ativarPesquisa } from "./pesquisa.js"; // 1. Importa a função do arquivo novo

export async function buscarDadosApi(){
    try {
        const url = `https://api.tvmaze.com/shows`
        const response = await fetch(url)

        
        if(!response.ok) throw new Error("requisição falhou");
        const dados = await response.json()

        return dados
        
    } catch (error) {
        alert("não consegui pegar nada")
        return [] 
    }
}

async function inicializar() {
    const dados = await buscarDadosApi();
    
    criarCards(dados);      
    ativarPesquisa(dados);  
    
    moverCarrossel();
    dropdown();
}


inicializar();