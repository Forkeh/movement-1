"use strict";

window.addEventListener("load", init);

const player = {
    x: 100,
    y: 100,
    speed: 200, // px/s
};

const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
};

let lastTime = 0;

function init() {
    requestAnimationFrame(tick);

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyPressed);
}

function displayPlayer() {
    const playerPos = document.querySelector("#player");

    playerPos.style.translate = `${player.x}px ${player.y}px`;
}

function movePlayer(deltaTime) {
    if (controls.up) {
        player.y -= player.speed * deltaTime;
    }
    if (controls.down) {
        player.y += player.speed * deltaTime;
    }
    if (controls.left) {
        player.x -= player.speed * deltaTime;
    }
    if (controls.right) {
        player.x += player.speed * deltaTime;
    }
}

function keyPressed(event) {
    const wasKeyPressed = event.type === "keydown";

    if (event.key === "w" || event.key === "ArrowUp") {
        controls.up = wasKeyPressed;
    }
    if (event.key === "s" || event.key === "ArrowDown") {
        controls.down = wasKeyPressed;
    }
    if (event.key === "a" || event.key === "ArrowLeft") {
        controls.left = wasKeyPressed;
    }
    if (event.key === "d" || event.key === "ArrowRight") {
        controls.right = wasKeyPressed;
    }
}

function tick(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    requestAnimationFrame(tick);
    movePlayer(deltaTime);
    displayPlayer();
}
