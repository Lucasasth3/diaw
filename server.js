const express = require ('express')
const app = express()

const produtos = [
{id: 1, descricao: "Banana Prata", preco: 8.99},
{id: 2, descricao: "Leite integral 1L", preco: 2.99},
{id: 3, descricao: "Paçoca", preco: 1.99}
]

app.get ('/produtos', (req, res) => {
res.json (produtos)
})
app.delete('/produtos/:id', (req, res) => {
const id = parseInt (req.params.id);

const index = produtos.findIndex (produto => produto.id ===id)

if (index != -1)[
produtos.slice(index, 1)
]
else[
res.status(404).json("Id não foi encontrado")
]

res.json (produtos)
})
app.listen (3000, (e) => {
console.log ('Servidor ouvindo em http://localhost:3000')
})