const express = require('express');
const app = express();

app.use(express.json());

let produtos = [
    { id: 1, descricao: "Banana Prata", preco: 8.99, categoria: "Frutas", estoque: 10 },
    { id: 2, descricao: "Leite integral 1L", preco: 2.99, categoria: "Laticínios", estoque: 20 },
    { id: 3, descricao: "Paçoca", preco: 1.99, categoria: "Doces", estoque: 50 },
    { id: 4, descricao: "Arroz 5kg", preco: 25.90, categoria: "Grãos", estoque: 15 },
    { id: 5, descricao: "Feijão 1kg", preco: 7.50, categoria: "Grãos", estoque: 25 }
];

let proximoId = 6;

function validarProduto(body) {
    const erros = [];
    if (typeof body.descricao !== 'string' || body.descricao.trim() === '') {
        erros.push("descricao é obrigatória e deve ser uma string");
    }
    if (typeof body.preco !== 'number' || isNaN(body.preco)) {
        erros.push("preco é obrigatório e deve ser um número");
    }
    if (typeof body.categoria !== 'string' || body.categoria.trim() === '') {
        erros.push("categoria é obrigatória e deve ser uma string");
    }
    if (typeof body.estoque !== 'number' || !Number.isInteger(body.estoque)) {
        erros.push("estoque é obrigatório e deve ser um número inteiro");
    }
    return erros;
}

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.get('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
});

app.post('/produtos', (req, res) => {
    const erros = validarProduto(req.body);
    if (erros.length > 0) return res.status(400).json({ erros });

    const novoProduto = { id: proximoId++, ...req.body };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado" });

    const erros = validarProduto(req.body);
    if (erros.length > 0) return res.status(400).json({ erros });

    produtos[index] = { id, ...req.body };
    res.json(produtos[index]);
});

app.delete('/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ erro: "Id não encontrado" });
    produtos.splice(index, 1);
    res.status(204).send();
});

app.use((req,res, next) =>{
    const id = parseInt(req.params);
    next();
    res.status(204).send();
})

app.use ('/site', express.static('site'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ouvindo em http://localhost:${PORT}`);
});