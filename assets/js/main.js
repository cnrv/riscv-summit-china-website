import './dropdown.js';
import './dropup-menu.js';
import './sidebar.js';
import './figure.js';
import { resizeToFullCover } from "./common";

homePageHeader = undefined;
homePageCover = undefined;
function resizeHeaderCover() {
  if ( ! homePageHeader || ! homePageCover ) {
    return
  }
  resizeToFullCover(homePageHeader);
  resizeToFullCover(homePageCover);
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
