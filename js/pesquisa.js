'use strict';

export function ativarPesquisa(dados) {
    const input = document.querySelector('input[type="text"]') || document.querySelector('input[placeholder*="Pesquise"]');
    
    // Se não encontrar o campo de input na tela, interrompe a função
    if (!input) return;

    input.addEventListener('input', () => {
        const digitado = input.value.toLowerCase().trim();

        // Captura todos os containers de cards gerados pelo seu card.js
        const cardsDeBaixo = document.querySelectorAll('.conteinerCards');

        // Se a barra de pesquisa for limpa, exibe todos os produtos de volta
        if (digitado === "") {
            cardsDeBaixo.forEach(card => card.style.display = "");
            return;
        }

        // Filtra os cards comparando o texto digitado com o conteúdo do card
        cardsDeBaixo.forEach(card => {
            const textoDoCard = card.textContent.toLowerCase();

            if (textoDoCard.includes(digitado)) {
                card.style.display = ""; // Mostra o card se encontrar o termo
            } else {
                card.style.display = "none"; // Esconde o card se não encontrar
            }
        });
    });
}