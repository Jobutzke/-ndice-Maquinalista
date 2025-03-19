function atualizarAno() {
    const modelo = document.getElementById("modelo").value;
    const anoSelect = document.getElementById("ano");
    anoSelect.innerHTML = "";
    
    let anoInicial, anoFinal;

    switch (modelo) {
        case "320C":
        case "320CL":
            anoInicial = 2000;
            anoFinal = 2010;
            break;
        case "320D":
        case "320D2":
        case "320D2L":
            anoInicial = 2011;
            anoFinal = 2018;
            break;
        case "320Atual":
        case "320GC":
            anoInicial = 2018;
            anoFinal = 2024;
            break;
        default:
            return;
    }

    for (let ano = anoInicial; ano <= anoFinal; ano++) {
        const option = document.createElement("option");
        option.value = ano;
        option.text = ano;
        anoSelect.add(option);
    }
}

function calcularValor() {
    const anoSelecionado = parseInt(document.getElementById("ano").value);
    const horasTrabalhadasText = document.getElementById("horas").value.replace(/\D/g, '');
    const horasTrabalhadas = parseInt(horasTrabalhadasText) || 0;
    const precoBase = 875000.00;
    let precoCalculado = precoBase;

    const anoAtual = 2025;
    const horasAnuais = 2000;

    let depreciacaoAnual = [
        { ano: 2024, taxa: 0.10 },
        { ano: 2023, taxa: 0.10 },
        { ano: 2022, taxa: 0.09 },
        { ano: 2021, taxa: 0.09 },
        { ano: 2020, taxa: 0.08 },
        { ano: 2019, taxa: 0.08 },
        { ano: 2018, taxa: 0.07 },
        { ano: 2017, taxa: 0.07 },
        { ano: 2016, taxa: 0.06 },
        { ano: 2015, taxa: 0.06 },
        { ano: 2014, taxa: 0.05 },
        { ano: 2013, taxa: 0.05 },
        { ano: 2012, taxa: 0.04 },
        { ano: 2011, taxa: 0.04 },
        { ano: 2010, taxa: 0.04 },
        { ano: 2009, taxa: 0.04 },
        { ano: 2008, taxa: 0.04 },
        { ano: 2007, taxa: 0.04 },
        { ano: 2006, taxa: 0.04 },
        { ano: 2005, taxa: 0.04 },
        { ano: 2004, taxa: 0.04 },
        { ano: 2003, taxa: 0.04 },
        { ano: 2002, taxa: 0.04 },
        { ano: 2001, taxa: 0.04 },
        { ano: 2000, taxa: 0.04 }
    ];

    for (let i = anoAtual - 1; i >= anoSelecionado; i--) {
        const depreciacao = depreciacaoAnual.find(dep => dep.ano === i);
        if (depreciacao) {
            precoCalculado -= precoCalculado * depreciacao.taxa;
        }
    }

    const anosUtilizados = anoAtual - anoSelecionado;
    const horasTotalEsperado = anosUtilizados * horasAnuais;
    const diferencaHoras = horasTrabalhadas - horasTotalEsperado;

    if (diferencaHoras > 0) {
        precoCalculado -= diferencaHoras * 20;
    } else {
        precoCalculado += Math.abs(diferencaHoras) * 3;
    }

    // Garante que o preço calculado não seja menor que R$ 100.000,00
    precoCalculado = Math.max(precoCalculado, 100000);

    document.getElementById("valorResultado").innerText = `Valor Calculado: ${formatarMoeda(precoCalculado)}`;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarHoras(input) {
    let valor = input.value.replace(/\D/g, "");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = valor;
}