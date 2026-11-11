const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM transacao');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM transacao WHERE id_transacao = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Transação não encontrada.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_transacao, reserva_id, tipo, valor, metodo_pagamento, descricao } = req.body;
    const query = 'INSERT INTO transacao (id_transacao, reserva_id, tipo, valor, metodo_pagamento, descricao) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_transacao, reserva_id, tipo, valor, metodo_pagamento, descricao]);
    return res.status(201).json({ message: 'Transação registrada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { reserva_id, tipo, valor, metodo_pagamento, descricao } = req.body;
    const query = 'UPDATE transacao SET reserva_id = ?, tipo = ?, valor = ?, metodo_pagamento = ?, descricao = ? WHERE id_transacao = ?';
    await pool.query(query, [reserva_id, tipo, valor, metodo_pagamento, descricao, id]);
    return res.json({ message: 'Transação atualizada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM transacao WHERE id_transacao = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;