const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM produto');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM produto WHERE id_produto = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Produto não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_produto, nome, preco, estoque, categoria } = req.body;
    const query = 'INSERT INTO produto (id_produto, nome, preco, estoque, categoria) VALUES (?, ?, ?, ?, ?)';
    await pool.query(query, [id_produto, nome, preco, estoque, categoria]);
    return res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, estoque, categoria } = req.body;
    const query = 'UPDATE produto SET nome = ?, preco = ?, estoque = ?, categoria = ? WHERE id_produto = ?';
    await pool.query(query, [nome, preco, estoque, categoria, id]);
    return res.json({ message: 'Produto atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM produto WHERE id_produto = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
