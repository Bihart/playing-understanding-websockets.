const url = "ws://localhost:8765";
const data = new Map();
const my_ws = new WebSocket(url);

function update(key_update) {
    const curr_target =  document.getElementById(`${key_update}-value`);
    curr_target.innerText = data.get(key_update);
}
my_ws.onmessage = (event) => {
    const update_data = event.data;
    if(data.has(update_data)){
        data.set(update_data, data.get(update_data) + 1);
    } else {
        data.set(update_data, 1);
    }
    update(update_data);
}
