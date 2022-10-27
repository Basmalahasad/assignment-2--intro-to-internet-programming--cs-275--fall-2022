let next = document.getElementById(`nav-button--next`);
let prev = document.getElementById(`nav-button--prev`);
let images = document.querySelector(`.images-container`);
let image_width = parseFloat(getComputedStyle(images.children[0]).width);

let current_card = 0;

let checkCount = () => {
    if (current_card > 0 && current_card < (images.children.length) - 1) 
    {
        prev.classList.remove(`hidden`);
        next.classList.remove(`hidden`);
        document.getElementById(`right-shadow`).classList.remove(`hidden`);
        document.getElementById(`left-shadow`).classList.remove(`hidden`);

    } 
    else if (current_card === 0) {
        prev.classList.add(`hidden`);
        document.getElementById(`left-shadow`).classList.add(`hidden`);
    } 
    else if (current_card === (images.children.length) - 1){
        next.classList.add(`hidden`);
        document.getElementById(`right-shadow`).classList.add(`hidden`);
    }
};

checkCount();

next.addEventListener(`click`, () => {
    if(current_card < (images.children.length) - 1){
        current_card += 1;
        images.style.transitionDuration = `0.3s`;
        images.style.transform = `translate(-${current_card * image_width}px)`;
        checkCount();
    }
    
    else{
        return;
    }
});

document.addEventListener(`keydown`, (e) => {
    if(e.keyCode === 39) {
        if(current_card < (images.children.length) - 1){
            current_card+=1;
            images.style.transitionDuration = `0.3s`;
            images.style.transform = `translate(-${current_card * image_width}px)`;
            checkCount();
        }
        else {
            return;
        }
    }
});

prev.addEventListener(`click`, () => {
    if(current_card > 0 ){
        current_card-=1;
        images.style.transitionDuration = `0.3s`;
        images.style.transform = `translate(-${current_card * image_width}px)`;
        checkCount();
    }
    else{
        return;
    }
});

document.addEventListener(`keydown`, (e) => {
    if(e.keyCode === 37){
        if(current_card > 0 ){
            current_card-=1;
            images.style.transitionDuration = `0.3s`;
            images.style.transform = `translate(-${current_card * image_width}px)`;
            checkCount();
        }
        else{
            return;
        }
    }
});

