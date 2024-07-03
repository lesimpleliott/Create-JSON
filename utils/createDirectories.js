const fs = require("fs");
const path = require("path");

const createDirectories = (outputDir, album) => {
  const albumDir = path.join(outputDir, album);
  const hdDir = path.join(albumDir, "hd");
  const displayDir = path.join(albumDir, "display");

  if (!fs.existsSync(hdDir)) {
    fs.mkdirSync(hdDir, { recursive: true });
  }
  if (!fs.existsSync(displayDir)) {
    fs.mkdirSync(displayDir, { recursive: true });
  }

  return { hdDir, displayDir };
};

module.exports = { createDirectories };
