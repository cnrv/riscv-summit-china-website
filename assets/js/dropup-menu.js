window.addEventListener('DOMContentLoaded', () => {
  let dropupMenus = document.querySelectorAll('div.dropup-menu');
  dropupMenus.forEach((ele) => {
    let dropupMenuBtn = ele.querySelector('.dropup-menu-btn');
    let dropupMenuContent = ele.querySelector('.dropup-menu-content');
    let dropupMenuContentHeight = window.getComputedStyle(dropupMenuContent).height;
    let dropupMenuBtnHeight = window.getComputedStyle(dropupMenuBtn).height;
    ele.style.setProperty('--dropup-menu-content-height', dropupMenuContentHeight);
    ele.style.setProperty('--dropup-menu-btn-height', dropupMenuBtnHeight);
    dropupMenuBtn.addEventListener('click', () => {
      ele.classList.toggle('unfolding');
    });
  })
});
