const procurar = document.getElementById("procurarProduto")
const listaProdutos = document.getElementById("listaProdutos")
const adicionar = document.getElementById("adicionar")
const listaCarrinho = document.getElementById("listaCarrinho")
const remover = document.getElementById("remover")

const carrinho = []

const produtos = [
    ["Maionese", 8.99, 50],
    ["Café", 18.99, 30],
    ["Açúcar", 3.99, 60],
    ["Molho de Tomate", 1.99, 90],
    ["Azeite", 36.99, 100]
]

let produtoSelecionado

procurar.addEventListener("click", (e) => {
    e.preventDefault()

    const produtoInput = document.getElementById("produto").value
    
    let produtoEncontrado = produtos.find((item) => 
        item[0].toLowerCase() === produtoInput.toLowerCase() 
    )

    if (produtoEncontrado) {
        produtoSelecionado = produtoEncontrado
        exibirLista(produtoEncontrado)
    } else {
        listaProdutos.innerHTML = "<p>Produto não encontrado.</p>"
        produtoSelecionado = null
    }
})

function exibirLista(produto) {
    listaProdutos.innerHTML = `
        <p><strong>Produto:</strong> ${produto[0]}</p>
        <p><strong>Preço:</strong> R$${produto[1]}</p>
        <p><strong>Estoque:</strong> ${produto[2]} unidades</p>
    `;
}

adicionar.addEventListener("click", (e)=>{
    e.preventDefault()

    if(produtoSelecionado) {
        carrinho.push(produtoSelecionado)
        exibirCarrinho()
    } else {
        listaCarrinho.innerHTML = "<p>Nenhum produto selecionado para adicionar.</P>"
    }
})

remover.addEventListener("click", (e) => {
    e.preventDefault()

    const produtoRemovido = document.getElementById("produtoRemovido").value

    const index = carrinho.findIndex((item) =>
        item[0].toLowerCase() === produtoRemovido.toLowerCase()
    )

    if (index !== -1) {
        carrinho.splice(index, 1)
        exibirCarrinho()
    } else {
        listaCarrinho.innerHTML += "<p>Produto não encontrado no carrinho.</p>"
    }
})

function ordenarCarrinho() {
    carrinho.sort((a, b) => a[1] - b[1])
}

function exibirCarrinho() {
    ordenarCarrinho()
    
    listaCarrinho.innerHTML = "<h3>Carrinho de Compras</h3>"

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML += "<p>O carrinho está vazio.</p>"
    } else {
        let total = 0

        carrinho.forEach((produto, index) => {
            listaCarrinho.innerHTML += `
                <p><strong>${index + 1}.</strong> ${produto[0]} - R$${produto[1].toFixed(2)}</p>
            `
            total += produto[1];
        })

        listaCarrinho.innerHTML += `<p><strong>Total:</strong> R$${total.toFixed(2)}</p>`
    }
}