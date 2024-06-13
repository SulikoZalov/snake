
    const audio = document.querySelector("#audio");
    audio.currentTime = 0;
    audio.play();

    const canvas = document.getElementById("gameCanvas");
    const showScore = document.querySelector("#score")
    const ctx = canvas.getContext("2d");

    const gridSize = 20;
    const canvasSize = 400;
    let snake = [{ x: 200, y: 200 }];
    let direction = { x: 0, y: 0 };
    let food = generateFood();
    let score = 1;

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

        // Проверка столкновений
        if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize || isCollision(head, snake)) {
            location.reload()
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++
            food = generateFood();
        } else {
            snake.pop();
        }
    }

    function draw() {
        showScore.innerText = score;

        ctx.clearRect(0, 0, canvasSize, canvasSize);
        
        ctx.fillStyle = "green";
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        });

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function generateFood() {
        return {
            x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
        };
    }

    function isCollision(head, snake) {
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case "ArrowDown":
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case "ArrowLeft":
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case "ArrowRight":
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });

    setInterval(gameLoop, 200);

