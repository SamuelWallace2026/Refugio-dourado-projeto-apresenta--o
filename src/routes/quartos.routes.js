const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM quarto');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM quarto WHERE id_quarto = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Quarto não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_quarto, numero, capacidade, valor_diaria, categoria, status } = req.body;
    const query = 'INSERT INTO quarto (id_quarto, numero, capacidade, valor_diaria, categoria, status) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_quarto, numero, capacidade, valor_diaria, categoria, status || 'LIVRE']);
    return res.status(201).json({ message: 'Quarto criado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, capacidade, valor_diaria, categoria, status } = req.body;
    const query = 'UPDATE quarto SET numero = ?, capacidade = ?, valor_diaria = ?, categoria = ?, status = ? WHERE id_quarto = ?';
    await pool.query(query, [numero, capacidade, valor_diaria, categoria, status, id]);
    return res.json({ message: 'Quarto atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM quarto WHERE id_quarto = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;