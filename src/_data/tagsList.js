const fs = require("fs");
const path = require("path");

function slugify(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

module.exports = function() {
  const postsDir = path.join(__dirname, "../posts");
  const tagSet = new Set();

  fs.readdirSync(postsDir).forEach(file => {
    if (file.endsWith(".md")) {
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const match = content.match(/tags:\s*\[(.*?)\]/s);
      if (match) {
        const tags = match[1].split(",").map(t => t.replace(/['"\s]/g, "")).filter(Boolean);
        tags.forEach(tag => {
          if (tag !== "post" && tag !== "tagPage") tagSet.add(slugify(tag));
        });
      }
    }
  });
  return Array.from(tagSet);
}; 