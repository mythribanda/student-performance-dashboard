function validEntries(rows, subject) {
  return rows
    .filter((row) => typeof row?.["Student Name"] === "string" && row["Student Name"].trim())
    .map((row) => ({ name: row["Student Name"].trim(), rawMarks: row[subject] }))
    .filter((entry) => entry.rawMarks !== null && entry.rawMarks !== undefined && String(entry.rawMarks).trim() !== "")
    .map(({ name, rawMarks }) => ({ name, marks: Number(rawMarks) }))
    .filter((entry) => Number.isFinite(entry.marks));
}

function getExtreme(rows, subject, comparator) {
  const entries = validEntries(rows, subject);
  if (!entries.length) return [];
  const extreme = entries.reduce((value, entry) => comparator(entry.marks, value) ? entry.marks : value, entries[0].marks);
  return entries.filter((entry) => entry.marks === extreme);
}

export function getHighest(rows, subject) { return getExtreme(rows, subject, (a, b) => a > b); }
export function getLowest(rows, subject) { return getExtreme(rows, subject, (a, b) => a < b); }
