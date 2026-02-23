// Função para carregar os contatos do localStorage
function carregarContatos() {
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    exibirContatos(contatos);
    document.getElementById('total-contatos').textContent = contatos.length;
}

// Função para exibir os contatos na tabela
function exibirContatos(contatos) {
    const tabela = document.getElementById('contatos-table').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os contatos

    contatos.forEach((contato, index) => {
        const linha = tabela.insertRow();
        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.telefone}</td>
            <td>
                <button onclick="alterarContato(${index})">Alterar</button>
                <button onclick="excluirContato(${index})">Excluir</button>
            </td>
        `;
    });
}

// Função para cadastrar um novo contato
function cadastrarContato() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    if (!nome || !email || !telefone) {
        alert('Preencha todos os campos!');
        return;
    }

    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    contatos.push({ nome, email, telefone });
    localStorage.setItem('contatos', JSON.stringify(contatos));

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';

    carregarContatos();
}

// Função para excluir um contato
function excluirContato(index) {
    let contatos = JSON.parse(localStorage.getItem('contatos'));
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));
    carregarContatos();
}

// Função para alterar um contato
function alterarContato(index) {
    let contatos = JSON.parse(localStorage.getItem('contatos'));
    const contato = contatos[index];

    document.getElementById('nome').value = contato.nome;
    document.getElementById('email').value = contato.email;
    document.getElementById('telefone').value = contato.telefone;

    // Remove o contato atual antes de editar
    contatos.splice(index, 1);
    localStorage.setItem('contatos', JSON.stringify(contatos));

    carregarContatos();
}

// Função para filtrar contatos
function filtrarContatos() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    let contatosFiltrados = contatos.filter(contato =>
        contato.nome.toLowerCase().includes(filtro)
    );
    exibirContatos(contatosFiltrados);
}

// Carregar contatos ao iniciar a página
window.onload = carregarContatos;