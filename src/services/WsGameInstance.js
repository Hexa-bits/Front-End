let wsInstance = null;

export const getWSInstance = (url) => {
    if (!wsInstance) {
        wsInstance = new WebSocket(url);
    }
    return wsInstance;
};

export const closeWSInstance = () => {
    if (wsInstance) {
        wsInstance.close();
        wsInstance = null;
    }
};
