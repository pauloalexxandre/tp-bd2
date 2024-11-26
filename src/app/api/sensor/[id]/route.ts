import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Context } from "vm"

export const dynamic = 'force-static'

export async function GET(context: Context) {
    const sensorId = context.params.id 
    if (!sensorId){
        return NextResponse.json({message: "Não consta este Id"}, {status: 404})
    }
    const sensor = await prisma.sensor.findFirst({where:{sensor_id: sensorId}, include: {HistoricoSensor :true}})
    return NextResponse.json(sensor)
}