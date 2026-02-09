const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 3005;
const DB_FILE = "./links.json";

// если файла нет создаём
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, "{}");
}

// читаем базу
function readLinks() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

// сохраняем базу
function saveLinks(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// генерация короткого кода
function genCode() {
  return Math.random().toString(36).substring(2, 7);
}

app.post("/shorten", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ ok: false, error: "url required" });
  }

  const links = readLinks();
  const code = genCode();

  links[code] = url;
  saveLinks(links);

  res.json({
    ok: true,
    code,
    short: `http://127.0.0.1:${PORT}/${code}`
  });
});

app.get("/:code", (req, res) => {
  const links = readLinks();
  const code = req.params.code;

  if (!links[code]) {
    return res.status(404).send("Not found");
  }

  res.redirect(links[code]);
});

app.listen(PORT, () => {
  console.log("URL Shortener running on http://127.0.0.1:" + PORT);
});
