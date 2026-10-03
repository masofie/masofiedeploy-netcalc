document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateNetwork);

function calculateNetwork() {

    const ip = document
        .getElementById("ipAddress")
        .value
        .trim();

    const mask = document
        .getElementById("subnetMask")
        .value
        .trim();

    if (!validIPv4(ip)) {
        alert("IP inválida");
        return;
    }

    if (!validIPv4(mask)) {
        alert("Máscara inválida");
        return;
    }

    const ipParts = ip.split(".").map(Number);
    const maskParts = mask.split(".").map(Number);

    const network = [];
    const broadcast = [];

    for (let i = 0; i < 4; i++) {
        network[i] = ipParts[i] & maskParts[i];
        broadcast[i] = network[i] | (255 - maskParts[i]);
    }

    const networkStr = network.join(".");
    const broadcastStr = broadcast.join(".");

    const networkInt = ipToInt(networkStr);
    const broadcastInt = ipToInt(broadcastStr);

    let firstHost = "-";
    let lastHost = "-";
    let hostCount = 0;

    if (broadcastInt - networkInt > 1) {

        firstHost = intToIp(networkInt + 1);
        lastHost = intToIp(broadcastInt - 1);
        hostCount = broadcastInt - networkInt - 1;
    }

    document.getElementById("networkAddress").textContent =
        networkStr;

    document.getElementById("broadcastAddress").textContent =
        broadcastStr;

    document.getElementById("hostRange").textContent =
        `${firstHost} - ${lastHost}`;

    document.getElementById("hostCount").textContent =
        hostCount;
}

function validIPv4(ip) {

    const parts = ip.split(".");

    if (parts.length !== 4) {
        return false;
    }

    for (let part of parts) {

        const num = Number(part);

        if (
            isNaN(num) ||
            num < 0 ||
            num > 255
        ) {
            return false;
        }
    }

    return true;
}

function ipToInt(ip) {

    return ip
        .split(".")
        .map(Number)
        .reduce(
            (acc, octet) =>
                (acc << 8) + octet,
            0
        ) >>> 0;
}

function intToIp(num) {

    return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
    ].join(".");
}