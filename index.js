const WebSocket = require('ws');
const net = require('net');

const server = new WebSocket.Server({ port: process.env.PORT || 10000 });

server.on('connection', (ws) => {
    const tcpClient = new net.Socket();

    // Pipes your traffic right into your MCServerHost backend entry point
    tcpClient.connect(10166, '135.148.171.123', () => {});

    ws.on('message', (message) => {
        if (tcpClient.writable) tcpClient.write(message);
    });

    tcpClient.on('data', (data) => {
        if (ws.readyState === WebSocket.OPEN) ws.send(data);
    });

    ws.on('close', () => tcpClient.end());
    tcpClient.on('close', () => ws.close());
    ws.on('error', () => tcpClient.end());
    tcpClient.on('error', () => ws.close());
});

console.log('Eaglercraft bridge tunnel active on Render layers!');
