import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Screens/HomePage";
import SharePage from "./Screens/SharePage";
import { SocketProvider } from "./context/SocketProvider";
import NavBar from "./components/navBar";

function App() {
  return (
    <BrowserRouter >
      <SocketProvider >
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share/:id" element={<SharePage />} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
