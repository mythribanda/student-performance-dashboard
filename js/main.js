import { SUBJECTS } from "./config.js";
import { fetchRows } from "./sheetService.js";
import { getHighest, getLowest } from "./stats.js";
import { populateSubjects, renderResults, setState } from "./ui.js";

const elements = {
  loading: document.querySelector("#loading"), error: document.querySelector("#error"),
  controls: document.querySelector("#dashboard-controls"), select: document.querySelector("#subject-select"),
  results: document.querySelector("#results"), highest: document.querySelector("#highest-result"),
  lowest: document.querySelector("#lowest-result"), retry: document.querySelector("#retry-button")
};
let rows = [];

function showSubject() {
  const subject = elements.select.value;
  if (!subject) { elements.results.hidden = true; return; }
  renderResults(elements.highest, elements.lowest, elements.results, getHighest(rows, subject), getLowest(rows, subject));
}

async function load() {
  setState({ ...elements, loadingVisible: true, errorVisible: false, controlsVisible: false });
  elements.results.hidden = true;
  try {
    rows = await fetchRows();
    populateSubjects(elements.select, SUBJECTS);
    setState({ ...elements, loadingVisible: false, errorVisible: false, controlsVisible: true });
  } catch (error) {
    console.error(error);
    setState({ ...elements, loadingVisible: false, errorVisible: true, controlsVisible: false });
  }
}
elements.select.addEventListener("change", showSubject);
elements.retry.addEventListener("click", load);
load();
