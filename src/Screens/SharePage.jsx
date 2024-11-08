// import { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSocket } from '../context/SocketProvider';

// const SharePage = () => {
//     const { id } = useParams();
//     const socket = useSocket();
//     const [code, setCode] = useState('');

//     const handleCodeUpdate = useCallback((updatedCode) => {
//         setCode(updatedCode);
//     }, []);

//     useEffect(() => {
//         if (!socket) return;

//         socket.emit('join-room', id);

//         socket.on('code-update', handleCodeUpdate);

//         return () => {
//             socket.off('code-update', handleCodeUpdate);
//             socket.emit('leave-room', id);
//         };
//     }, [socket, id, handleCodeUpdate]);

//     const handleCodeChange = (e) => {
//         const newCode = e.target.value;
//         setCode(newCode);
//         socket.emit('code-change', { roomId: id, code: newCode });
//     };

//     return (
//         <div>
//             <h2>Share Code - Room ID: {id}</h2>
//             <textarea
//                 value={code}
//                 onChange={handleCodeChange}
//                 placeholder="Enter your code here..."
//                 rows={20}
//                 cols={80}
//             />
//         </div>
//     );
// };

// export default SharePage;


// src/Screens/SharePage.jsx
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketProvider';

const SharePage = () => {
    const { id } = useParams();
    const socket = useSocket();
    const [code, setCode] = useState('');

    useEffect(() => {
        if (!socket) return;

        socket.emit('join-room', id);
        
        // Changed to match server event name
        socket.on('code-change', (newCode) => {
            console.log('Received code:', newCode);
            setCode(newCode);
        });

        return () => {
            socket.off('code-change');
            socket.emit('leave-room', id);
        };
    }, [socket, id]);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        // Emit code change to server
        socket.emit('code-change', { roomId: id, code: newCode });
    };

    return (
        <div className="p-4 h-screen flex flex-col">
            <h2 className="text-xl mb-4">Share Code - Room ID: {id}</h2>
            <textarea
                className="flex-1 p-4 w-full border rounded focus:outline-none focus:border-blue-500 font-mono"
                value={code}
                onChange={handleCodeChange}
                placeholder="Enter your code here..."
            />
        </div>
    );
};

export default SharePage;