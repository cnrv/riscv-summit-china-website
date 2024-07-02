window.addEventListener('DOMContentLoaded', () => {
  let dropdowns = document.querySelectorAll('div.dropdown');
  dropdowns.forEach((ele) => {
    ele.addEventListener('mouseenter', () => {
        ele.classList.add('unfolding');
    });
    ele.addEventListener('mouseleave', () => {
        ele.classList.remove('unfolding');
    });
    ele.addEventListener('click', () => {
        ele.classList.toggle('unfolding');
    });
  })
});
