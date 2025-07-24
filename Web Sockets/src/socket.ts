import WebSocket, { WebSocketServer } from 'ws';

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running at ws://localhost:${PORT}`);

wss.on('connection', (socket: WebSocket) => {
  console.log(' New client connected');

  
  socket.send('👋 Welcome to the server! Type "ping" or chat something.');


  const priceInterval = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      const price = (Math.random() * 100).toFixed(2);
      socket.send(`💰 Solana update: $${price}`);
    }
  }, 10000); 

  socket.on('message', (data: WebSocket.RawData) => {
    const message = data.toString().trim();
    console.log(`📩 Received: ${message}`);

    if (socket.readyState !== WebSocket.OPEN) return;

    if (message.toLowerCase() === 'ping') {
      socket.send('pong');
    } else {
      socket.send(`🗨️ Server: You said "${message}"`);
    }
  });

  socket.on('close', () => {
    console.log(' Client disconnected');
    clearInterval(priceInterval);
  });

  socket.on('error', (err) => {
    console.error(' Error:', err);
    clearInterval(priceInterval);
  });
});
