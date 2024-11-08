import { useState, useEffect } from "react";
import CountdownTimer from "../../../components/Game/Timer/timer";

export default function WSTimer({ ws }) {
  useEffect(() => {
    // Evento cuando el WebSocket recibe un mensaje
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "Terminó turno" || data.type === "La partida inició") {
        CountdownTimer();
      }
    };

    // // Registra el manejador de eventos
    // ws.addEventListener("message", handleMessage);

    // // Limpiar el evento cuando el componente se desmonte
    // return () => {
    //   ws.removeEventListener("message", handleMessage);
    // };
  }, [ws]);
}
