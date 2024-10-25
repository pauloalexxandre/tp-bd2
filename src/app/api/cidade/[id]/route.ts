import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Context } from "vm"


export const dynamic = 'force-static'

export async function GET(context: Context) {
    const cidadeId = context.params.id 
    if (!cidadeId){
        return NextResponse.json({message: "Não consta este Id"}, {status: 404})
    }
    const cidade = await prisma.cidades.findFirst({where:{cidade_id: cidadeId}})
    return NextResponse.json(cidade)
}