const carousel = document.querySelectorAll('.carousel');

const reset = () => carousel.forEach((item) => item.classList.remove('animation'));

function accordion(e) {
  if (!e.target.closest('.carousel')) return;
  reset();
  e.target.parentElement.classList.add('animation');
}

const init = () => carousel[carousel.length-1].classList.add('animation');

window.addEventListener('load',init,false);
window.addEventListener('click',accordion,false);