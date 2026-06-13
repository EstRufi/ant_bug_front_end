'use strict'
import { moverCarrossel } from "./carrossel.js";
export async function buscarDadosApi(){
    try {
        const url = `https://api.tvmaze.com/shows`
        const response = await fetch(url)

        // O throw new Error é para utilizar o Erro 
        if(!response.ok) throw new Error("requisição falhou");
        const dados = await response.json()

        return dados
        
    } catch (error) {
        let alerta =alert("não consegui pegar nada")
        return alerta
    }
}

moverCarrossel()