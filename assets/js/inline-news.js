var inlineNewsTimerCountdownValue = 0;
var inlineNewsCurrentEleIndex = 0;
var inlineNewsPaused = false;
var inlineNewsLi = undefined;
var inlineNewsLiProp = [];
var inlineNewsMaxWidth = 0;

const getOffset = (child, parent) => {
  let offsetTop = 0;
  let currentElement = child;
  while (currentElement && currentElement !== parent) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent;
  }
  return offsetTop;
};

const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.attributeName === 'class') {
      const ele = mutation.target;
      const index = ele.getAttribute("data-index");
      if (ele.classList.contains('active')) {
        if (inlineNewsLiProp[index].aWidth > inlineNewsLiProp[index].liWidth) {
          const eleA = ele.querySelector('a');
          eleA.style.left = '0';
          inlineNewsLiProp[index].left = 0;
          inlineNewsLiProp[index].pausedCount = 20;
          inlineNewsLiProp[index].toLeft = true;
          inlineNewsLiProp[index].intervalId = setInterval(()=>{
            if (inlineNewsLiProp[index].pausedCount > 0) {
              inlineNewsLiProp[index].pausedCount -= 1;
              return;
            }
            if (
              inlineNewsLiProp[index].toLeft &&
              (inlineNewsLiProp[index].aWidth - inlineNewsLiProp[index].liWidth < inlineNewsLiProp[index].left)
            ) {
              inlineNewsLiProp[index].toLeft = false;
              inlineNewsLiProp[index].pausedCount = 10;
            } else if (!inlineNewsLiProp[index].toLeft && inlineNewsLiProp[index].left < 0) {
              inlineNewsLiProp[index].toLeft = true;
              inlineNewsLiProp[index].pausedCount = 10;
            }
            if (inlineNewsLiProp[index].toLeft) {
              inlineNewsLiProp[index].left += 1;
            } else {
              inlineNewsLiProp[index].left -= 1;
            }
            eleA.style.left = '-' + inlineNewsLiProp[index].left + 'px';
          }, 33);
        }
      } else {
        if (inlineNewsLiProp[index].intervalId !== undefined) {
          clearInterval(inlineNewsLiProp[index].intervalId);
          inlineNewsLiProp[index].intervalId = undefined;
        }
      }
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const inlineNews = document.querySelector('#cover #inline-news');
  const inlineNewsTimerCountdown = inlineNews.querySelector('.countdown');
  const inlineNewsUl = inlineNews.querySelector('ul');
  inlineNewsLi = inlineNews.querySelectorAll('li');

  inlineNews.addEventListener('mouseover', () => {
    inlineNewsPaused = true;
  });
  inlineNews.addEventListener('touchstart', () => {
    inlineNewsPaused = true;
  });
  inlineNews.addEventListener('mouseout', () => {
    inlineNewsPaused = false;
  });
  inlineNews.addEventListener('touchend', () => {
    inlineNewsPaused = false;
  });

  const mutationObserverConfig = {
    attributes: true,
    attributeFilter: ['class']
  };

  inlineNewsLi.forEach((ele, index) => {
    const inlineNewsLiA = ele.querySelector('a');
    const widthLi = parseFloat(window.getComputedStyle(ele).width);
    const widthLiA = parseFloat(window.getComputedStyle(inlineNewsLiA).width);
    inlineNewsLiProp.push({
      "offset": getOffset(ele, inlineNewsUl),
      "liWidth": widthLi,
      "aWidth": widthLiA,
      "intervalId": undefined,
      "element": ele
    });
    if (widthLiA > inlineNewsMaxWidth) {
      inlineNewsMaxWidth = widthLiA;
    }
    ele.setAttribute("data-index", index);
    observer.observe(ele, mutationObserverConfig);
  });
  inlineNews.style.width = (inlineNewsMaxWidth + 80) + 'px';
  inlineNewsLiProp[inlineNewsCurrentEleIndex].element.classList.add("active");
  setInterval(() => {
    if (inlineNewsPaused) {
      return;
    }
    if (inlineNewsTimerCountdownValue > 100) {
      inlineNewsTimerCountdownValue = 0;
      inlineNewsLiProp[inlineNewsCurrentEleIndex].element.classList.remove("active");
      inlineNewsCurrentEleIndex += 1;
      if (inlineNewsCurrentEleIndex >= inlineNewsLiProp.length) {
        inlineNewsCurrentEleIndex = 0;
      }
      const translateYValue = 0 - inlineNewsLiProp[inlineNewsCurrentEleIndex].offset;
      inlineNewsUl.style.transform = 'translateY('+translateYValue+'px)';
      inlineNewsLiProp[inlineNewsCurrentEleIndex].element.classList.add("active");
    }
    inlineNewsTimerCountdown.style.height = inlineNewsTimerCountdownValue + '%';
    inlineNewsTimerCountdownValue += 1;
  }, 50);
});


window.addEventListener('resize', () => {
  inlineNewsMaxWidth = 0;
  inlineNewsLi.forEach((ele) => {
    const inlineNewsLiA = ele.querySelector('a');
    const widthLi = parseFloat(window.getComputedStyle(ele).width);
    const widthLiA = parseFloat(window.getComputedStyle(inlineNewsLiA).width);
    const index = ele.getAttribute("data-index");
    inlineNewsLiProp[index].liWidth = widthLi;
    inlineNewsLiProp[index].aWidth = widthLiA;
    if (widthLiA > inlineNewsMaxWidth) {
      inlineNewsMaxWidth = widthLiA;
    }
  });
  inlineNews.style.width = (inlineNewsMaxWidth + 80) + 'px';
});
