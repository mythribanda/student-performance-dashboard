import { sheetUrl } from "./config.js";

// Parses RFC 4180-style CSV, including commas, newlines, and escaped quotes in fields.
export function parseCsv(csv) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    if (quoted) {
      if (char === '"' && csv[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && csv[i + 1] === "\n") i += 1;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += char;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows;
}

export function rowsToObjects(csv) {
  const [headers = [], ...data] = parseCsv(csv);
  return data
    .filter((values) => values.some((value) => value.trim() !== ""))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header.trim(), values[index]?.trim() ?? ""])))
    .filter((row) => row["Student Name"]);
}

export async function fetchRows() {
  const response = await fetch(sheetUrl);
  if (!response.ok) throw new Error(`Sheet request failed (${response.status})`);
  return rowsToObjects(await response.text());
}
