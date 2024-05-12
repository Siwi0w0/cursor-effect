function emojiCursor() {
    const emojiList = ["☘️", "💚", "🇮🇪", "𓏢", "✨"];

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const emojis = [];
    const maxEmojis = 20; // Maximum number of emojis for the animation
    let currentIndex = 0;
    let isAnimating = false;

    const cursor = { x: canvas.width / 2, y: canvas.height / 2 };
    let lastPos = { x: cursor.x, y: cursor.y };

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // Re-initialise or destroy the cursor when the prefers-reduced-motion setting changes
    prefersReducedMotion.onchange = () => {
        if (prefersReducedMotion.matches) {
            destroy();
        } else {
            init();
        }
    };

    function init() {
        document.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("click", changeOnClick);
        window.addEventListener("resize", handleResize);
        handleResize(); // Call handleResize initially
    }

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function handleMouseMove(event) {
        cursor.x = event.clientX;
        cursor.y = event.clientY;
    }

    function changeOnClick() {
        currentIndex = (currentIndex + 1) % emojiList.length;
        animateMultipleEmojis();
    }

    function animateMultipleEmojis() {
        if (!isAnimating) {
            isAnimating = true;
            const startX = cursor.x;
            const startY = cursor.y;
            for (let i = 0; i < maxEmojis; i++) {
                const emoji = emojiList[currentIndex];
                const emojiObj = {
                    x: startX,
                    y: startY,
                    size: 20, // Initial size of emoji
                    speed: Math.random() * 100 + 50,
                    opacity: 1
                };
                emojis.push(emojiObj);
            }
            requestAnimationFrame(animateEmoji);
        }
    }

    function animateEmoji(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        emojis.forEach((emojiObj, index) => {
            emojiObj.size += 1; // Increase size
            emojiObj.y -= emojiObj.speed / 10; // Move upwards
            emojiObj.x += Math.random() * 2 - 2; // Randomize horizontal movement
            emojiObj.y += Math.random() * 2 - 2; // Randomize vertical movement
            emojiObj.opacity -= 0.04; // Decrease opacity

            ctx.globalAlpha = emojiObj.opacity;
            ctx.font = `${emojiObj.size}px Arial`;
            ctx.fillText(emojiList[currentIndex], emojiObj.x, emojiObj.y);

            // Remove emoji from array if opacity is too low
            if (emojiObj.opacity <= 0) {
                emojis.splice(index, 1);
            }
        });

        // If there are still emojis to animate, request another frame
        if (emojis.length > 0) {
            requestAnimationFrame(animateEmoji);
        } else {
            isAnimating = false;
        }
    }

    // Start animation
    init();
}

// Initialise emoji cursor
emojiCursor();
