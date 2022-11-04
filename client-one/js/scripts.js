'use strict';

// import * as d3 from "https://cdn.skypack.dev/d3@7";

const state = new Map();
const url = "ws://localhost:8765";
const my_ws = new WebSocket(url);

my_ws.onmessage = (event) => {
    const recv_data = event.data;
    update_state(recv_data);
    update_view(recv_data);
};

my_ws.onerror = (event) => {
    console.log(event);
};


function update_state(key_to_update) {
    if(state.has(key_to_update)){
        const prev_value = state.get(key_to_update);
        state.set(key_to_update, prev_value + 1);
    } else {
        state.set(key_to_update, 1);
    }
}

function update_view(key_update) {
    const curr_target =  document.getElementById(`${key_update}-value`);
    curr_target.innerText = state.get(key_update);
}
