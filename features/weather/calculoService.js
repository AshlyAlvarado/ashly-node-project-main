const calcularResultados = (programacionData, weatherData) => {
  const metasPorMaterial = {
    Carbon: 500,
    Petcoke: 500,
    Fertilizante: 200,
    Fluorita: 200,
    Sal: 500,
    otro: 500,
  };

  const { tipoOperacion, material, toneladasTotales, fechaArribo, horaArribo } = programacionData;
  const metaGlobal = metasPorMaterial[material] ?? 500;

  const fechaHoraString = `${fechaArribo}T${horaArribo}:00`;
  let fechaHora = new Date(fechaHoraString);

  let toneladasRestantes = toneladasTotales;
  let resultados = [];
  let horasParoPorLluvia = 0;

  if (weatherData?.length) {
    while (toneladasRestantes > 0) {
      const rangoHora = new Date(fechaHora);
      const pronosticoDeClimaCorrecto = weatherData
        ?.filter(item => new Date(item.time) <= rangoHora)
        .sort((a, b) => new Date(b.time) - new Date(a.time))[0] ?? {};

      const clima = pronosticoDeClimaCorrecto?.rainAccumulation ?? 0;
      const horaActual = fechaHora.getHours();
      const FactorAjuste = calcularFactorAjuste(tipoOperacion, material, clima, toneladasTotales, toneladasRestantes, horaActual);

      const toneladasHora = metaGlobal * FactorAjuste;
      toneladasRestantes = Math.max(toneladasRestantes - toneladasHora, 0);

      if (toneladasHora === 0 && clima > 0) {
        horasParoPorLluvia++;
      }

      resultados.push({
        fecha: fechaHora,
        toneladasRestantes,
        toneladasHora,
        clima,
      });

      fechaHora.setHours(fechaHora.getHours() + 1);
    }
  }

  return {
    resultados,
    horasParoPorLluvia,
  };
};

const calcularFactorAjuste = (tipoOperacion, material, clima, toneladasTotales, toneladasRestantes, horaActual) => {
  const ajustesPorMaterial = {
    importacion: {
      Carbon: [[0, 0.4, 1], [0.4, 0.9, 0.7], [0.9, 1.2, 0.5], [1.2, 1.5, 0.2], [1.5, Infinity, 0]],
      Petcoke: [[0, 0.4, 1], [0.4, 0.9, 0.7], [0.9, 1.2, 0.5], [1.2, 1.5, 0.2], [1.5, Infinity, 0]],
      Fertilizante: [[0, 0.1, 1], [0.1, Infinity, 0]], 
      Fluorita: [[0, 0.1, 1], [0.1, 0.4, 0.7], [0.4, 0.5, 0.5], [0.5, Infinity, 0]],
      Sal: [[0, 0.2, 1], [0.2, 0.5, 0.7], [0.5, 0.9, 0.6], [0.9, Infinity, 0]],
      otro: [[0, 0.4, 1], [0.4, 0.9, 0.7], [0.9, 1.2, 0.5], [1.2, 1.5, 0.2], [1.5, Infinity, 0]],
    },
    exportacion: {
      "Concentrado de Plomo": [[0, 0.2, 1], [0.2, 0.9, 0.7], [0.9, Infinity, 0]],
      "Concentrado de Zinc": [[0, 0.2, 1], [0.2, 0.9, 0.7], [0.9, Infinity, 0]],
      otro: [[0, 0.3, 1], [0.3, 0.9, 0.9], [0.9, 1.5, 0.7], [1.5, Infinity, 0]],
    },
  };

  const ajustes = ajustesPorMaterial[tipoOperacion]?.[material] || [];
  let factor = 1;

  for (let [min, max, factorInicial] of ajustes) {
    if (clima >= min && clima <= max) {
      factor = factorInicial;
      break;
    }
  }

  const toneladasProduccionLenta = toneladasTotales * 0.25; 
  const ultimasToneladasProduccionLenta = toneladasTotales * 0.10;

  if (tipoOperacion === "importacion" && toneladasRestantes <= toneladasProduccionLenta) {
    if (toneladasRestantes <= ultimasToneladasProduccionLenta) {
      factor *= 0.5;
    } else {
      factor *= 0.75;
    }
  }

  if (horaActual >= 23 || horaActual < 6) {
    factor *= 0.7;
  }

  return factor;
};

module.exports = calcularResultados;
