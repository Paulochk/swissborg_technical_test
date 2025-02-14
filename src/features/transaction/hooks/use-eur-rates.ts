import {useQuery} from "@tanstack/react-query";


const WEB_SERVER_API = "http://localhost:8080/api";
const RATES_URI = "/eur-rates";

async function fetchEurRates(): Promise<Record<string, number>> {
    const response = await fetch(WEB_SERVER_API + RATES_URI);

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
}

function useEurRates() {
    return useQuery({
        queryKey: ["eurRates"],
        queryFn: fetchEurRates,
        gcTime: 0,
        staleTime: 0,
        retry: false
    });
}

export {useEurRates};