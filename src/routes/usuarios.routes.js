const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_usuario, cargo_id, nome, email, telefone, ativo, created_at FROM usuario');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id_usuario, cargo_id, nome, email, telefone, ativo, created_at FROM usuario WHERE id_usuario = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuário não encontrado.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_usuario, cargo_id, nome, email, senha_hash, telefone, ativo } = req.body;
    const query = 'INSERT INTO usuario (id_usuario, cargo_id, nome, email, senha_hash, telefone, ativo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_usuario, cargo_id, nome, email, senha_hash, telefone, ativo ?? true]);
    return res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { cargo_id, nome, email, telefone, ativo } = req.body;
    const query = 'UPDATE usuario SET cargo_id = ?, nome = ?, email = ?, telefone = ?, ativo = ? WHERE id_usuario = ?';
    await pool.query(query, [cargo_id, nome, email, telefone, ativo, id]);
    return res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;