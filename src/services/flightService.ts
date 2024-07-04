// src/services/flightService.ts
import axios from 'axios';

export interface FlightData {
  icao24: string;
  callsign: string;
  origen_pais: string;
  ultima_posicion: {
    latitud: number;
    longitud: number;
  };
  altitud: number;
}

export async function fetchFlightDetails(icao24: string): Promise<FlightData> {
  try {
    const response = await axios.get(`https://opensky-network.org/api/states/all`);
    const vuelos = response.data.states.map((vuelo: any) => ({
      icao24: vuelo[0],
      callsign: vuelo[1],
      origen_pais: vuelo[2],
      ultima_posicion: {
        latitud: vuelo[6],
        longitud: vuelo[5]
      },
      altitud: vuelo[7]
    }));

    const vuelo = vuelos.find((v: FlightData) => v.icao24 === icao24);
    if (vuelo) {
      return vuelo;
    } else {
      throw new Error(`No se encontraron datos para el vuelo con icao24: ${icao24}`);
    }
  } catch (error) {
    console.error('Error fetching flight details:', error);
    throw error;
  }
}
