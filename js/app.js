'use strict'
import { criarCards } from "./card.js";
import { moverCarrossel } from "./carrossel.js";
import { dropdown } from "./dropdown.js";
import { ativarPesquisa } from "./pesquisa.js";

export async function buscarDadosApi(){
    try {
        const url = `http://localhost:8080/v1/planetaverde/admin/categoria`
        const response = await fetch(url)

        if(!response.ok) throw new Error("requisição falhou");
        const dados = await response.json()

        const categorias = dados.response && dados.response.categoria;

        if (!Array.isArray(categorias)) return [];

        const produtos = [];
        for (const categoria of categorias) {
            if (categoria.produtos && categoria.produtos.length > 0) {
                for (const produto of categoria.produtos) {
                    produtos.push({
                        ...produto,
                        categoria: categoria.nome
                    });
                }
            }
        }

        return produtos;

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