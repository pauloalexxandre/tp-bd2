"use client"
import { Captions } from "@/components/Captions";
import { SaoPauloMap }  from "@/components/Map";
import { Header } from "@/components/Header";
import { useState } from "react";


export default function Home() {
   const [isCaptionOpen, setIsCaptionOpen] = useState<boolean>(false); 
  return (
    
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center w-full h-screen ">
        <Header/>
        <div className="md:w-[60vw] md:h-[80vh] w-full h-[80vh]">
          <SaoPauloMap/>
          <button onClick={()=>setIsCaptionOpen(!isCaptionOpen)} className="flex items-center justify-center px-2 py-1 bg-sky-700 rounded fixed bottom-[10%] left-[2%] z-50 text-white hover:bg-blue-700 duration-200">Ver Histórico</button>
          <Captions  isOpen={isCaptionOpen} onClose={()=>setIsCaptionOpen(!isCaptionOpen)}/>
        </div>
      </main>
  );
}
