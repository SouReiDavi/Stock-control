// URL da API
const API = 'http://localhost:3000';

// Dados de exemplo (caso não tenha backend)
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

// Cidades por região
const cidadesPorRegiao = {
    'Norte': ['Manaus', 'Belém', 'Porto Velho', 'Rio Branco', 'Macapá', 'Boa Vista'],
    'Nordeste': ['Salvador', 'Recife', 'Fortaleza', 'São Luís', 'Natal', 'João Pessoa', 'Maceió', 'Aracaju', 'Teresina'],
    'Centro-Oeste': ['Brasília', 'Goiânia', 'Cuiabá', 'Campo Grande'],
    'Sudeste': ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Vitória', 'Campinas'],
    'Sul': ['Porto Alegre', 'Curitiba', 'Florianópolis', 'Joinville']
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    carregarTabela();
    carregarTimeline();
    atualizarEstatisticas();
    atualizarResumoPeriodo();
    carregarFiltroCidades();
    
    // Configurar data atual no campo de data
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data-registro').value = hoje;
});

// ===== FUNÇÕES DA TABELA =====
function carregarTabela() {
    const tbody = document.getElementById('tabela-corpo');
    
    // Simular carregamento
    setTimeout(() => {
        tbody.innerHTML = '';
        
        registros.forEach(r => {
            const statusClass = `status-badge status-${r.status}`;
            let statusText = r.status === 'em_uso' ? 'Em Uso' : 
                            r.status === 'disponivel' ? 'Disponível' :
                            r.status === 'manutencao' ? 'Manutenção' : 'Reservado';
            
            tbody.innerHTML += `
                <tr>
                    <td>${formatarData(r.data)}</td>
                    <td>${r.patrimonio}</td>
                    <td>${r.modelo}</td>
                    <td>${r.regiao}</td>
                    <td>${r.cidade}</td>
                    <td>${r.local}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${r.usuario || '-'}</td>
                    <td>
                        <button class="btn-visualizar" onclick="visualizarRegistro(${r.id})" title="Visualizar">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button class="btn-editar" onclick="editarRegistro(${r.id})" title="Editar">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="btn-excluir" onclick="excluirRegistro(${r.id})" title="Excluir">
                            <span class="material-icons">delete</span>
                        </button>
                    </td>
                </tr>
            `;
        });
    }, 500);
}

// ===== FUNÇÕES DA TIMELINE =====
function carregarTimeline() {
    const timeline = document.getElementById('timeline');
    
    // Ordenar por data (mais recentes primeiro)
    const registrosOrdenados = [...registros].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 10);
    
    timeline.innerHTML = '';
    
    registrosOrdenados.forEach(r => {
        const statusColor = r.status === 'disponivel' ? '#28a745' :
                           r.status === 'em_uso' ? '#ffc107' :
                           r.status === 'manutencao' ? '#dc3545' : '#17a2b8';
        
        timeline.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-date">${formatarData(r.data)}</div>
                <div class="timeline-content">
                    <strong>${r.patrimonio}</strong> - ${r.modelo}<br>
                    <small>${r.cidade} - ${r.local}</small>
                </div>
                <span class="timeline-status" style="background: ${statusColor}20; color: ${statusColor};">
                    ${r.status}
                </span>
            </div>
        `;
    });
}

// ===== FUNÇÕES DE ESTATÍSTICAS =====
function atualizarEstatisticas() {
    document.getElementById('total-notebooks').textContent = registros.length;
    document.getElementById('disponiveis').textContent = registros.filter(r => r.status === 'disponivel').length;
    document.getElementById('em-uso').textContent = registros.filter(r => r.status === 'em_uso').length;
    document.getElementById('manutencao').textContent = registros.filter(r => r.status === 'manutencao').length;
}

function atualizarResumoPeriodo() {
    const hoje = new Date().toISOString().split('T')[0];
    const hojeRegistros = registros.filter(r => r.data === hoje).length;
    
    // Esta semana
    const hojeObj = new Date();
    const inicioSemana = new Date(hojeObj.setDate(hojeObj.getDate() - hojeObj.getDay()));
    const semanaRegistros = registros.filter(r => new Date(r.data) >= inicioSemana).length;
    
    // Este mês
    const mesAtual = new Date().getMonth();
    const mesRegistros = registros.filter(r => new Date(r.data).getMonth() === mesAtual).length;
    
    document.getElementById('registros-hoje').textContent = hojeRegistros;
    document.getElementById('registros-semana').textContent = semanaRegistros;
    document.getElementById('registros-mes').textContent = mesRegistros;
}

// ===== FUNÇÕES DO FILTRO DE CIDADES =====
function carregarFiltroCidades() {
    const selectCidade = document.getElementById('filtro-cidade');
    const todasCidades = [...new Set(registros.map(r => r.cidade))].sort();
    
    selectCidade.innerHTML = '<option value="">Todas as cidades</option>';
    todasCidades.forEach(cidade => {
        selectCidade.innerHTML += `<option value="${cidade}">${cidade}</option>`;
    });
}

// ===== FUNÇÕES DO MODAL =====
function abrirModalRegistro() {
    document.getElementById('modal-registro').style.display = 'block';
    document.getElementById('modal-titulo').textContent = 'Novo Registro de Notebook';
    document.getElementById('registro-id').value = '';
    document.getElementById('form-registro').reset();
    
    // Data atual
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data-registro').value = hoje;
}

function fecharModal() {
    document.getElementById('modal-registro').style.display = 'none';
}

function abrirModalVisualizar() {
    document.getElementById('modal-visualizar').style.display = 'block';
}

function fecharModalVisualizar() {
    document.getElementById('modal-visualizar').style.display = 'none';
}

// ===== FUNÇÕES DO FORMULÁRIO =====
document.getElementById('regiao').addEventListener('change', function() {
    const regiao = this.value;
    const selectCidade = document.getElementById('cidade');
    
    selectCidade.innerHTML = '<option value="">Selecione...</option>';
    
    if (regiao && cidadesPorRegiao[regiao]) {
        cidadesPorRegiao[regiao].forEach(cidade => {
            selectCidade.innerHTML += `<option value="${cidade}">${cidade}</option>`;
        });
    }
});

function salvarRegistro() {
    const id = document.getElementById('registro-id').value;
    
    const novoRegistro = {
        id: id ? parseInt(id) : registros.length + 1,
        data: document.getElementById('data-registro').value,
        patrimonio: document.getElementById('patrimonio').value,
        modelo: document.getElementById('modelo').value,
        processador: document.getElementById('processador').value,
        memoria: document.getElementById('memoria').value,
        armazenamento: document.getElementById('armazenamento').value,
        usuario: document.getElementById('usuario').value,
        regiao: document.getElementById('regiao').value,
        cidade: document.getElementById('cidade').value,
        local: document.getElementById('local').value,
        status: document.getElementById('status').value,
        observacoes: document.getElementById('observacoes').value
    };
    
    if (id) {
        // Editar
        const index = registros.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            registros[index] = novoRegistro;
        }
    } else {
        // Novo
        registros.push(novoRegistro);
    }
    
    fecharModal();
    carregarTabela();
    carregarTimeline();
    atualizarEstatisticas();
    atualizarResumoPeriodo();
    carregarFiltroCidades();
}

function editarRegistro(id) {
    const registro = registros.find(r => r.id === id);
    
    if (registro) {
        abrirModalRegistro();
        document.getElementById('modal-titulo').textContent = 'Editar Registro de Notebook';
        document.getElementById('registro-id').value = registro.id;
        document.getElementById('data-registro').value = registro.data;
        document.getElementById('patrimonio').value = registro.patrimonio;
        document.getElementById('modelo').value = registro.modelo;
        document.getElementById('processador').value = registro.processador || '';
        document.getElementById('memoria').value = registro.memoria || '';
        document.getElementById('armazenamento').value = registro.armazenamento || '';
        document.getElementById('usuario').value = registro.usuario || '';
        document.getElementById('regiao').value = registro.regiao;
        
        // Disparar evento de mudança na região para carregar cidades
        const event = new Event('change');
        document.getElementById('regiao').dispatchEvent(event);
        
        setTimeout(() => {
            document.getElementById('cidade').value = registro.cidade;
        }, 100);
        
        document.getElementById('local').value = registro.local;
        document.getElementById('status').value = registro.status;
        document.getElementById('observacoes').value = registro.observacoes || '';
    }
}

function visualizarRegistro(id) {
    const registro = registros.find(r => r.id === id);
    
    if (registro) {
        const detalhesDiv = document.getElementById('detalhes-notebook');
        
        detalhesDiv.innerHTML = `
            <div class="detalhe-item">
                <span class="material-icons">qr_code_scanner</span>
                <span class="detalhe-label">Patrimônio:</span>
                <span class="detalhe-value">${registro.patrimonio}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">computer</span>
                <span class="detalhe-label">Modelo:</span>
                <span class="detalhe-value">${registro.modelo}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">memory</span>
                <span class="detalhe-label">Processador:</span>
                <span class="detalhe-value">${registro.processador || 'N/A'}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">storage</span>
                <span class="detalhe-label">Memória:</span>
                <span class="detalhe-value">${registro.memoria || 'N/A'}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">save</span>
                <span class="detalhe-label">Armazenamento:</span>
                <span class="detalhe-value">${registro.armazenamento || 'N/A'}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">public</span>
                <span class="detalhe-label">Região:</span>
                <span class="detalhe-value">${registro.regiao}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">location_city</span>
                <span class="detalhe-label">Cidade:</span>
                <span class="detalhe-value">${registro.cidade}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">business</span>
                <span class="detalhe-label">Local:</span>
                <span class="detalhe-value">${registro.local}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">person</span>
                <span class="detalhe-label">Usuário:</span>
                <span class="detalhe-value">${registro.usuario || 'Não alocado'}</span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">info</span>
                <span class="detalhe-label">Status:</span>
                <span class="detalhe-value"><span class="status-badge status-${registro.status}">${registro.status}</span></span>
            </div>
            <div class="detalhe-item">
                <span class="material-icons">event</span>
                <span class="detalhe-label">Data:</span>
                <span class="detalhe-value">${formatarData(registro.data)}</span>
            </div>
            ${registro.observacoes ? `
            <div class="detalhe-item">
                <span class="material-icons">notes</span>
                <span class="detalhe-label">Obs:</span>
                <span class="detalhe-value">${registro.observacoes}</span>
            </div>
            ` : ''}
        `;
        
        abrirModalVisualizar();
    }
}

function excluirRegistro(id) {
    if (confirm('Tem certeza que deseja excluir este registro?')) {
        registros = registros.filter(r => r.id !== id);
        carregarTabela();
        carregarTimeline();
        atualizarEstatisticas();
        atualizarResumoPeriodo();
        carregarFiltroCidades();
    }
}

// ===== FUNÇÕES DE FILTRO =====
function aplicarFiltros() {
    const regiao = document.getElementById('filtro-regiao').value;
    const cidade = document.getElementById('filtro-cidade').value;
    const dataInicial = document.getElementById('data-inicial').value;
    const dataFinal = document.getElementById('data-final').value;
    const busca = document.getElementById('busca-notebook').value.toLowerCase();
    
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '<tr><td colspan="9" class="loading-row"><span class="material-icons">hourglass_empty</span><br>Filtrando...</td></tr>';
    
    setTimeout(() => {
        let filtrados = registros.filter(r => {
            let match = true;
            
            if (regiao && r.regiao !== regiao) match = false;
            if (cidade && r.cidade !== cidade) match = false;
            if (dataInicial && r.data < dataInicial) match = false;
            if (dataFinal && r.data > dataFinal) match = false;
            if (busca) {
                const buscaStr = `${r.patrimonio} ${r.modelo} ${r.cidade}`.toLowerCase();
                if (!buscaStr.includes(busca)) match = false;
            }
            
            return match;
        });
        
        tbody.innerHTML = '';
        
        if (filtrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="loading-row">Nenhum registro encontrado</td></tr>';
            return;
        }
        
        filtrados.forEach(r => {
            const statusClass = `status-badge status-${r.status}`;
            let statusText = r.status === 'em_uso' ? 'Em Uso' : 
                            r.status === 'disponivel' ? 'Disponível' :
                            r.status === 'manutencao' ? 'Manutenção' : 'Reservado';
            
            tbody.innerHTML += `
                <tr>
                    <td>${formatarData(r.data)}</td>
                    <td>${r.patrimonio}</td>
                    <td>${r.modelo}</td>
                    <td>${r.regiao}</td>
                    <td>${r.cidade}</td>
                    <td>${r.local}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${r.usuario || '-'}</td>
                    <td>
                        <button class="btn-visualizar" onclick="visualizarRegistro(${r.id})">
                            <span class="material-icons">visibility</span>
                        </button>
                        <button class="btn-editar" onclick="editarRegistro(${r.id})">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="btn-excluir" onclick="excluirRegistro(${r.id})">
                            <span class="material-icons">delete</span>
                        </button>
                    </td>
                </tr>
            `;
        });
    }, 500);
}

function limparFiltros() {
    document.getElementById('filtro-regiao').value = '';
    document.getElementById('filtro-cidade').value = '';
    document.getElementById('data-inicial').value = '';
    document.getElementById('data-final').value = '';
    document.getElementById('busca-notebook').value = '';
    carregarTabela();
}

// ===== FUNÇÕES UTILITÁRIAS =====
function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Fechar modais com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharModal();
        fecharModalVisualizar();
    }
});

// Fechar modal clic

// Página administrativa para convidar usuários
async function convidarUsuario(email) {
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email)
  
  if (error) throw error
  return data
}

// Criar usuário padrão
const emailPadrao = "davidavilucas38@gmail.com"
const senhaPadrao = "Ferrariluxodevderdade@"