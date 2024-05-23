import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./common/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/user/Login";
import GetUser from "./components/user/GetUser";
import Register from "./components/user/Register";
import ListUser from "./components/user/ListUser";
import UpdateUser from "./components/user/UpdateUser";
import AddProduct from "./components/product/AddProduct";
import ListProduct from "./components/product/ListProduct";
import GetProduct from "./components/product/GetProduct";
import UpdateProduct from "./components/product/UpdateProduct";
import { socket } from "./socket";
import { ConnectionState } from "./components/chatting/ConnectionState";
import { Events } from "./components/chatting/Events";
import { ConnectionManager } from "./components/chatting/ConnectionManager";
import { MyForm } from "./components/chatting/MyForm";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userlist" element={<ListUser />} />
          <Route path="/getuser/:id" element={<GetUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct/:role" element={<ListProduct />} />
          <Route path="/getproduct/:prodNo/:role" element={<GetProduct />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
        </Routes>
        <ConnectionState isConnected={isConnected} />
        <Events events={fooEvents} />
        <ConnectionManager />
        <MyForm />
      </div>
    </Router>
  );
}

export default App;
