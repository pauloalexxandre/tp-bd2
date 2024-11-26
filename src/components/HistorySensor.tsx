"use client"
import { IHistoricoSensor } from "@/interfaces/models";
import { Thermometer, Cloud, CloudAlert, Sun, Footprints, Speaker, Settings } from "lucide-react";

interface HistorySensorProps {
  history: IHistoricoSensor;
}

export function HistorySensor({ history }: HistorySensorProps) {
  const  sensor  = history.sensor;

  // Define o ícone baseado no modelo do sensor
  const getSensorIcon = (model: string | undefined) => {
    switch (model) {
      case "DHT22":
        return <Thermometer className="text-sky-800" />;
      case "BMP280":
        return <Cloud className="text-sky-800" />;
      case "MQ-2":
        return <CloudAlert className="text-sky-800" />;
      case "BH1750":
        return <Sun className="text-sky-800" />;
      case "HC-SR501":
        return <Footprints className="text-sky-800" />;
      case "KY-037":
        return <Speaker className="text-sky-800" />;
      default:
        return <Settings className="text-sky-800" />;
    }
  };
  const formatDateToBR = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return dateObj.toLocaleString("pt-BR", options);
  };
  return (
    <article className="flex flex-col gap-2 border-b py-6 mb-2 w-full px-4 rounded bg-white shadow-xl">
      <div className="flex items-center gap-2">
        {getSensorIcon(sensor.sensor_model)}
        <h4 className="font-semibold text-base text-sky-950">{sensor.sensor_name}</h4>
      </div>

      <div className="text-sm text-gray-700">{sensor.sensor_type}</div>
     <div>
        <span className="font-semibold text-base">
          Data: {formatDateToBR(history.timestamp)}
        </span>
 
     </div>
      <div className="flex justify-between text-sm">
        <span>
          Medição Atual: <strong>{sensor.current_value}</strong> {sensor.unit_of_measure}
        </span>
        <span>
          Status:
          <span
            className={sensor.status === "ativo" ? "text-green-700 font-bold" : "text-red-700 font-bold"}
          >
            {sensor.status}
          </span>
        </span>
      </div>
      <div className="flex w-full ">

        </div>
    </article>
  );
}
