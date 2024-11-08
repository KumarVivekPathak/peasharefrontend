// import { useMemo, useContext, createContext, useEffect } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//     const socket = useContext(SocketContext);
//     if (!socket) {
//         throw new Error("useSocket must be used within a SocketProvider");
//     }
//     return socket;
// };

// export const SocketProvider = ({ children }) => {
//     const socket = useMemo(() => 
//         io("http://localhost:5000", {
//             transports: ["websocket"],
//             autoConnect: true,
//         }),
//     []);

//     useEffect(() => {
//         socket.connect();

//         return () => {
//             socket.disconnect();
//         };
//     }, [socket]);

//     return (
//         <SocketContext.Provider value={socket}>
//             {children}
//         </SocketContext.Provider>
//     );
// };




import { useMemo, useContext, createContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return socket;
};

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => 
        io("http://localhost:5000", {
            transports: ["websocket"],
            autoConnect: true,
        }),
    []);

    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Connected to server with ID:', socket.id);
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};