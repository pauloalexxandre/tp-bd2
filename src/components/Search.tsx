/*"use client"


interface SearchProps {
    onChange: (searchTerm: string) => void; // Espera um termo de busca
}

export function Search({ onChange }: SearchProps) {
    return (
        <input 
            type="text" 
            onChange={(event) => onChange(event.target.value)} // Passa o valor do input para a função onChange
            placeholder="Buscar município..."
        />
    );
}
---------------------------------------------------------------------------
*/

"use client";

import { useState } from "react";

interface SearchProps {
    cities: string[]; // Lista de cidades para buscar
}

export function Search({ cities }: SearchProps) {
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
    const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Filtra as cidades com base no termo de busca

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} // Atualiza o termo de busca
                placeholder="Buscar município..."
                style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
            />
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {filteredCities.length > 0 ? (
                    filteredCities.map((city, index) => (
                        <li key={index} style={{ padding: "5px 0" }}>
                            {city}
                        </li>
                    ))
                ) : (
                    <li>Nenhum município encontrado.</li>
                )}
            </ul>
        </div>
    );
}
