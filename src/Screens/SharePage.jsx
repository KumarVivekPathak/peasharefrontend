import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import MonacoEditor from "react-monaco-editor";

const SharePage = () => {
  const { id } = useParams();
  const socket = useSocket();
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", id);

    socket.on("code-change", (newCode) => {
      console.log("Received code:", newCode);
      setCode(newCode);
    });

    return () => {
      socket.off("code-change");
      socket.emit("leave-room", id);
    };
  }, [socket, id]);

  const handleCodeChange = (newCode) => {
    // const newCode = e.target.value;
    console.log( "new code is:: ", newCode)
    setCode(newCode);

    socket.emit("code-change", { roomId: id, code: newCode });
  };

  const options = {
    selectOnLineNumbers: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', 'Monaco', 'Consolas', 'Courier New', monospace",
    fontSize: 14,
    lineHeight: 1.5
  };

  return (
    <div className="w-full flex flex-col bg-gray-800 overflow-hidden">
      <MonacoEditor
        className="  max-w-full rounded-xl font-mono"
        height={695}
        defaultValue="Enter your code here..."
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={handleCodeChange}
      />
  </div>
  );
};

export default SharePage;
