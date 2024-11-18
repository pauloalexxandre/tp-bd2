import Image from "next/image";
import { Map } from "@/components/Map";
import { Reader } from "@/components/Reader";
export default async function Home() {

  return ( 
    <>
    <Reader />
    <Map />
    </>
   );
}
