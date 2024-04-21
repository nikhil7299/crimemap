import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import MessageAdder from "./MessageAdder";
import ShowMessages from "./ShowMessages";
import Base from "./Base";
import netLine from "../controllers/netLine";

function MapPage() {
  const position = [31.255046724039705, 75.70020759443199];
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    netLine.get("messages").then((newData) => {
      let parsed = newData.map((item) => {
        return { ...item, location: JSON.parse(item.location) };
      });

      console.log(parsed);

      setMessages(parsed);
    });
  }, []);

  return (
    <Base>
      <MapContainer
        center={position}
        zoom={80}

        // whenReady={setMapState}
        // scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MessageAdder messages={messages} setMessages={setMessages} />
        <ShowMessages messages={messages} />
      </MapContainer>
    </Base>
  );
}

export default MapPage;
