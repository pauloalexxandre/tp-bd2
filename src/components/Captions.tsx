"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HistorySensor } from "./HistorySensor";
import { useEffect, useState } from "react";
import axios from "axios";

interface CaptionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Captions({ isOpen, onClose }: CaptionsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [histories, setHistories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Adicionado estado para carregamento

  // Função para retroceder para a página anterior
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  // Função para avançar para a próxima página
  const handleAdvancedPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Efeito para buscar os dados sempre que a página for alterada
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Começa o carregamento
      try {
        const response = await axios.get(
          `http://localhost:3000/api/historico/${currentPage}`
        );
        console.log("Dados carregados para a página:", currentPage, response.data);
        setHistories(response.data); // Atualiza o estado com os novos dados
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <aside
      className={`fixed top-0 z-[999999] bg-slate-50 h-[100vh] ${
        isOpen ? "left-0" : "-left-[26rem]"
      } duration-500 w-[22rem] flex flex-col pb-10 pt-4 px-4 shadow-lg`}
    >
      <div className="w-full flex items-center justify-end">
        <button
          onClick={() => onClose()}
          className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-md"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="w-full h-[80%] flex flex-col items-center overflow-y-auto">
        {loading ? (
          <span>Carregando...</span>
        ) : histories.length === 0 ? (
          <span className="text-gray-500">Nenhum histórico encontrado.</span>
        ) : (
          histories.map((history, index) => (
            <HistorySensor history={history} key={history.log_id || index} />
          ))
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={handleAdvancedPage}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <ArrowRight />
        </button>
      </div>
    </aside>
  );
}
