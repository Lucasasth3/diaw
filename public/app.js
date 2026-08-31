const API_URL = '/produtos';

const form = document.getElementById('product-form');
const productIdInput = document.getElementById('product-id');
const descricaoInput = document.getElementById('descricao');
const precoInput = document.getElementById('preco');
const categoriaInput = document.getElementById('categoria');
const estoqueInput = document.getElementById('estoque');
const productList = document.getElementById('product-list');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');


document.addEventListener('DOMContentLoaded', carregarProdutos);

async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        const produtos = await response.json();
        
        productList.innerHTML = '';
        produtos.forEach(produto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.descricao}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.categoria}</td>
                <td>${produto.estoque}</td>
                <td>
                    <button class="edit" onclick="prepararEdicao(${produto.id}, '${produto.descricao}', ${produto.preco}, '${produto.categoria}', ${produto.estoque})">Editar</button>
                    <button class="delete" onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
            productList.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = productIdInput.value;
    const produto = {
        descricao: descricaoInput.value,
        preco: parseFloat(precoInput.value),
        categoria: categoriaInput.value,
        estoque: parseInt(estoqueInput.value)
    };

    if (id) {
        
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
    } else {
        
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });
    }

    limparFormulario();
    carregarProdutos();
});

async function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        carregarProdutos();
    }
}

function prepararEdicao(id, descricao, preco, categoria, estoque) {
    productIdInput.value = id;
    descricaoInput.value = descricao;
    precoInput.value = preco;
    categoriaInput.value = categoria;
    estoqueInput.value = estoque;

    btnSalvar.textContent = 'Salvar Alterações';
    btnCancelar.style.display = 'inline-block';
}

btnCancelar.addEventListener('click', () => {
    limparFormulario();
});

function limparFormulario() {
    productIdInput.value = '';
    form.reset();
    btnSalvar.textContent = 'Cadastrar Produto';
    btnCancelar.style.display = 'none';
}