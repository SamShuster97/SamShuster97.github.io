const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');

function position(current,active) {
  const diff = current - active; 
  return Math.abs(diff) > 2 ? -current : diff;
}

function update(active) {
  const activePos = active.dataset.pos; 
  for (const item of items) {
    item.dataset.pos = position(item.dataset.pos,activePos); 
  } 
}

const init = (e) => e.target.matches('.carousel-item') && update(e.target);

carousel.addEventListener('click',init,false);
