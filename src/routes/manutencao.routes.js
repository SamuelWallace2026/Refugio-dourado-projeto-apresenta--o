const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM chamado_manutencao');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM chamado_manutencao WHERE id_chamado = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Chamado de manutenção não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_chamado, quarto_id, descricao, prioridade, status, hospede_id, usuario_id } = req.body;
    const query = 'INSERT INTO chamado_manutencao (id_chamado, quarto_id, descricao, prioridade, status, hospede_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_chamado, quarto_id, descricao, prioridade || 'Média', status || 'Pendente', hospede_id, usuario_id]);
    return res.status(201).json({ message: 'Chamado de manutenção criado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quarto_id, descricao, prioridade, status, hospede_id, usuario_id } = req.body;
    const query = 'UPDATE chamado_manutencao SET quarto_id = ?, descricao = ?, prioridade = ?, status = ?, hospede_id = ?, usuario_id = ? WHERE id_chamado = ?';
    await pool.query(query, [quarto_id, descricao, prioridade, status, hospede_id, usuario_id, id]);
    return res.json({ message: 'Chamado de manutenção atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM chamado_manutencao WHERE id_chamado = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;