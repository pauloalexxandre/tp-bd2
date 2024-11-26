import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Context } from "vm"

export const dynamic = 'force-static'

export async function GET(context: Context) {
    const { params } = context;
    const slugPagina = parseInt(params?.slug) || 1 // Página, default para 1
    const itensPorPagina = 10 // Número de itens por página
    const skip = (slugPagina - 1) * itensPorPagina // Deslocamento para a página

    try {
        // Buscar os históricos com paginação e ordenação decrescente por timestamp
        const historicoSensor = await prisma.historicoSensor.findMany({
            orderBy: {
                timestamp: 'desc', // Ordem decrescente pelo timestamp
            },
            include: {
                sensor: true, // Incluir informações do sensor, se necessário
            },
            skip: skip, // Pular os itens já retornados nas páginas anteriores
            take: itensPorPagina, // Pegar os itens da página atual
        })

        // Retornar os históricos encontrados
        return NextResponse.json(historicoSensor)
    } catch (error) {
        console.error("Erro ao buscar históricos:", error)
        return NextResponse.json({ error: "Erro ao buscar históricos" }, { status: 500 })
    }
}
