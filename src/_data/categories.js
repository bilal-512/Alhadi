module.exports = function(collections) {
  let categorySet = new Set();
  if (collections && Array.isArray(collections.all)) {
    collections.all.forEach(function(item) {
      if ("category" in item.data) {
        let category = item.data.category;
        categorySet.add(category);
      }
    });
  }
  // returning an array in addition to Set because you can't get a specific item from a set.
  return [...categorySet];
};
