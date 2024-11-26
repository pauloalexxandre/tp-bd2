//para rodar, execute node populateCidades.json no terminal
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Dados fictícios para o histórico
const historicos = [
  {
    temperatura: 22.5,
    umidade: 60,
    pressao_atmosferica: 1013.25,
    timestamp: "2024-11-20T15:56:15.736Z",
  },
  {
    temperatura: 23.0,
    umidade: 65,
    pressao_atmosferica: 1012.80,
    timestamp: "2024-11-19T16:00:00.000Z",
  },
  {
    temperatura: 21.8,
    umidade: 58,
    pressao_atmosferica: 1013.10,
    timestamp: "2024-11-18T16:05:00.000Z",
  }
];

async function inserirHistoricos() {
  try {
    // Percorrendo o array de dados fictícios e inserindo no banco
    const sensores = await prisma.sensor.findMany();
    for (const sensor of sensores) {
    for (const historico of historicos) {
      await prisma.historicoSensor.create({
        data: {
          sensor_id: sensor.sensor_id,
          temperatura: historico.temperatura,
          umidade: historico.umidade,
          pressao_atmosferica: historico.pressao_atmosferica,
          timestamp: new Date(historico.timestamp), // Convertendo string para Date
          unidade_temperatura: "Celsius", // Valor fixo, mas pode ser alterado conforme necessidade
          unidade_umidade: "Percentual", // Valor fixo, mas pode ser alterado conforme necessidade
          unidade_pressao: "hPa", // Valor fixo, mas pode ser alterado conforme necessidade
        },
   
      });
    }

    }
    console.log("Históricos inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir históricos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chamar a função para inserir os históricos
inserirHistoricos();
