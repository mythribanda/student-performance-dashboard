export function populateSubjects(select, subjects) {
  select.insertAdjacentHTML("beforeend", subjects.map((subject) => `<option value="${subject}">${subject}</option>`).join(""));
  select.disabled = false;
}

function resultHtml(entries) {
  if (!entries.length) return '<p class="empty">No valid marks are available for this subject.</p>';
  return `<ul class="student-list">${entries.map(({ name, marks }) => `<li><strong>${escapeHtml(name)}</strong> <span class="marks">— ${marks} marks</span></li>`).join("")}</ul>`;
}

function escapeHtml(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

export function renderResults(highestElement, lowestElement, resultsElement, highest, lowest) {
  highestElement.innerHTML = resultHtml(highest);
  lowestElement.innerHTML = resultHtml(lowest);
  resultsElement.hidden = false;
}

export function setState({ loading, error, controls, loadingVisible, errorVisible, controlsVisible }) {
  loading.hidden = !loadingVisible;
  error.hidden = !errorVisible;
  controls.hidden = !controlsVisible;
}
