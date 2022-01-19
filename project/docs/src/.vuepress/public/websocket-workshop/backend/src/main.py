from fastapi import FastAPI,WebSocket,WebSocketDisconnect

app = FastAPI()

base_path:str = "/"

clients:list[WebSocket] = []

@app.websocket(base_path)
async def chat(ws:WebSocket):
    try:
        await ws.accept()
        clients.append(ws)
        while True:
            text:str = await ws.receive_text()
            for client in clients:
                await client.send_text(text)

    except WebSocketDisconnect:
        clients.remove(ws)
