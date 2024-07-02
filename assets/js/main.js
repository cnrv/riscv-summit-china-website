import './dropdown.js';
import './dropup-menu.js';
import './sidebar.js';
import { resizeToFullCover } from "./common";

homePageHeader = undefined;
homePageCover = undefined;
function resizeHeaderCover() {
  if ( ! homePageHeader || ! homePageCover ) {
    return
  }
  let height = window.innerHeight;
  let width = window.innerWidth;
  homePageHeader.style.minHeight = height + 'px';
  homePageHeader.style.minWidth = width + 'px';
  homePageCover.style.height = height + 'px';
  homePageCover.style.width = width + 'px';
}

window.addEventListener('DOMContentLoaded', () => {
  homePageHeader = document.querySelector('#home-page-header');
  homePageCover = document.querySelector('#home-page-cover');
  resizeHeaderCover();
  const allFullwebSections = document.querySelectorAll('.fullweb-section');
  allFullwebSections.forEach((ele) => {
    resizeToFullCover(ele);
  });
});

window.addEventListener('resize', () => {
  resizeHeaderCover();
  const allFullwebSections = document.querySelectorAll('.fullweb-section');
  allFullwebSections.forEach((ele) => {
    resizeToFullCover(ele);
  });
});
