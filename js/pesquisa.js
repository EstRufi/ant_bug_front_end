'use strict';

export function ativarPesquisa(dados) {
    const input = document.querySelector('input[type="text"]') || document.querySelector('input[placeholder*="Pesquise"]');
    
    if (!input) return;

    input.addEventListener('input', () => {
        const digitado = input.value.toLowerCase().trim();

        //saiba mais
        const cardsDeBaixo = Array.from(document.querySelectorAll('div, section')).filter(el => {
            return el.innerHTML.includes('Saiba Mais') && el.querySelector('img');
        });

        //mostra todos os card se não tiver nada escrito
        if (digitado === "") {
            cardsDeBaixo.forEach(card => card.style.display = "");
            return;
        }

        //Filtra
        cardsDeBaixo.forEach(card => {
            const textoDoCard = card.textContent.toLowerCase();

            if (textoDoCard.includes(digitado)) {
                card.style.display = ""; //aparece
            } else {
                card.style.display = "none"; //esconde
            }
        });
    });
}