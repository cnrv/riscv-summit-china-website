var adaptiveTables = undefined;
var adaptiveTablesIsForSmall = false;
const triggeredWidth = 1440;

function toggleAdaptiveTables() {
  if (!adaptiveTables) {
    return;
  }
  const w = parseFloat(window.innerWidth);
  if (w < triggeredWidth && !adaptiveTablesIsForSmall) {
    adaptiveTablesIsForSmall = true;
    adaptiveTables.forEach((t) => {
      const tr = t.querySelectorAll("tr");
      tr.forEach((r) => {
        const n = r.querySelector(".name");
        if (n) {
          const nc = n.cloneNode(true);
          nc.classList.add("clone-name");
          r.insertBefore(nc, r.firstChild);
          n.classList.add("empty");
        }
      });
    });
  } else if (w >= triggeredWidth && adaptiveTablesIsForSmall) {
    adaptiveTablesIsForSmall = false;
    adaptiveTables.forEach((t) => {
      const tr = t.querySelectorAll("tr");
      tr.forEach((r) => {
        const nc = r.querySelector(".clone-name");
        if (nc) {
          nc.remove();
        }
        const n = r.querySelector(".name");
        if (n) {
          n.classList.remove("empty");
        }
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  adaptiveTables = document.querySelectorAll("table.adaptive");
  toggleAdaptiveTables();
});

window.addEventListener('resize', () => {
  toggleAdaptiveTables();
});
