'use strict'

async function buscarSubcategorias() {
    try {
        const url = 'http://localhost:8080/v1/planetaverde/admin/subcategoria'
        const response = await fetch(url)

        if (!response.ok) throw new Error('Erro ao buscar subcategorias.')

        const dados = await response.json()
        return dados.response && dados.response.subcategoria
            ? dados.response.subcategoria
            : []

    } catch (error) {
        console.error('Erro ao buscar subcategorias:', error)
        return []
    }
}

export async function dropdown() {
    const subcategorias = await buscarSubcategorias()

    const porCategoria = {}
    for (const sub of subcategorias) {
        const nomeCategoria = Array.isArray(sub.categoria)
            ? sub.categoria[0]?.nome
            : sub.categoria
        porCategoria[nomeCategoria].push(sub.nome)
    }
    const dropdowns = document.querySelectorAll('.dropdown')

    dropdowns.forEach(dropdownEl => {
        const botao = dropdownEl.querySelector('.bnt-categoria')
        const conteudo = dropdownEl.querySelector('.dropdown_content')

        if (!botao || !conteudo) return

        const nomeCategoriaBotao = botao.textContent.trim()
        const listaSubs = porCategoria[nomeCategoriaBotao] || []

        conteudo.innerHTML = listaSubs.length > 0
            ? listaSubs.map(nome => `<a href="#">${nome}</a>`).join('')
            : '<a href="#">Nenhuma subcategoria</a>'
    })

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('bnt-categoria')) {
            event.target.nextElementSibling.classList.toggle('mostrar')
        }
    })
}