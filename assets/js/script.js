function limparPlanilha() {
  document.getElementById('planilha').innerHTML = '<tr><th>Data</th><th>Dia</th><th>Banca</th><th>Meta Diária</th></tr>';
}

const getMonthName = monthNumber => `MÊS ${monthNumber}`;

function atualizarPlanilha(bancaInicial, tipoMeta, meta) {
  const dataInicio = new Date(document.getElementById('data-inicio').value);
  const dataFim = new Date(document.getElementById('data-fim').value);

  let diasPassados = 1;
  let mesesPassados = 2;
  let bancaAtual = bancaInicial;

  while (dataInicio <= dataFim) {
    const metaDiaria = tipoMeta === 'percent' ? (bancaAtual * meta) / 100 : meta;
    const formattedDate = dataInicio.toLocaleDateString('pt-BR');
    const formattedBanca = bancaAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formattedMetaDiaria = metaDiaria.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (diasPassados % 30 === 0) {
      const monthName = getMonthName(mesesPassados);
      const monthRow = `<tr><td colspan='4'><strong>${monthName}</strong></td></tr>`;
      document.getElementById('planilha').insertAdjacentHTML('beforeend', monthRow);
      mesesPassados++;
    }

    const row = `<tr><td>${formattedDate}</td><td>${diasPassados}</td><td class='bank'>${formattedBanca}</td><td class='objective'>${formattedMetaDiaria}</td></tr>`;
    document.getElementById('planilha').insertAdjacentHTML('beforeend', row);

    diasPassados++;
    dataInicio.setDate(dataInicio.getDate() + 1);
    bancaAtual += metaDiaria;
  }
}

function updatePlanilha() {
  const bancaInicial = parseFloat(document.getElementById('banca-inicial').value);
  const tipoMeta = document.getElementById('tipo-meta').value;
  const meta = parseFloat(document.getElementById('meta').value);
  limparPlanilha();
  atualizarPlanilha(bancaInicial, tipoMeta, meta);
}

document.getElementById('atualizar-banca').addEventListener('click', updatePlanilha);
document.getElementById('gerar-planilha').addEventListener('click', updatePlanilha);