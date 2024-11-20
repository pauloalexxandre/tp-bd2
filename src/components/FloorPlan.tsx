"use client";
import { useState } from 'react';
import Modal from '@/components/Modal';
import { ISala, ISensor } from '@/interfaces/models';
import sensores from '@/utils/sensores.json';
import Image from 'next/image';
import planta  from "@/assets/floorPlan.png";
import { Cloud, CloudAlert, Footprints, History, Settings, Speaker, Sun, Thermometer, X } from 'lucide-react';
interface FloorPlanProps {
  salas: ISala[] | undefined;
  sensores?: ISensor[] | undefined; // Adiciona os sensores para mostrar na tooltip do mapa
  nomeLocalidade: string;
  localidadeId: number; // Adiciona o ID da localidade para filtrar as salas da mesma
  isModalOpen: boolean;
  handleCloseModal: () => void;
}
export function FloorPlan({ salas, nomeLocalidade, localidadeId, isModalOpen, handleCloseModal }: FloorPlanProps) {
  const areas = [
    "absolute top-[60px] left-[242px] w-[160px] h-[240px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[60px] left-[490px] w-[160px] h-[240px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[310px] left-[140px] w-[210px] h-[190px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[310px] left-[540px] w-[210px] h-[190px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[550px] left-[278px] w-[124px] h-[110px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[550px] left-[488px] w-[224px] h-[110px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[660px] left-[178px] w-[180px] h-[90px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[660px] left-[538px] w-[170px] h-[90px] hover:bg-sky-400 opacity-70 duration-150",
    "absolute top-[490px] left-[180px] w-[60px] h-[170px] hover:bg-sky-400 opacity-70 duration-150"
  ]
  const [tooltip, setTooltip] = useState< React.ReactNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedSensor, setSelectedSensor] = useState<ISensor | null>(null);
  const filteredSalas = salas?.filter(sala => sala.localidade_id === localidadeId );
  const selectedSensores: ISensor[] = sensores;
  
  const handleSalaClick = (sala_id: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const sensoresDaSala = selectedSensores.filter(sensor => sensor.sala_id === sala_id);
  
    if (!sensoresDaSala.length) return;
  
    // Calcula a posição do botão clicado
    const buttonRect = (event.target as HTMLButtonElement).getBoundingClientRect();
  
    // Define a posição do tooltip acima do botão
    const tooltipX = buttonRect.left + buttonRect.width / 2; // Centro horizontal do botão
    const tooltipY = buttonRect.top - 10; // Acima do botão
  
    setTooltipPosition({ x: tooltipX, y: tooltipY });
    setTooltip(
      <div className="bg-white p-4 rounded shadow-md">
        {sensoresDaSala.map((sensor: ISensor) => (
          <div
            key={sensor.sensor_id}
            className="flex flex-col gap-2 border-b py-6 mb-2"
          >
            <div className='flex gap-1'>
            {sensor.sensor_model === "DHT22" ? <Thermometer className='text-sky-800'/>: 
              sensor.sensor_model === "BMP280"? <Cloud className='text-sky-800'/>:
              sensor.sensor_model === "MQ-2"? <CloudAlert className='text-sky-800'/>:
              sensor.sensor_model === "BH1750"? <Sun className='text-sky-800'/>: 
              sensor.sensor_model === "HC-SR501"? <Footprints className='text-sky-800'/>:
              sensor.sensor_model === "KY-037"? <Speaker className='text-sky-800'/>:
              <Settings className='text-sky-800'/>}
                
              <h4 className="font-semibold text-base text-sky-950">{sensor.sensor_name} </h4>
            </div>
            <div>
            {sensor.sensor_type}
            </div>
            <div className="flex justify-between">
              <span className=" text-sm">
                Medição Atual:{" "}
                <span className="font-bold">{sensor.current_value}</span>{" "}
                {sensor.unit_of_measure}
              </span>
              <span>Status: <span className={sensor.status == "ativo" ? "text-green-700": "text-red-700"}>{sensor.status }</span></span>
            </div>
            <button
              className="px-2 py-1 text-sm bg-green-700 text-white rounded hover:bg-green-900 duration-300 w-fit flex gap-1 items-center justify-center"
              onClick={() => handleSensorClick(sensor)}
            >
             <History/> Histórico
            </button>
          </div>
        ))}
      </div>
    );
  };
  const handleSensorClick = (sensor: ISensor) => {
    setSelectedSensor(sensor);
  };
  
  const handleCloseSensorModal = () => {
    setSelectedSensor(null);
  };
  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`${nomeLocalidade}`}>
      <div className='relative w-[800px] h-[800px]' >
       <Image className='h-full w-full' src={planta} alt="planta do estabelecimento"/>
          <h2 className='top-[360px] left-[45%] max-w-[160px] absolute bg-white font-semibold text-slate-700 text-center text-2xl'>{nomeLocalidade} </h2>
         {filteredSalas?.map((sala, index) => {
            return( 
              <button 
                className={`${areas[index]} flex flex-col items-center justify-center`}
                key={sala.sala_id}
                onClick={(e) => handleSalaClick(sala.sala_id,e)}
              >
                <div className=' text-black '>
                  <h3 className='font-bold'>{sala.nome_sala}</h3>
                  <h4 className='font-semibold' >{sala.tamanho?? 10} m <sup>2</sup></h4>
                  <p className='font-semibold max-w-[90%]'  >Total de sensores: <span className='text-green-950'>{sensores.filter(sensor => sensor.sala_id === sala.sala_id).length}</span></p>
                </div>
              </button>
            )
          })}
           {tooltip && (
          <div
            className="absolute bg-white p-2 border rounded shadow-lg  overflow-y-auto max-h-[300px] w-[400px]"
            style={{
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              transform: "translate(-100%, -70%)",
            }}
          >
            <button className='absolute top-0 right-0' onClick={()=>{setTooltip(null)}}><X/></button>
            {tooltip}
          </div>
        )}
      </div>
       {/* Modal do Sensor */}
       {selectedSensor && (
        <Modal
          isOpen={!!selectedSensor}
          onClose={handleCloseSensorModal}
          title={`Histórico do Sensor: ${selectedSensor.sensor_name}`}
        >
          <div className="p-4">
            {selectedSensor.historicosensor?.map((historico, index) => (
              <div key={index} className="flex flex-col gap-1 border-b py-2">
                <span>Data: {historico.timestamp.toString()}</span>
                <span>Valor: {historico.sensor_id}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </Modal>
  );
}
