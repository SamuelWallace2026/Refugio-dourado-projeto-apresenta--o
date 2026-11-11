const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM consumo');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM consumo WHERE id_consumo = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Consumo não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_consumo, reserva_id, produto_id, quantidade, subtotal, status } = req.body;
    const query = 'INSERT INTO consumo (id_consumo, reserva_id, produto_id, quantidade, subtotal, status) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_consumo, reserva_id, produto_id, quantidade, subtotal, status || 'SOLICITADO']);
    return res.status(201).json({ message: 'Consumo registrado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reserva_id, produto_id, quantidade, subtotal, status } = req.body;
    const query = 'UPDATE consumo SET reserva_id = ?, produto_id = ?, quantidade = ?, subtotal = ?, status = ? WHERE id_consumo = ?';
    await pool.query(query, [reserva_id, produto_id, quantidade, subtotal, status, id]);
    return res.json({ message: 'Consumo atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM consumo WHERE id_consumo = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;