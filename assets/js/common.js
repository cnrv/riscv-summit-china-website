export const resizeToFullCover = (ele) => {
  let height = window.innerHeight;
  let width = window.innerWidth;
  ele.style.minHeight = height + 'px';
  ele.style.minWidth = width + 'px';
}
