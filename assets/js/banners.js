var header = undefined;
var bannersDiv = undefined;
var bannersDivHeight = 0;

window.addEventListener('DOMContentLoaded', () => {
  header = document.querySelector('body >header');
  bannersDiv = document.querySelector('header #banners');
  bannersDivHeight = parseFloat(window.getComputedStyle(bannersDiv).height);
});
window.addEventListener('resize', () => {
  bannersDivHeight = parseFloat(window.getComputedStyle(bannersDiv).height);
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
