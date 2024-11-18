import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export const dynamic = 'force-static'

export async function GET() {
    const sensor = await prisma.sensor.findMany()
    return NextResponse.json(sensor)
}