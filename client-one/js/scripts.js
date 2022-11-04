import * as Plot from "https://cdn.skypack.dev/@observablehq/plot@0.6";

const state = new Map();
const url = "ws://localhost:8765";
const my_ws = new WebSocket(url);

my_ws.onerror = (event) => {
    console.log(event);
};

function update_state({rate: new_value, value: key_to_update }) {
    if(state.has(key_to_update)){
        const prev_value = state.get(key_to_update);
        state.set(key_to_update, prev_value + new_value);
    } else {
        state.set(key_to_update, new_value);
    }
}

function update_all(obj_msg) {
    update_state(obj_msg);
    update_view();
}

my_ws.onmessage = (event) => {
    const recv_data = JSON.parse(event.data);
    update_all(recv_data);
};
function update_view(){
    const container = document.querySelector(".graph");
    const childres = container.children;
    const data = [...state.entries()].map(([key, value]) => {
        return {'es': key, 'frec': value};
    });
    const chart = Plot.barY(data, {x: 'es', y: 'frec'});
    const plot = chart.plot();
    container.innerHTML = plot.outerHTML;
}
