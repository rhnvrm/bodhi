"""Check links and search in the example site built below /preview/."""

import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

SITE = "https://example.com/preview/"
ORIGIN = urlsplit(SITE)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.targets = []

    def handle_starttag(self, tag, attrs):
        self.targets.extend(
            value for key, value in attrs
            if key in ("href", "src", "action", "data-index-url") and value
        )


def main(output):
    pages = ("index.html", "blog/index.html", "archive/index.html", "tags/index.html",
             "search/index.html", "blog/2019/markdown-syntax/index.html")
    for page in pages:
        document = Links()
        document.feed((output / page).read_text(encoding="utf-8"))
        for target in document.targets:
            current = page.removesuffix("index.html")
            url = urlsplit(urljoin(SITE + current, target))
            if (url.scheme, url.netloc) != (ORIGIN.scheme, ORIGIN.netloc):
                continue
            path = unquote(url.path)
            assert path.startswith(ORIGIN.path), f"{page}: {target} escapes {ORIGIN.path}"
            destination = output / path.removeprefix(ORIGIN.path)
            assert destination.is_file() or (destination / "index.html").is_file(), (
                f"{page}: {target} has no generated file"
            )

    index = json.loads((output / "index.json").read_text(encoding="utf-8"))
    assert "Markdown Syntax Guide" in {entry["title"] for entry in index}
    assert all(urlsplit(entry["permalink"]).path != "/preview/search/" for entry in index)


if __name__ == "__main__":
    main(Path(sys.argv[1]))
