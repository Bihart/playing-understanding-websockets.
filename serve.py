#!/usr/bin/env python3
"""Simples websocket server."""
import asyncio
import websockets
from random import random as rd


def __descisor():
    discriminator = rd()
    sigma = 0.001
    if discriminator + sigma < 0.33 + sigma:
        return "BAJITO"
    if discriminator + sigma < 0.66 + sigma:
        return "MEDIANO"
    return "ALTO"


async def __echo(websocket):
    try:
        while True:
            await asyncio.sleep(1)
            payload = __descisor()
            await websocket.send(payload)
    except:
        print("conección cerrada")


async def main():
    """Principal entrypoint."""
    async with websockets.serve(__echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
