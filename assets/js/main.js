import './dropdown.js';
import './dropup-menu.js';
import './sidebar.js';
import './figure.js';
import './banners.js';
import './inline-news.js';
import './adaptive-table.js';
import { resizeToFullCover, resizeToFullHeight } from "./common";

news = undefined;
homePageCover = undefined;
function resizeHeaderCover() {
  if ( ! homePageCover ) {
    return
  }
  resizeToFullCover(homePageCover);
}

window.addEventListener('DOMContentLoaded', () => {
  homePageCover = document.querySelector('#home-page-cover');
  news = document.querySelector('main section#news');
  resizeHeaderCover();
  resizeToFullHeight(news);
  const allFullwebSections = document.querySelectorAll('.fullweb-section');
  allFullwebSections.forEach((ele) => {
    resizeToFullCover(ele);
  });
});

window.addEventListener('resize', () => {
  resizeHeaderCover();
  resizeToFullHeight(news);
  const allFullwebSections = document.querySelectorAll('.fullweb-section');
  allFullwebSections.forEach((ele) => {
    resizeToFullCover(ele);
  });
});
