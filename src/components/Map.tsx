"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Popup, CircleMarker } from "react-leaflet";
import geojsonData from "@/lib/geoDataSP.json";
import exampleCidades from "@/utils/cidadesExample.json";
import exampleLocalidades from "@/utils/localidadesExample.json";
import exampleSalas from "@/utils/salasExample.json";
import "leaflet/dist/leaflet.css";
import { ICidade, ILocalidade, ISala } from "@/interfaces/models";
import axios from "axios";
import { FloorPlan } from "./FloorPlan";

export function SaoPauloMap(){
  const locations: ILocalidade[] = exampleLocalidades;
  const cities: ICidade[] = exampleCidades;
  const rooms: ISala[] = exampleSalas;
  
  const [selectedCity, setSelectedCity] = useState<ICidade | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<ILocalidade[] | null>(null);
  const [selectedRoomsModalOpen, setSelectedRoomsModalOpen] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<ILocalidade | null>(null);
  const fetchCoordinates = async (address: string) => {
    try {
      const encodedAddress = encodeURIComponent(address);
      console.log(encodedAddress);
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
  
      const data = response.data; // Acesse a propriedade "data" diretamente
      console.log(data[0]?.lat); // Log para verificar o retorno
      console.log(data[0]?.lon); 
      if (data.length > 0) {
        return {"lat":parseFloat(data[0].lat),"long":parseFloat(data[0].lon)};
      }
      return null; // Se não encontrar a localização
    } catch (error) {
      console.error("Erro ao buscar coordenadas:", error);
      return null;
    }
  };

  const handleCloseSelectedRoomModal = () => { setSelectedRoomsModalOpen(false)}
  const handleLocationClick = (location: ILocalidade) => {
    setSelectedLocation(location); // Atualiza o estado com a localidade clicada
    setSelectedRoomsModalOpen(true); // Abre o modal
  };
  // Função chamada ao clicar em uma cidade
  const handleCityClick = (city: ICidade) => {
    setSelectedCity(city);
  };

  // Estilo para o GeoJSON
  const cityStyle = (feature) => ({fillColor: (() => {
    if (selectedCity && selectedCity.nome === feature.properties.name) {
      return "#e72113"; // Cor para a cidade selecionada
    }
  
    if (cities.some((location) => feature.properties.name === location.nome)) {
      return "#010fd1"; // Cor para cidades disponíveis
    }
  
    return "#d3d3d3"; // Cor padrão
  })(),
    weight:1,
    color: "#092a50",
    fillOpacity: 0.4,
  });

    useEffect(() => {
      return () => {
        const mapElement = document.getElementById("unique-map-container");
        if (mapElement && mapElement._leaflet_id) {
          mapElement._leaflet_id = null; // Reseta o contêiner
        }
      };
    }, []);

  useEffect(() => {
    // Função assíncrona para lidar com as coordenadas
    const fetchLocationsWithCoordinates = async () => {
      if (!selectedCity) return;
    
      const filteredLocations = locations.filter(
        (loc) => loc.cidade_id === selectedCity.cidade_id
      );
    
      const locationsWithCoordinates: ILocalidade[]= await Promise.all(
        filteredLocations.map(async (location) => {
          const coords = await fetchCoordinates(
            `${location.numero}, ${location.logradouro}, ${location.bairro},${location.cep}`,
          );
    
          if (coords) {
            return {
              ...location,
              lat:coords.lat,long:coords.long, salas: rooms.filter(room => room.localidade_id === location.localidade_id) // Adiciona as coordenadas
            };
          } else {
            console.warn("Coordenadas não encontradas para:", location);
            return {
              ...location,
              coords: null, // Marca como inválido
            };
          }
        })
      );
    
      const validLocations = locationsWithCoordinates.filter(
        (loc) => loc.lat !== null
      );
    
      setSelectedLocations(validLocations);
    };
  
    fetchLocationsWithCoordinates();
  }, [selectedCity, locations]);
  console.log(selectedLocation); 
  console.log(selectedRoomsModalOpen);
  return (
    <>
    {selectedRoomsModalOpen && selectedLocation && <FloorPlan salas={selectedLocation.salas} localidadeId={selectedLocation.localidade_id} nomeLocalidade={selectedLocation.nome_localidade} isModalOpen={selectedRoomsModalOpen} handleCloseModal={handleCloseSelectedRoomModal }/> }
    <MapContainer  id="unique-map-container" center={[-22.55052, -48.633308]} zoom={7.4} style={{ height: "100%", width: "100%" }} className=" shadow-lg border border-slate-200">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* GeoJSON das cidades */}
      {geojsonData && (
        <GeoJSON
          data={geojsonData}
          style={cityStyle}
          onEachFeature={(feature, layer) => {
            const matchingCity = cities.find((city) => city.nome === feature.properties.name);

            if (matchingCity) {
              layer.on({
                click: () => handleCityClick(matchingCity),
              });
            }
          }}
        />
      )}

      {/* Marcadores das localidades */}
      {selectedLocations?.map((location) => ( location.lat && location.long ?
          <CircleMarker 
          key={location.localidade_id} 
          center={[location.lat, location.long]} 
          radius={10} 
          color="#ff0000" 
          fillColor="#ffcccc" 
          fillOpacity={0.7}
        >
            <Popup>
              <div>
                <strong>{location.nome_localidade}</strong>
                <p>{location.logradouro}, {location.numero} - {location.bairro}</p>
                <p>CEP: {location.cep}</p>
                <button className="bg-[#2563eb] border-2 border-[#1d4ed8] px-1 py-2 rounded-md text-slate-50 pointer duration-200 hover:bg-[#1d4ed8] hover:border-[#2563eb]"
                  onClick={()=> handleLocationClick(location)}
                >
                  Total de Salas: {location.salas?.length || 0}
                </button>


              </div>
            </Popup>
          </CircleMarker>
       :null ))}
    </MapContainer>
    </>
  );
  }

