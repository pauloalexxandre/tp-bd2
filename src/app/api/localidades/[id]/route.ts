import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Context } from "vm"

export const dynamic = 'force-static'

export async function GET(request: Request, context: Context) {
  const { params } = context;
  // Verifica se `context.params.id` existe e tenta converter para número
  const localidadeId = parseInt(params?.id);
    if (!localidadeId){
        return NextResponse.json({message: "Não consta este Id"}, {status: 404})
    }
    const localidade = await prisma.localidade.findFirst({
        where: { localidade_id: localidadeId },
        include: {
          salas: {
            include: {
              sensores: {include:{
                HistoricoSensor: true
              }
            }, // Incluir os sensores de cada sala
            },  
          },
        },
      });
      
    return NextResponse.json(localidade)    
}