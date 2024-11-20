import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export const dynamic = 'force-static'

export async function GET() {
    const cidade = await prisma.cidades.findMany()
    return NextResponse.json(cidade)
}