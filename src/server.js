const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const hospedesRoutes = require('./routes/hospedes.routes');
const quartosRoutes = require('./routes/quartos.routes');
const cargosRoutes = require('./routes/cargos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const reservasRoutes = require('./routes/reservas.routes');
const produtosRoutes = require('./routes/produtos.routes');
const consumoRoutes = require('./routes/consumo.routes');
const transacoesRoutes = require('./routes/transacoes.routes');
const mensagensRoutes = require('./routes/mensagens.routes');
const governancaRoutes = require('./routes/governanca.routes');
const manutencaoRoutes = require('./routes/manutencao.routes');

const app = express();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('🔗 Conectado ao MySQL com sucesso!');
    connection.release();
  } catch (error) {
    console.error('❌ Erro ao conectar ao MySQL:', error.message);
  }
})();

app.use('/api/hospedes', hospedesRoutes);
app.use('/api/quartos', quartosRoutes);
app.use('/api/cargos', cargosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/consumo', consumoRoutes);
app.use('/api/transacoes', transacoesRoutes);
app.use('/api/mensagens', mensagensRoutes);
app.use('/api/tarefas-governanca', governancaRoutes);
app.use('/api/chamados-manutencao', manutencaoRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});