# ⚡ WebSocket Chat App

A minimalist, dark-themed WebSocket-based real-time chat and push-notification app built with:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js WebSocket server (`ws` library)

---




---

## 🚀 Features

✅ Minimal real-time chat interface  
✅ Dark aesthetic UI with Tailwind CSS  
✅ Solana price push updates every 10s  
✅ Ping-pong command support  
✅ Message echoing from server  
✅ Clean, readable code with TypeScript  

---

## 🖥️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/neeleshkr22/WebSocket.git
cd WebSocket
```

---

### 2. Start the WebSocket Server

```bash
cd server
npm install ws
npx tsx server.ts
```

> ✅ Server runs on `ws://localhost:8080`

---

### 3. Start the React Client

```bash
cd ../client
npm install
npm run dev   # or npm start if using CRA
```

> ✅ Client connects automatically to `ws://localhost:8080`

---

## 💬 How it Works

### 📡 Client (`App.tsx`)

- Connects to WebSocket server at `ws://localhost:8080`
- Sends messages via input box
- Displays:
  - Server responses
  - Price notifications every 10 seconds
- Supports Enter key to send
- Has message bubbles styled for sent/received

### 🖥️ Server (`server.ts`)

- Uses `ws` WebSocketServer on port `8080`
- On connection:
  - Sends welcome message
  - Sends Solana price updates every 10 seconds
- On receiving:
  - Responds with `"pong"` to `"ping"`
  - Echoes all other messages with a `"Server: You said ..."` reply
- Cleans up intervals and logs on disconnect/error

---


## 📦 Technologies Used

| Tech            | Purpose                     |
|-----------------|-----------------------------|
| React           | UI                          |
| TypeScript      | Type safety                 |
| Tailwind CSS    | Styling                     |
| ws              | WebSocket server            |
| Vite / CRA      | Build tool for React        |

---

## 🔗 Connect

Made with ❤️ by [Neelesh Kumar](https://github.com/neeleshkr22)
