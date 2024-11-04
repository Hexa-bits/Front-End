
function WSMessages({ws}) {
    const messages = document.getElementById('messages');
    const formInput = document.getElementById('form-chat');

    ws.on('chat-message', (msg) => {
        const item = `<li>${msg }<li>`;
        messages.insertAdjacentElement('beforeend', item);
    });

}

export default WSMessages;