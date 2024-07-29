var header = undefined;
var bannersDiv = undefined;
var bannersDivHeight = 0;

window.addEventListener('DOMContentLoaded', () => {
  header = document.querySelector('body >header');
  bannersDiv = document.querySelector('header #banners');
  bannersDivHeight = window.getComputedStyle(bannersDiv).height.slice(0, -2);
});
window.addEventListener('resize', () => {
  bannersDivHeight = window.getComputedStyle(bannersDiv).height.slice(0, -2);
});
window.addEventListener('scroll', () => {
  if (bannersDivHeight > 0) {
    if (window.scrollY > bannersDivHeight + 80) {
      header.style.transform = 'translateY(-'+bannersDivHeight+'px)';
    } else {
      header.style.transform = 'translateY(0)';
    }
  }
});
