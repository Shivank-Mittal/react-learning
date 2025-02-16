import { useEffect, useState } from "react";


type Toaster = {
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
}

export default function useToaster() {
    const [toasterQueue, setToasterQueue] = useState<Toaster[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [activeToaster, setActiveToaster] = useState<Toaster | null>(null);

    const enqueue = (toaster: Toaster) => {
        setToasterQueue((prevQueue: Toaster[]) => [...prevQueue, toaster]);
    };

    const dequeue = () => {
        setToasterQueue((prevQueue: Toaster[]) => prevQueue.slice(1));
        setTimeout(() => {
            setIsActive(false);
            setActiveToaster(null);
        }, 2000)
    };


    useEffect(() => {
        if (toasterQueue.length > 0) {
            setIsActive(true);
            setActiveToaster(toasterQueue[0]);
            dequeue();
        }
    }, [toasterQueue.length, toasterQueue])


    return {isActive, addToast: enqueue, activeToaster};
}