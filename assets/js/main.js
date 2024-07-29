import './dropdown.js';
import './dropup-menu.js';
import './sidebar.js';
import './figure.js';
import './banners.js';
import { resizeToFullCover } from "./common";

homePageCover = undefined;
function resizeHeaderCover() {
  if ( ! homePageCover ) {
    return
  }
  resizeToFullCover(homePageCover);
}

window.addEventListener('DOMContentLoaded', () => {
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
