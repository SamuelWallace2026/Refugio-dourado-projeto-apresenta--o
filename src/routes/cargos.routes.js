const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cargo');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM cargo WHERE id_cargo = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cargo não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_cargo, nome, descricao } = req.body;
    await pool.query('INSERT INTO cargo (id_cargo, nome, descricao) VALUES (?, ?, ?)', [id_cargo, nome, descricao]);
    return res.status(201).json({ message: 'Cargo criado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    await pool.query('UPDATE cargo SET nome = ?, descricao = ? WHERE id_cargo = ?', [nome, descricao, id]);
    return res.json({ message: 'Cargo atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cargo WHERE id_cargo = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;