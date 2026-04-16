'use strict'

const board = document.querySelector(".board");
const handle = document.querySelector(".scroll-handle");
const scrollBar = document.querySelector(".tool-contents");

let isDragging = false;

const startDrag = () => {
    isDragging = true;
    handle.style.cursor = "grabbing";
};

const duringDrag = (clientX) => {
    if (isDragging) {
        const scrollBarRect = scrollBar.getBoundingClientRect();
        const handlePosition = clientX - scrollBarRect.left - handle.clientWidth / 2;
        const maxPosition = scrollBar.clientWidth - handle.clientWidth;

        const constrainedPosition = Math.max(0, Math.min(handlePosition, maxPosition));
        handle.style.left = constrainedPosition + "px";

        const scrollPercentage = constrainedPosition / maxPosition;
        board.scrollLeft = scrollPercentage * (board.scrollWidth - board.clientWidth);
    }
};

const stopDrag = () => {
    isDragging = false;
    handle.style.cursor = "grab";
};

const moveBox = (clientX) => {
    const rect = scrollBar.getBoundingClientRect();
    const clickX = clientX - rect.left;

    let newPosition = clickX - handle.clientWidth / 2;
    const maxPosition = scrollBar.clientWidth - handle.clientWidth;
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));

    const scrollPercentage = newPosition / maxPosition;
    board.scrollLeft = scrollPercentage * (board.scrollWidth - board.clientWidth);
}

board.addEventListener("scroll", () => {
    const scrollPercentage = board.scrollLeft / (board.scrollWidth - board.clientWidth);
    const handlePosition = scrollPercentage * (scrollBar.clientWidth - handle.clientWidth);
    handle.style.left = handlePosition + "px";
});

handle.addEventListener("mousedown", startDrag);
document.addEventListener("mouseup", stopDrag);

document.addEventListener("mousemove", (e) => {
    duringDrag(e.clientX);
});

scrollBar.addEventListener("click", (e) => {
    if (e.target === handle)
        return;

    moveBox(e.clientX);
})

window.addEventListener("resize", () => {
    const visibleRatio = board.clientWidth / board.scrollWidth;
    const handleWidth = visibleRatio * scrollBar.clientWidth;
    handle.style.width = handleWidth + "px";
});

window.dispatchEvent(new Event("resize"));