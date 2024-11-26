import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Context } from "vm";

export const dynamic = "force-static";

export async function GET(request: Request, context: Context) {
  try {
    const { params } = context;
    // Verifica se `context.params.id` existe e tenta converter para número
    const cidadeId = parseInt(params?.id);

    if (isNaN(cidadeId)) {
      return NextResponse.json(
        { message: "Id inválido. Por favor, forneça um número válido." },
        { status: 400 }
      );
    }

    console.log(`Buscando cidade com ID: ${cidadeId}`);

    // Busca a cidade no banco de dados
    const cidade = await prisma.cidade.findFirst({
        where: { cidade_id: cidadeId },
        include: {
          localidade: true,
        },
      });

    if (!cidade) {
      return NextResponse.json(
        { message: "Cidade não encontrada." },
        { status: 404 }
      );
    }

    return NextResponse.json(cidade);
  } catch (error) {
    console.error("Erro ao buscar cidade:", error);
    return NextResponse.json(
      { message: "Erro interno ao buscar cidade." },
      { status: 500 }
    );
  }
}
