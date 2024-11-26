const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const salas = require("./src/utils/salasExample.json");
async function inserirCidades() {
  try {
    for (const sala of salas) {
      await prisma.sala.create({
        data: sala,
      });
    }
    console.log("Salas inseridas com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir cidades:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Chamar a função
inserirCidades();
