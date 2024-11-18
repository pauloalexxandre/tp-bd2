/*"use client"

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import geoDataList from "@/lib/geoDataSP.json"; // Importando o JSON
import { Search } from './Search';


export function Map() {
    // Acessando a lista de "features" para filtrar
    const [geoData, setGeoData] = useState(geoDataList.features);

    function changeMap(searchTerm: string) {
        // Filtra pelo nome presente em properties.name
        const filteredData = geoDataList.features.filter(geo => 
            geo.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setGeoData(filteredData); // Atualiza o estado com os dados filtrados
    }

    return (
        <>
            <Search onChange={changeMap} /> {  // Passa a função changeMap para o componente Search
            <div className="w-[85vw] h-[75vh] px-2 py-2">
                <MapContainer
                    center={[-23.5505, -46.6333]} // Centralizado em São Paulo
                    zoom={7.5} // Zoom ideal para o estado
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    
                    {geoData && (
                        <GeoJSON
                            data={geoData}
                            style={() => ({
                                color: 'white',
                                weight: 1,
                                fillColor: 'blue',
                                fillOpacity: 1,
                            })}
                        />
                    )}
                </MapContainer>
            </div>
        </>
    );
}
----------------------------------------------------------
*/


"use client";

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import geoDataList from "@/lib/geoDataSP.json"; // Importando o JSON
import { Search } from './Search';

export function Map() {
    // Estado para armazenar os dados geográficos
    const [geoData, setGeoData] = useState([]);
    
    // UseEffect para garantir que os dados sejam carregados corretamente
    useEffect(() => {
        // Verifica se geoDataList e geoDataList.features são válidos
        if (geoDataList && Array.isArray(geoDataList.features)) {
            setGeoData(geoDataList.features); // Inicializa o estado com os dados
        } else {
            console.error("Erro: geoDataList não contém os dados esperados.");
        }
    }, []); // Executa apenas uma vez quando o componente for montado

    function changeMap(searchTerm: string) {
        if (!geoDataList || !Array.isArray(geoDataList.features)) {
            console.error("Erro: geoDataList não está disponível ou não possui dados válidos.");
            return;
        }

        // Filtra os dados de acordo com o nome do município
        const filteredData = geoDataList.features.filter((geo) =>
            geo.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setGeoData(filteredData); // Atualiza o estado com os dados filtrados
    }

    return (
        <>
            <Search onChange={changeMap} /> {/* Passa a função changeMap para o componente Search */}
            <div className="w-[85vw] h-[75vh] px-2 py-2">
                <MapContainer
                    center={[-23.5505, -46.6333]} // Centralizado em São Paulo
                    zoom={7.5} // Zoom ideal para o estado
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    
                    {geoData.length > 0 && (
                        <GeoJSON
                            data={geoData}
                            style={() => ({
                                color: 'white',
                                weight: 1,
                                fillColor: 'blue',
                                fillOpacity: 1,
                            })}
                        />
                    )}
                </MapContainer>
            </div>
        </>
    );
}
