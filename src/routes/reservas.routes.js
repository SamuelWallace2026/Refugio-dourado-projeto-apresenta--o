const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reserva');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM reserva WHERE id_reserva = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Reserva não encontrada.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_reserva, hospede_id, quarto_id, usuario_id, data_check_in, data_check_out, status, origem, observacoes } = req.body;
    const query = `INSERT INTO reserva (id_reserva, hospede_id, quarto_id, usuario_id, data_check_in, data_check_out, status, origem, observacoes) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(query, [id_reserva, hospede_id, quarto_id, usuario_id, data_check_in, data_check_out, status || 'CONFIRMADA', origem || 'Balcão', observacoes]);
    return res.status(201).json({ message: 'Reserva criada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hospede_id, quarto_id, usuario_id, data_check_in, data_check_out, status, origem, observacoes } = req.body;
    const query = `UPDATE reserva SET hospede_id = ?, quarto_id = ?, usuario_id = ?, data_check_in = ?, data_check_out = ?, status = ?, origem = ?, observacoes = ? WHERE id_reserva = ?`;
    await pool.query(query, [hospede_id, quarto_id, usuario_id, data_check_in, data_check_out, status, origem, observacoes, id]);
    return res.json({ message: 'Reserva atualizada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM reserva WHERE id_reserva = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;