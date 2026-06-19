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

    console.log('SUBCATEGORIAS:', subcategorias)

    const porCategoria = {}

    for (const sub of subcategorias) {

        console.log('SUB:', sub)

        const nomeCategoria = Array.isArray(sub.categoria)
            ? sub.categoria[0]?.nome
            : sub.categoria

        console.log('NOME CATEGORIA:', nomeCategoria)

        if (!nomeCategoria) {
            console.warn('Categoria inválida:', sub)
            continue
        }

        if (!porCategoria[nomeCategoria]) {
            porCategoria[nomeCategoria] = []
        }

        console.log('ARRAY ANTES DO PUSH:', porCategoria[nomeCategoria])

        porCategoria[nomeCategoria].push(sub.nome)
    }

    console.log('POR CATEGORIA:', porCategoria)

    const dropdowns = document.querySelectorAll('.dropdown')

    dropdowns.forEach(dropdownEl => {

        const botao = dropdownEl.querySelector('.bnt-categoria')
        const conteudo = dropdownEl.querySelector('.dropdown_content')

        if (!botao || !conteudo) return

        const nomeCategoriaBotao = botao.textContent.trim()

        console.log('BOTÃO:', nomeCategoriaBotao)

        const listaSubs = porCategoria[nomeCategoriaBotao] || []

        console.log('SUBCATEGORIAS DO BOTÃO:', listaSubs)

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