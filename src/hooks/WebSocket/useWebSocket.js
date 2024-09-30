import { useEffect, useState } from 'react';


const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState([]); 


    useEffect(() => {
        const newSocket = new WebSocket(url);

        newSocket.onopen = () => {
            console.log('WebSocket conectado');
        };

        newSocket.onmessage = (event) => {
            setData(JSON.parse(event.data)); 
            console.log('Datos recibidos:', data); 
        };

        newSocket.onclose = () => {
            console.log('WebSocket desconectado');
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, [url]);

    return { socket, data }; 
};

export default useWebSocket;
