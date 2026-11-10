const summaryInclude = 60;
const fuseOptions = {
  shouldSort: true,
  threshold: 0.0,
  tokenize: true,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: "title", weight: 0.8 },
    { name: "contents", weight: 0.5 },
    { name: "tags", weight: 0.3 },
    { name: "categories", weight: 0.3 }
  ]
};

const searchQuery = new URLSearchParams(window.location.search).get("s");
const searchResults = $("#search-results");
// Sites with a local copy of the old search layout still provide baseURL.
const indexURL = searchResults.attr("data-index-url") ||
  (typeof baseURL === "string" ? new URL("index.json", baseURL).href : null);

if (searchQuery) {
  $("#search-query").val(searchQuery);
  if (indexURL) {
    executeSearch(searchQuery);
  } else {
    showMessage("Search index is unavailable");
  }
} else {
  showMessage("Please enter a word or phrase above");
}

function showMessage(message) {
  searchResults.append($("<p>").text(message));
}

function executeSearch(query) {
  $.getJSON(indexURL).done(function (pages) {
    const results = new Fuse(pages, fuseOptions).search(query);
    if (results.length > 0) {
      populateResults(results, query);
    } else {
      showMessage("No matches found");
    }
  }).fail(function () {
    showMessage("Search index is unavailable");
  });
}

function populateResults(results, query) {
  const template = $("#search-result-template").html();

  results.forEach(function (item, key) {
    let link = "#";
    try {
      const url = new URL(item.permalink, document.baseURI);
      if (url.protocol === "http:" || url.protocol === "https:") {
        link = url.href;
      }
    } catch {
      // Keep malformed links inert.
    }

    const output = render(template, {
      key,
      title: item.title,
      link,
      tags: item.tags,
      categories: item.categories,
      snippet: item.contents.substring(0, summaryInclude * 2)
    });
    searchResults.append(output);
    $("#summary-" + key).mark(query);
  });
}

function render(template, data) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return template
    .replace(/\$\{\s*isset (\w+)\s*\}(.*?)\$\{\s*end\s*\}/g, (_, key, content) =>
      data[key]?.length ? content : "")
    .replace(/\$\{\s*(\w+)\s*\}/g, (_, key) =>
      String(data[key] ?? "").replace(/[&<>"']/g, character => entities[character]));
}
