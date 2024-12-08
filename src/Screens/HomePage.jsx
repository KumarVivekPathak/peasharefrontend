import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { v4 as uuidv4 } from "uuid";

const HomePage = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const generateId = () =>{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let result = '';
  
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
    }
  
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result += numbers[randomIndex];
    }
  
    const characters = letters + numbers;
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
  
    result = result.split('').sort(() => 0.5 - Math.random()).join('');  
    return result;
  }

  const onShareCode = useCallback(() => {
    const id = generateId();
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
    <div className=" min-h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center dark:bg-gradient-to-t from-gray-500 to-gray-800 ">
      <article className="flex flex-col item-start p-6  rounded-lg font-mono items-center ">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">
          Share Code in Real Time with Developers
        </h3>
        <h4 className="text-lg text-gray-600 dark:text-gray-300">
          An online code editor for personal use.
        </h4>
      </article>

      <button
        onClick={onShareCode}
        className="relative px-12 py-4 bg-amber-400 hover:bg-amber-300 rounded-lg font-semibold text-lg text-gray-900 
                    overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl
                    before:absolute before:top-0 before:-left-full before:w-full before:h-full
                    before:bg-gradient-to-r before:from-amber-200 before:to-amber-300
                    before:transition-all before:duration-500 before:ease-out
                    hover:before:left-0 before:-z-10
                    after:absolute after:top-0 after:-right-full after:w-full after:h-full
                    after:bg-gradient-to-l after:from-amber-200 after:to-amber-300
                    after:transition-all after:duration-500 after:ease-out
                    hover:after:right-0 after:-z-10"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Share Your Code Now
        </span>
      </button>

      <p className="text-md font-medium text-gray-400 mt-4 rounded-lg shadow-sm">
        Share Code for free
      </p>
    </div>
  );
};

export default HomePage;
