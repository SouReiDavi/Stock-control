const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Banco de dados em memória
let registros = [
    {
        id: 1,
        data: '2024-03-15',
        patrimonio: 'NT001',
        modelo: 'Dell Inspiron 15',
        processador: 'Intel Core i7',
        memoria: '16GB',
        armazenamento: '512GB SSD',
        usuario: 'João Silva',
        regiao: 'Sudeste',
        cidade: 'São Paulo',
        local: 'TI',
        status: 'disponivel',
        observacoes: 'Notebook novo'
    },
    {
        id: 2,
        data: '2024-03-14',
        patrimonio: 'NT002',
        modelo: 'Lenovo ThinkPad',
        processador: 'Intel Core i5',
        memoria: '8GB',
        armazenamento: '256GB SSD',
        usuario: 'Maria Santos',
        regiao: 'Sul',
        cidade: 'Porto Alegre',
        local: 'Vendas',
        status: 'em_uso',
        observacoes: 'Em uso pelo setor de vendas'
    },
    {
        id: 3,
        data: '2024-03-13',
        patrimonio: 'NT003',
        modelo: 'HP EliteBook',
        processador: 'Intel Core i7',
        memoria: '32GB',
        armazenamento: '1TB SSD',
        usuario: '',
        regiao: 'Nordeste',
        cidade: 'Salvador',
        local: 'RH',
        status: 'manutencao',
        observacoes: 'Em manutenção - troca de teclado'
    }
];

// Rotas

// GET - Listar todos registros
app.get('/api/registros', (req, res) => {
    res.json(registros);
});

// GET - Buscar registro por ID
app.get('/api/registros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const registro = registros.find(r => r.id === id);
    
    if (registro) {
        res.json(registro);
    } else {
        res.status(404).json({ erro: 'Registro não encontrado' });
    }
});

// POST - Criar novo registro
app.post('/api/registros', (req, res) => {
    const novoRegistro = {
        id: registros.length > 0 ? Math.max(...registros.map(r => r.id)) + 1 : 1,
        ...req.body
    };
    
    registros.push(novoRegistro);
    res.status(201).json(novoRegistro);
});

// PUT - Atualizar registro
app.put('/api/registros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = registros.findIndex(r => r.id === id);
    
    if (index !== -1) {
        registros[index] = { ...registros[index], ...req.body, id: id };
        res.json(registros[index]);
    } else {
        res.status(404).json({ erro: 'Registro não encontrado' });
    }
});

// DELETE - Remover registro
app.delete('/api/registros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = registros.findIndex(r => r.id === id);
    
    if (index !== -1) {
        registros.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ erro: 'Registro não encontrado' });
    }
});

// GET - Estatísticas
app.get('/api/estatisticas', (req, res) => {
    const total = registros.length;
    const disponiveis = registros.filter(r => r.status === 'disponivel').length;
    const emUso = registros.filter(r => r.status === 'em_uso').length;
    const manutencao = registros.filter(r => r.status === 'manutencao').length;
    
    res.json({
        total,
        disponiveis,
        emUso,
        manutencao
    });
});

// GET - Registros por região
app.get('/api/registros/regiao/:regiao', (req, res) => {
    const regiao = req.params.regiao;
    const filtrados = registros.filter(r => r.regiao === regiao);
    res.json(filtrados);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 API disponível em http://localhost:${PORT}/api/registros`);
});