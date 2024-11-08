// import { useCallback, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSocket } from '../context/SocketProvider';
// import { v4 as uuidv4 } from 'uuid';

// const HomePage = () => {
//     const navigate = useNavigate();
//     const socket = useSocket();

//     const onShareCode = useCallback(() => {
//         const id = uuidv4(); 
//         socket.emit('create-room', id);
//         navigate(`/share/${id}`);
//     }, [navigate, socket]);

//     useEffect(() => {
//         socket.on("connect", () => {
//             console.log("Connected to socket server");
//         });

//         return () => {
//             socket.off("connect");
//         };
//     }, [socket]);

//     return (
//         <div className='text-2xl underline font-semibold bg-slate-600 cursor-pointer' onClick={onShareCode}>
//             Share Code
//         </div>
//     );
// };

// export default HomePage;


// src/Screens/HomePage.jsx
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
    const navigate = useNavigate();
    const socket = useSocket();

    const onShareCode = useCallback(() => {
        const id = uuidv4();
        navigate(`/share/${id}`);
    }, [navigate]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        return () => {
            socket.off("connect");
        };
    }, [socket]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <button
                    onClick={onShareCode}
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Create Sharing Room
                </button>
            </div>
        </div>
    );
};

export default HomePage;