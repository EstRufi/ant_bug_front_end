'use strict'
import { criarCards } from "./card.js";
import { moverCarrossel } from "./carrossel.js";
import { dropdown } from "./dropdown.js";
import { ativarPesquisa } from "./pesquisa.js";

export async function buscarDadosApi(){
    try {
        const url = `http://localhost:7070/v1/planetaverde/admin/produto`
        const response = await fetch(url)
        
        if(!response.ok) throw new Error("requisição falhou");
        const dados = await response.json()

        const listaProdutos = dados.response && dados.response.produto;

        return Array.isArray(listaProdutos) ? listaProdutos : [];
        
    } catch (error) {
        console.error("Erro ao buscar dados da API local:", error);
        return [];
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