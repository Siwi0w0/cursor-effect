function emojiCursor(){
    const emojiList = ["☘️", "💚", "🇮🇪", "𓏢", "✨"];

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const emojis = [];
    const maxEmojis = 4000;
    let lastTimestamp = 0;
    let currentIndex = 0;

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
    canvas.addEventListener("click", changeEmojiOnClick);
    window.addEventListener("resize", handleResize);
    handleResize(); // Call handleResize initially
    createEmoji(cursor.x, cursor.y);
    animateEmoji();
    }

    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function changeOnClick(){
        currentIndex = (currentIndex + 1) % emojiList.length;
    }
    function createEmoji(cursorX, cursorY){
        const emoji = emojiList[currentIndex];
    
        const speed = Math.random() * 100 + 50;
    
        // set font size
        const fontSize = 30;
        ctx.font = `${fontSize}px Arial`;
    
        // Adjust emoji positions to follow cursor
        const x = cursorX;
        const y = cursorY;

        const emojiObj = {
            x,
            y,
            fontSize,
            speed,
            emoji
        };
        emojis.push(emojiObj);
    }

    // Animation
    function animateEmoji(timestamp){
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        ctx.clearRect(0,0, canvas.width, canvas.height);

        emojis.forEach(emojiObj => {
            const textMetrics = ctx.measureText(emojiObj.emoji);

            emojiObj.y += emojiObj.speed * (deltaTime / 1000);

            // // Fade gradually
            // const distanceToLastCursorY = Math.abs(emojiObj.y - lastPos.y);
            // let alpha = 1 - Math.min(distanceToLastCursorY / 50, 1);
            // ctx.globalAlpha = alpha;

            ctx.font = `${emojiObj.fontSize}px Arial`;
        
            ctx.fillText(emojiObj.emoji, emojiObj.x, emojiObj.y);

            // // Reset global alpha back to 1
            // ctx.globalAlpha = 1;

            // If emoji is out of the canvas, reset its position
            if (emojiObj.y > canvas.height) {
                emojiObj.x = cursor.x + Math.random() * 50 - 25; // Randomize x within range of cursor
                emojiObj.y += cursor.y + Math.random() * 50 - 25; // Randomize y within range of cursor
            }
        });

        if (emojis.length < maxEmojis) {
            createEmoji(cursor.x, cursor.y);
        }

        requestAnimationFrame(animateEmoji);
    };
    
     // Add mousemove event listener to update cursor position
     canvas.addEventListener("mousemove", (event) => {
        cursor.x = event.clientX;
        cursor.y = event.clientY;
    });
    
    // click to change emoji
    canvas.addEventListener("click", changeOnClick);

    // Create initial emojis
    for(let i=0; i<10; i++){
        createEmoji();
    }

    // Start animation
    requestAnimationFrame(animateEmoji);

    function destroy() {
        canvas.removeEventListener("click", changeEmojiOnClick);
        window.removeEventListener("resize", handleResize);
        canvas.remove();
    }

    init();
}

// Initialise emoji cursor
emojiCursor();