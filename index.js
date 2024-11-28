console.log('Puzzle JS')

const puzzleAllimages = document.querySelectorAll('.puzzle-from__images img');
const puzzlePreview = document.querySelector('.puzzle-preview');
const puzzleTos = document.querySelectorAll('.puzzle-to');
const resetPuzzle = document.querySelector('.puzzle-reset');
const puzzleSuccessfull = document.querySelector('.puzzle-successfull');

let draggedImage = null;

puzzleAllimages.forEach(function(img) {
    img.onclick = function(e) {
        e.preventDefault();

        puzzlePreview.children[0].setAttribute('src', img.src)
        puzzlePreview.classList.add('puzzle-preview--active')
    }
});
puzzlePreview.onclick = function(e) {
    e.preventDefault();
    puzzlePreview.classList.remove('puzzle-preview--active')
}

// Puzzle
puzzleAllimages.forEach(image => {
    image.addEventListener('dragstart', dragStart);
    image.addEventListener('dragend', dragEnd);
    image.addEventListener('touchstart', touchStart);
    image.addEventListener('touchend', touchEnd);
});

puzzleTos.forEach(puzzleTo => {
    puzzleTo.addEventListener('dragover', dragOver);
    puzzleTo.addEventListener('drop', drop);
    puzzleTo.addEventListener('touchend', drop);
});


function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.from);
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function touchStart(e) {
    draggedImage = e.target;
    e.target.classList.add('dragging');
}

function touchEnd(e) {
    if (draggedImage) {
        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        if (dropTarget && dropTarget.classList.contains('puzzle-to')) {
            drop({ target: dropTarget });
        }
        draggedImage.classList.remove('dragging');
        draggedImage = null;
    }
}

function drop(e) {
    
    const fromData = e.dataTransfer ? e.dataTransfer.getData('text/plain') : draggedImage?.dataset.from;
    const toData = e.target.dataset.to;

    const puzzleAllImagesSuccess = document.querySelectorAll('.main-puzzle img.img-success')

    const img = document.querySelector(`img[data-from="${fromData}"]`);

    if (fromData === toData) {
        e.target.appendChild(img);
        img.classList.add('img-success');
        img.classList.remove('img-danger'); 
        img.setAttribute('draggable', 'false'); 
    } else {
        e.target.appendChild(img);
        img.classList.add('img-danger');
        img.classList.remove('img-success'); 
    }

    if (puzzleAllImagesSuccess.length > 3) {
        puzzleSuccessfull.classList.add('puzzle-successfull--active');
    }

}

function puzzleReset() {
    const puzzleFromImages = document.querySelector('.puzzle-from__images');

    puzzleAllimages.forEach(image => {
        image.classList.remove('img-success', 'img-danger');
        image.setAttribute('draggable', 'true'); 
        puzzleFromImages.appendChild(image);
    });

    puzzleSuccessfull.classList.remove('puzzle-successfull--active');
}

resetPuzzle.addEventListener('click', puzzleReset);