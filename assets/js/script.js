// Função para limpar a planilha
function limparPlanilha() {
    document.getElementById('planilha').innerHTML = '<tr><th>Data</th><th>Dia</th><th>Banca</th><th>Meta Diária</th></tr>';
}

// Função para atualizar a planilha com base na banca e meta
function atualizarPlanilha(bancaInicial, tipoMeta, meta) {
    const dataInicio = new Date(document.getElementById('data-inicio').value);
    const dataFim = new Date(document.getElementById('data-fim').value);

    let diasPassados = 1;
    let bancaAtual = bancaInicial;

    while (dataInicio <= dataFim) {
        const metaDiaria = tipoMeta === 'percent' ? (bancaAtual * meta) / 100 : meta;
        const formattedDate = dataInicio.toLocaleDateString('pt-BR'); // Formata a data em DD/MM/AA
        const formattedBanca = bancaAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const formattedMetaDiaria = metaDiaria.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const row = `<tr>
                        <td>${formattedDate}</td>
                        <td>${diasPassados}</td>
                        <td class='bank'>${formattedBanca}</td>
                        <td class='objective'>${formattedMetaDiaria}</td>
                     </tr>`;
        document.getElementById('planilha').insertAdjacentHTML('beforeend', row);
        
        diasPassados++;
        dataInicio.setDate(dataInicio.getDate() + 1);
        bancaAtual += metaDiaria;
    }
}

// Evento para atualizar a planilha quando o botão "Atualizar" for clicado
document.getElementById('atualizar-banca').addEventListener('click', function() {
    const bancaInicial = parseFloat(document.getElementById('banca-inicial').value);
    const tipoMeta = document.getElementById('tipo-meta').value;
    const meta = parseFloat(document.getElementById('meta').value);
    limparPlanilha(); // Limpa a planilha anterior
    atualizarPlanilha(bancaInicial, tipoMeta, meta);
});

// Evento para gerar a planilha quando o botão "Gerar Planilha" for clicado
document.getElementById('gerar-planilha').addEventListener('click', function() {
    const bancaInicial = parseFloat(document.getElementById('banca-inicial').value);
    const tipoMeta = document.getElementById('tipo-meta').value;
    const meta = parseFloat(document.getElementById('meta').value);
    limparPlanilha(); // Limpa a planilha anterior
    atualizarPlanilha(bancaInicial, tipoMeta, meta);
});