const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hospede');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM hospede WHERE id_hospede = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Hóspede não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_hospede, nome, cpf, email, telefone, endereco } = req.body;
    const query = 'INSERT INTO hospede (id_hospede, nome, cpf, email, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_hospede, nome, cpf, email, telefone, endereco]);
    return res.status(201).json({ message: 'Hóspede cadastrado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, email, telefone, endereco } = req.body;
    const query = 'UPDATE hospede SET nome = ?, cpf = ?, email = ?, telefone = ?, endereco = ? WHERE id_hospede = ?';
    await pool.query(query, [nome, cpf, email, telefone, endereco, id]);
    return res.json({ message: 'Hóspede atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM hospede WHERE id_hospede = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;