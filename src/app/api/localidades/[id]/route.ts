import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Context } from "vm"

export const dynamic = 'force-static'

export async function GET(context: Context) {
    const localidadeId = context.params.id
    if (!localidadeId){
        return NextResponse.json({message: "Não consta este Id"}, {status: 404})
    }
    const localidade = await prisma.localidade.findFirst({where:{localidade_id: localidadeId}})
    return NextResponse.json(localidade)    
}