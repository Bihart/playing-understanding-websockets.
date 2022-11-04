#!/usr/bin/env python3
"""Simples websocket server."""
import asyncio
from random import random, randint
from json import dumps as json_dumps
import websockets


def __descisor():
    discriminator = random()
    update_rate = randint(1, 10)
    sigma = 0.001
    if discriminator + sigma < 0.33 + sigma:
        return {'rate': update_rate, 'value': 'BAJITO'}
    if discriminator + sigma < 0.66 + sigma:
        return {'rate': update_rate, 'value': 'MEDIANO'}

    return {'rate': update_rate, 'value': 'ALTO'}


async def __echo(websocket):
    try:
        while True:
            await asyncio.sleep(1)
            payload = json_dumps(__descisor())
            await websocket.send(payload)
    except:
        print("conección cerrada")


async def main():
    """Principal entrypoint."""
    async with websockets.serve(__echo, "localhost", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
