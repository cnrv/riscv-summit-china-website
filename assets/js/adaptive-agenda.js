var agendaAnchors = undefined;
var agendaToc = undefined;
var agendaContainer = undefined;
var nav = undefined;
var navHeight = 0;
var agendaTocOffsetTop = 0;
var agendaTocOffsetLeft = 0;
var agendaTocCloned = false;

export const getOffsetLeftToRootElement = (ele) => {
  let offsetLeft = 0;
  while (ele) {
    offsetLeft += ele.offsetLeft;
    ele = ele.offsetParent;
  }
  return offsetLeft;
}

export const getOffsetTopToRootElement = (ele) => {
  let offsetTop = 0;
  while (ele) {
    offsetTop += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return offsetTop;
}

function refreshNavHeight() {
  if (nav) {
    navHeight = parseFloat(window.getComputedStyle(nav).height);
  }
}

function stickyTocRefreshOffset() {
  if (!agendaToc) {
    return;
  }
  agendaTocOffsetTop = getOffsetTopToRootElement(agendaToc);
  agendaTocOffsetLeft = getOffsetLeftToRootElement(agendaToc.parentElement);
}

function stickyToc(rePosition) {
  if (!agendaToc) {
    return;
  }
  if (rePosition) {
    const clonedAgendaToc = document.querySelector('#agenda-container #agenda-toc.cloned');
    clonedAgendaToc.style.top = navHeight + 'px';
    clonedAgendaToc.style.left = agendaTocOffsetLeft + 'px';
  }
  if (document.documentElement.scrollTop + navHeight >= agendaTocOffsetTop && !agendaTocCloned) {
    // should sticky toc
    agendaTocCloned = true;
    const clonedAgendaToc = agendaToc.cloneNode(true);
    clonedAgendaToc.classList.add("cloned");
    clonedAgendaToc.style.position = "fixed";
    clonedAgendaToc.style.zIndex = "9";
    clonedAgendaToc.style.top = navHeight + 'px';
    clonedAgendaToc.style.left = agendaTocOffsetLeft + 'px';
    agendaContainer.insertBefore(clonedAgendaToc, agendaToc);
    agendaToc.style.visibility = "hidden";
  } else if (document.documentElement.scrollTop + navHeight < agendaTocOffsetTop && agendaTocCloned) {
    const clonedAgendaToc = document.querySelector('#agenda-container #agenda-toc.cloned');
    if (clonedAgendaToc) {
      clonedAgendaToc.remove();
    }
    agendaToc.style.visibility = "";
    agendaTocCloned = false;
  }
}

function observeAgendaInViewport() {
  if (!agendaContainer) {
    return;
  }
  let options = {
    root: null,
    rootMargin: '-' + (navHeight+80) + 'px 0px 0px 0px',
    threshold: 0
  }
  let agendaSectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        const id = entry.target.querySelector("span.anchor").getAttribute('id');
        if (entry.intersectionRatio > 0) {
          document.querySelectorAll(`#agenda-toc a[href="#${id}"]`).forEach(function(al) {
            al.classList.add('active');
          });
        } else {
          document.querySelectorAll(`#agenda-toc a[href="#${id}"]`).forEach(function(al) {
            al.classList.remove('active');
          });
        }
      });
    },options);
  agendaContainer.querySelectorAll('.agenda-section').forEach(function(section) {
    agendaSectionObserver.observe(section);
  });
}

function setAgendaAnchorTop() {
  if (!agendaAnchors) {
    return;
  }
  const offsetTopEle = document.querySelector('#agenda-container .agenda-section');
  let offsetTop = 72;
  if (offsetTopEle) {
    offsetTop = offsetTopEle.offsetTop;
  }
  agendaAnchors.forEach(anchor => {
    if (navHeight != 0) {
      anchor.style.top = "-"+(offsetTop+navHeight-1)+"px";
      // TODO: weird 1px offset for firefox and chrome
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  agendaAnchors = document.querySelectorAll('#agenda-container span.anchor');
  agendaContainer = document.querySelector('#agenda-container');
  agendaToc = document.querySelector('#agenda-container #agenda-toc');
  nav = document.querySelector('body >header nav');
  refreshNavHeight();
  setAgendaAnchorTop();
  stickyTocRefreshOffset();
  stickyToc();
  observeAgendaInViewport();
});

window.addEventListener("resize", () => {
  refreshNavHeight();
  setAgendaAnchorTop();
  stickyTocRefreshOffset();
  stickyToc(true);
});

window.addEventListener("scroll", () => {
  refreshNavHeight();
  stickyToc();
});
