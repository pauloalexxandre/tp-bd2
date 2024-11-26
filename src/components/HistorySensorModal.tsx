"use client"
import { IHistoricoSensor, ISensor } from "@/interfaces/models";
import Modal from "./Modal";// Exemplo de ícones

interface SensorHistoryModalProps {
  selectedSensor: ISensor; // Tipo para o sensor selecionado
  onClose: () => void;
}

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

const SensorHistoryModal: React.FC<SensorHistoryModalProps> = ({ selectedSensor, onClose }) => {
 

  return (
    <Modal
      isOpen={!!selectedSensor}
      onClose={onClose}
      title={`Histórico do Sensor: ${selectedSensor?.sensor_name || "Desconhecido"}`}
    >
      <div className="p-4">
        {selectedSensor?.HistoricoSensor?.length === 0 ? (
          <span className="text-gray-500">Nenhum histórico encontrado.</span>
        ) : (
          selectedSensor?.HistoricoSensor?.map((historico: IHistoricoSensor, index: number) => (
            <div key={index} className="flex flex-col gap-3 border-b py-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">
                  Data: {formatDateToBR(historico.timestamp)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {selectedSensor.sensor_model === "DHT22" && historico.temperatura && (
                  <span className="text-gray-700">
                    <strong>Temperatura:</strong> {historico.temperatura} {selectedSensor.unit_of_measure}
                  </span>
                )}

                {selectedSensor.sensor_model === "BMP280" && historico.umidade && (
                  <span className="text-gray-700">
                    <strong>Umidade:</strong> {historico.umidade} {selectedSensor.unit_of_measure}
                  </span>
                )}

                {selectedSensor.sensor_model === "MQ-2" && historico.pressao_atmosferica && (
                  <span className="text-gray-700">
                    <strong>Pressão atmosférica:</strong> {historico.pressao_atmosferica}{" "}
                    {selectedSensor.unit_of_measure}
                  </span>
                )}

                {selectedSensor.sensor_model === "BH1750" && historico.temperatura && (
                  <span className="text-gray-700">
                    <strong>Luminosidade:</strong> {historico.temperatura} {selectedSensor.unit_of_measure}
                  </span>
                )}

                {selectedSensor.sensor_model === "HC-SR501" && (
                  <span className="text-gray-700">
                    <strong>Movimento:</strong> {historico.temperatura} {selectedSensor.unit_of_measure}
                  </span>
                )}

                {selectedSensor.sensor_model === "KY-037" && historico.temperatura && (
                  <span className="text-gray-700">
                    <strong>Som:</strong> {historico.temperatura} {selectedSensor.unit_of_measure}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default SensorHistoryModal;

