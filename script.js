"use strict";

window.addEventListener("load", init);

const player = {
    x: 100,
    y: 100,
    speed: 200, // px/s
    height: 40,
    width: 32,
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
    const newPos = {
        x: player.x,
        y: player.y,
    };

    if (controls.up) {
        newPos.y -= player.speed * deltaTime;
    }
    if (controls.down) {
        newPos.y += player.speed * deltaTime;
    }
    if (controls.left) {
        newPos.x -= player.speed * deltaTime;
    }
    if (controls.right) {
        newPos.x += player.speed * deltaTime;
    }

    if (canMove(player, newPos)) {
        player.y = newPos.y;
        player.x = newPos.x;
    }
}

function canMove(player, position) {
    if (position.y > 320 - player.height || position.y < 0) {
        return false;
    }
    if (position.x > 640 - player.width || position.x < 0) {
        return false;
    }
    return true;
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
