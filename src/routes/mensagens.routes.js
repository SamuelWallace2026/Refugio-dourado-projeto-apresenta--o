const { Router } = require('express');
const pool = require('../config/db');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mensagem');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM mensagem WHERE id_mensagem = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Mensagem não encontrada.' });
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { id_mensagem, hospede_id, remetente, conteudo, lida, resposta } = req.body;
    const query = 'INSERT INTO mensagem (id_mensagem, hospede_id, remetente, conteudo, lida, resposta) VALUES (?, ?, ?, ?, ?, ?)';
    await pool.query(query, [id_mensagem, hospede_id, remetente, conteudo, lida ?? false, resposta]);
    return res.status(201).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hospede_id, remetente, conteudo, lida, resposta } = req.body;
    const query = 'UPDATE mensagem SET hospede_id = ?, remetente = ?, conteudo = ?, lida = ?, resposta = ? WHERE id_mensagem = ?';
    await pool.query(query, [hospede_id, remetente, conteudo, lida, resposta, id]);
    return res.json({ message: 'Mensagem atualizada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM mensagem WHERE id_mensagem = ?', [id]);
    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;