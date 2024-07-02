var maxInnerHeight = {
  portrait: 0,
  landscape: 0,
}
var currentOrientation = 'portrait';

function handleOrientationChange() {
  setTimeout(() => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      currentOrientation = 'portrait';
    } else if (window.matchMedia("(orientation: landscape)").matches) {
      currentOrientation = 'landscape';
    }
  }, 500);
}

window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('DOMContentLoaded', () => {
  handleOrientationChange();
});

function isIOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /iPhone|iPad|iPod/.test(userAgent);

}

export const resizeToFullCover = (ele) => {
  let height = window.innerHeight;
  let width = window.innerWidth;
  // Why the innerWidth value is incorrect in iOS Safari
  // when rotate from landscape to portrait?
  // Use the 'vw' unit in css to set the width as a backup
  if (!isIOS) {
    ele.style.minWidth = width + 'px';
    ele.style.minHeight = height + 'px';
  } else {
    // iOS safari brower hide the address bar automatically,
    // try to use the max height for all full-web sections in home.
    let h = maxInnerHeight[currentOrientation];
    if ( h == 0 || height > h ) {
      maxInnerHeight[currentOrientation] = height;
      h = height;
    }
    ele.style.minHeight = h + 'px';
  }
}
