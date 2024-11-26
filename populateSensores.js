const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cidades = require("./src/utils/sensores.json");
async function inserirCidades() {
  try {
    for (const cidade of cidades) {
      await prisma.sensor.create({
        data: cidade,
      });
    }
    console.log("localidades inseridas com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir cidades:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chamar a função
inserirCidades();