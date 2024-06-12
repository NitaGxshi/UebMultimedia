document.addEventListener('DOMContentLoaded', (event) => {
    const car = document.getElementById('car');
    const finishLine = document.getElementById('finishLine');
    const container = document.querySelector('.container');

    let isDragging = false;
    let offsetX, offsetY;

    car.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - car.getBoundingClientRect().left;
        offsetY = e.clientY - car.getBoundingClientRect().top;
        car.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Ensure the car stays within the container
            const containerRect = container.getBoundingClientRect();
            const carRect = car.getBoundingClientRect();

            if (newX < containerRect.left) {
                newX = containerRect.left;
            } else if (newX + carRect.width > containerRect.right) {
                newX = containerRect.right - carRect.width;
            }

            if (newY < containerRect.top) {
                newY = containerRect.top;
            } else if (newY + carRect.height > containerRect.bottom) {
                newY = containerRect.bottom - carRect.height;
            }

            car.style.left = `${newX - containerRect.left}px`;
            car.style.top = `${newY - containerRect.top}px`;

            if (isTouching(car, finishLine)) {
                window.location.href = 'index.html'; // Redirect to homepage
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        car.style.cursor = 'grab';
    });

    function isTouching(car, finishLine) {
        const carRect = car.getBoundingClientRect();
        const finishRect = finishLine.getBoundingClientRect();

        return !(
            carRect.top > finishRect.bottom ||
            carRect.bottom < finishRect.top ||
            carRect.left > finishRect.right ||
            carRect.right < finishRect.left
        );
    }
});
