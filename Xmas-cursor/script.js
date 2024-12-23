// array of cursor image paths.
const cursors = [
    'assests/1.png',
    'assests/2.png',
    'assests/3.png',
    'assests/4.png',
]

const cursor = document.querySelector(".cursor");
let currentCursor = 0;
// index of cursors

// create cursor trail
function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.backgroundImage = cursor.style.backgroundImage;
    trail.style.left = x + 'px';
    trail.style.top = y +'px';
    document.body.appendChild(trail);

    gsap.to(trail, {
        opacity: 0,
        scale: 0.5,
        duration: 0.7,
        ease: "power2.out",
        onComplete: () => trail.remove()
    });
}
    // pass the value to gsap in order to animate the element
    window.addEventListener('mousemove', (e)=>{
        //gsap config
        gsap.to(cursor, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.4,
            ease: 'power2',
            onUpdate: function() {
                if (Math.random() < 0.2) { // Adjust frequency of trails
                    createTrail(e.clientX, e.clientY);
                }
        }})
    })

    // a fucntion to update cursor
    const clickChange = () => {
        currentCursor =  (currentCursor + 1)% cursors.length
        cursor.style.backgroundImage = `url('${cursors[currentCursor]}')`;
    };

    clickChange();
    document.addEventListener('click', clickChange)
