function atualizarModelos() {
    const marca = document.getElementById("marca").value;
    const modeloSelect = document.getElementById("modelo");
    modeloSelect.innerHTML = "";

    let modelos = [];

    switch (marca) {
        case "Caterpillar":
            modelos = ["320C", "320CL", "320D", "320D2", "320D2L", "320GC", "320Atual"];
            break;
        case "Komatsu":
            modelos = ["PC210"];
            break;
        case "Volvo":
            modelos = ["EC210"];
            break;
        case "John Deere":
            modelos = ["210"];
            break;
    }

    modelos.forEach(function(modelo) {
        const option = document.createElement("option");
        option.value = modelo;
        option.text = modelo;
        modeloSelect.add(option);
    });

    atualizarAno();
}

function atualizarAno() {
    const modelo = document.getElementById("modelo").value;
    const anoSelect = document.getElementById("ano");
    anoSelect.innerHTML = "";

    let anoInicial, anoFinal;

    if (modelo.startsWith("320") || modelo === "PC210" || modelo === "EC210" || modelo === "210") {
        yearOptions = {
            "320C": [2000, 2010],
            "320CL": [2000, 2010],
            "320D": [2011, 2018],
            "320D2": [2011, 2018],
            "320D2L": [2011, 2018],
            "320Atual": [2018, 2024],
            "320GC": [2018, 2024],
            "PC210": [2015, 2025],
            "EC210": [2015, 2025],
            "210": [2015, 2025]
        };

        [anoInicial, anoFinal] = yearOptions[modelo] || [2020, 2025];

        for (let ano = anoInicial; ano <= anoFinal; ano++) {
            const option = document.createElement("option");
            option.value = ano;
            option.text = ano;
            anoSelect.add(option);
        }
    }
}

function calcularValor() {
    const marca = document.getElementById("marca").value;
    const anoSelecionado = parseInt(document.getElementById("ano").value);
    const horasTrabalhadasText = document.getElementById("horas").value.replace(/\D/g, '');
    const horasTrabalhadas = parseInt(horasTrabalhadasText) || 0;

    const precosBase = {
        "Caterpillar": 875000.00,
        "Komatsu": 860000.00,
        "Volvo": 865000.00,
        "John Deere": 890000.00
    };

    let precoCalculado = precosBase[marca];

    const anoAtual = 2025;
    const horasAnuais = 2000;

    let depreciacaoAnual = {
        2024: 0.10,
        2023: 0.10,
        2022: 0.09,
        2021: 0.09,
        2020: 0.08,
        2019: 0.08,
        2018: 0.07,
        2017: 0.07,
        2016: 0.06,
        2015: 0.06,
        2014: 0.05,
        2013: 0.05,
        2012: 0.04,
        2011: 0.04,
        2010: 0.04,
        2009: 0.04,
        2008: 0.04,
        2007: 0.04,
        2006: 0.04,
        2005: 0.04,
        2004: 0.04,
        2003: 0.04,
        2002: 0.04,
        2001: 0.04,
        2000: 0.04
    };

    for (let i = anoAtual - 1; i >= anoSelecionado; i--) {
        if (depreciacaoAnual[i] != undefined) {
            precoCalculado -= precoCalculado * depreciacaoAnual[i];
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

    // Descontos adicionais para marcas específicas
    if (marca === "Volvo" || marca === "Komatsu") {
        precoCalculado *= 0.98;
    } else if (marca === "John Deere") {
        precoCalculado *= 0.97;
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
