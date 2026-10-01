console.log("JS IS RUNNING");

const startbutton = document.querySelector("#start");
const stopbutton = document.querySelector("#stop");
const clientinput = document.querySelector("#clientId");
const terminal = document.querySelector("#terminal");

let eventSource = null;

startbutton.addEventListener("click", function () {

    if (clientinput.value === "") {
        console.log("PLEASE ENTER THE CLIENT ID");
        document.querySelector("#statustext").textContent = "Please enter the client id";
        return;
    }

    const clientId = encodeURIComponent(clientinput.value);

    eventSource = new EventSource(`/stream?clientId=${clientId}`);

    eventSource.onopen = function () {
        document.querySelector("#statustext").textContent = "Connected";
    };

    eventSource.onmessage = function (event) {
        const line = document.createElement("div");

        line.className = "logline";
        line.textContent = event.data;

        terminal.appendChild(line);

        while (terminal.children.length > 100) {
            terminal.removeChild(terminal.firstElementChild);
        }

        terminal.scrollTop = terminal.scrollHeight;
    };

        eventSource.onerror = function () {
            document.querySelector("#statustext").textContent = "Connection Error";
        };

        startbutton.disabled = true;
        stopbutton.disabled = false;

        console.log("START BUTTON CLICKED");
        console.log(clientinput.value);
    });


stopbutton.addEventListener("click", function () {

    if (eventSource !== null) {
        eventSource.close();
        eventSource = null;
    }

    startbutton.disabled = false;
    stopbutton.disabled = true;

    console.log("STOP BUTTON CLICKED");

    document.querySelector("#statustext").textContent = "Disconnected";
});

