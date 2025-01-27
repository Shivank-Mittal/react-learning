import { useState } from 'react';

const useData= () => {
    const [map, setMap] = useState(new Map());
    const addItem = (key: unknown, value: unknown) => {
        const newMap = new Map(map);
        newMap.set(key, value);
        setMap(newMap);
    };

    return [ map, addItem ];
};

export default useData;
