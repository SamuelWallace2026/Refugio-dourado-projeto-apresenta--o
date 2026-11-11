const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tarefa_governanca');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM tarefa_governanca WHERE id_tarefa = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Tarefa de governança não encontrada.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_tarefa, quarto_id, tipo, observacao, status, urgente, usuario_id } = req.body;
    const query = 'INSERT INTO tarefa_governanca (id_tarefa, quarto_id, tipo, observacao, status, urgente, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_tarefa, quarto_id, tipo, observacao, status || 'Sujo', urgente || false, usuario_id]);
    return res.status(201).json({ message: 'Tarefa de governança criada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quarto_id, tipo, observacao, status, urgente, usuario_id } = req.body;
    const query = 'UPDATE tarefa_governanca SET quarto_id = ?, tipo = ?, observacao = ?, status = ?, urgente = ?, usuario_id = ? WHERE id_tarefa = ?';
    await pool.query(query, [quarto_id, tipo, observacao, status, urgente, usuario_id, id]);
    return res.json({ message: 'Tarefa de governança atualizada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tarefa_governanca WHERE id_tarefa = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;