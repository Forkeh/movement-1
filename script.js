"use strict";

window.addEventListener("load", init);

// ****** Model ******
// #region model

const player = {
    x: 100,
    y: 100,
    speed: 200, // px/s
    width: 32,
    height: 40,
};

const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
};

const enemy = {
    x: 200,
    y: 100,
    speed: 0, // px/s
    width: 32,
    height: 40,
};

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

// Checks edges of game field
function canMove(player, position) {
    if (position.y > 320 - player.height || position.y < 0) {
        return false;
    }
    if (position.x > 640 - player.width || position.x < 0) {
        return false;
    }
    return true;
}

function isColliding(rectA, rectB) {
    // determine if the two rectangles are colliding, i.e. overlapping
    // e.g. by using the AABB (Axis-Aligned Bounding Box) method

    // Check if the right side of rectA is to the left of the left side of rectB
    const rightOfLeft = rectA.x + rectA.width > rectB.x;

    // Check if the left side of rectA is to the right of the right side of rectB
    const leftOfRight = rectA.x < rectB.x + rectB.width;

    // Check if the bottom side of rectA is above the top side of rectB
    const bottomOfTop = rectA.y + rectA.height > rectB.y;

    // Check if the top side of rectA is below the bottom side of rectB
    const topOfBottom = rectA.y < rectB.y + rectB.height;

    // If all conditions are true, the rectangles are colliding
    return rightOfLeft && leftOfRight && bottomOfTop && topOfBottom;
}

// #endregion model

// ****** Controller ******
// #region controller

let lastTime = 0;

function init() {
    requestAnimationFrame(tick);

    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyPressed);
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

    // ignore the deltaTime and accurate frame calculation - just move 1 pixel each frame
    requestAnimationFrame(tick);

    // move
    movePlayer(deltaTime);

    // Check for collision with enemy
    console.log("COLLISON:", isColliding(player, enemy));

    if (isColliding(player, enemy)) {
        player.collision = true;
        enemy.collision = true;
    } else {
        player.collision = false;
        enemy.collision = false;
    }

    // update display
    displayPlayer();
    displayEnemy();
}

// #endregion controller

// ****** View ******
// #region view

function displayPlayer() {
    const playerPos = document.querySelector("#player");

    if (player.collision) {
        playerPos.classList.add("flash");
    } else {
        playerPos.classList.remove("flash");
    }

    playerPos.style.translate = `${player.x}px ${player.y}px`;
}

function displayEnemy() {
    const enemyPos = document.querySelector("#enemy");

    enemyPos.style.translate = `${enemy.x}px ${enemy.y}px`;
}

// #endregion view
