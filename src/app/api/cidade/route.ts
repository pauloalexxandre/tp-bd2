import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export const dynamic = 'force-static'

export async function GET() {
    const cidade = await prisma.cidade.findMany()
    return NextResponse.json(cidade)
}