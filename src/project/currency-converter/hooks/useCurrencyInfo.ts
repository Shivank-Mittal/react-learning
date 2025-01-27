import { useEffect, useState } from "react"

export default function useCurrencyInfo(currency: string) {
    const [data, setData] = useState<Record<string, number>>({});
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then(data => data.json())
        .then(data =>  setData(data[currency]))
    }, [currency])
    return data;
}