function hideFullPageImage(container) {
  container.classList.add('hidden');
}
function showFullPageImage(figure, container) {
  const realContainer = container.querySelector('div.container')
  const fig = document.createElement('figure');
  const img = figure.querySelector('img');
  const imgClone = img.cloneNode(true);
  const cap = figure.querySelector('figcaption');
  const capClone = cap.cloneNode(true);
  realContainer.innerHTML = '';
  fig.appendChild(imgClone);
  fig.appendChild(capClone);
  realContainer.appendChild(fig);
  container.classList.remove('hidden');
  container.style.display = '';
}

window.addEventListener('DOMContentLoaded', () => {
  const allFigures = document.querySelectorAll('figure');
  const fullPageContainer = document.querySelector('#fullPageContainer');
  const fullPageContainerClose = document.querySelector('#fullPageContainer >div.close');
  allFigures.forEach((ele) => {
    ele.addEventListener('click', () => {
      showFullPageImage(ele, fullPageContainer);
    });
  });
  fullPageContainerClose.addEventListener('click', () => {
    hideFullPageImage(fullPageContainer);
  });
});
