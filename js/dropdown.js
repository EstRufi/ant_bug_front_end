export function dropdown(){
    window.addEventListener("click", (event) => {
        
        // Verifica se o elemento clicado possui a classe do botão de categoria
        if (event.target.classList.contains("bnt-categoria")) {
            
            // Localiza o próximo elemento irmão (a caixinha do menu) e liga/desliga a classe "mostrar"
            event.target.nextElementSibling.classList.toggle("mostrar");
        } 
    });
}