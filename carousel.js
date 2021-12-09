const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevbutton = document.querySelector('.carousel_button--left');
const carouselNav = document.querySelector('.carousel_nav');
const dots = Array.from(carouselNav.children);


const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

//arrange the slides next to one another 

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' +  targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex == 0){
        prevbutton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex == slides.length -1) {
        prevbutton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevbutton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}
// slides.forEach((slide, index) =>{
//     slide.style.left = sldeWidth * index + 'px'
// });

// slides[0].style.left = slideWidth * 0 + 'px';
// slides[1].style.left = slideWidth * 1 + 'px';
// slides[2].style.left = slideWidth * 2 + 'px';

//when I click left, move slides to the left
prevbutton.addEventListener('click', e => {
    const currentSlide = track.document.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;  
    const currentDot = carouselNav.querySelector('.current-slide');
    const nextDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide ==prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});
//when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.document.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = carouselNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide ==nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});
//when I click the nav indicators, move to that slide
carouselNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = carouselNav.querySelector('.current-slide')
    const targetIndex = dots.findIndex(dot => dot == targetDot)
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
    // console.log(targetIndex);
})