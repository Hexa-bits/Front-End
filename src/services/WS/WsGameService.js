// let ws = null;
// export const createWsGameInstance = (url) => {
//   if (!ws) {
//     ws = new WebSocket(url);

//     ws.onopen = () => {
//       console.log("Game WebSocket abierto.");
//     };

//     ws.onclose = () => {
//       console.log("Game WebSocket cerrado.");
//     };

//     ws.onmessage = (event) => {
//       console.log("Game WS Mensaje recibido:", event.data);
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };

//     ws.onerror = (error) => {
//       console.error("Game WebSocket error:", error);
//     };
//   }
//   return ws;
// };

// export const closeWsGameInstance = () => {
//   if (ws && ws.readyState === WebSocket.OPEN) {
//     ws.close();
//     ws = null;
//   }
// };

// export const sendMessage = (message) => {
//   if (ws && ws.readyState === WebSocket.OPEN) {
//     ws.send(message);
//   } else {
//     console.error(
//       "No se puede enviar el mensaje, Game WebSocket no está abierto."
//     );
//   }
// };

// export const getWsGameInstance = () => ws;

let ws = null;
export const createWsGameInstance = (url) => {
  const savedUrl = localStorage.getItem("wsUrl");
  if (savedUrl) {
    url = savedUrl;
  }

  if (!ws) {
    ws = new WebSocket(url);
    localStorage.setItem("wsUrl", url);
    ws.onopen = () => {
      console.log("Game WebSocket abierto.");
    };

    ws.onclose = () => {
      console.log("Game WebSocket cerrado.");
    };

    ws.onmessage = (event) => {
      console.log("Game WS Mensaje recibido:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (error) => {
      console.error("Game WebSocket error:", error);
    };
  }
  return ws;
};

export const closeWsGameInstance = () => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.close();
    localStorage.removeItem("wsUrl");
    ws = null;
  }
};

export const sendMessage = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.error(
      "No se puede enviar el mensaje, Game WebSocket no está abierto."
    );
  }
};

export const getWsGameInstance = () => ws;
