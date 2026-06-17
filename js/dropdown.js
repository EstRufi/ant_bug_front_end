

window.addEventListener("click", (event) => {
    
    if (event.target.classList.contains("bnt-categoria")) {
        
        event.target.nextElementSibling.classList.toggle("mostrar");
    } 
});


//event target é para ver o botão que voce acabou de clicar
//next element sibling localiza a qual a caixa especifica daquele botao
// toggle serve pra ligar e desligar a caixa/dropdown 