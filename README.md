# Bodhi - Hugo Theme

Bodhi is a simple, minimal, personal website theme for Hugo.

[Hugo Themes](https://themes.gohugo.io/themes/bodhi/) | [Github](https://github.com/rhnvrm/bodhi)

## Previews

![preview](https://rohanverma.net/projects/bodhi/preview.png)

![preview_dark](https://rohanverma.net/projects/bodhi/preview_dark.png)

## Features

- Google and Fathom Analytics integration
- Syntax highlighting
- Dark mode
- Twitter cards and opengraph tags support
- Disqus and Commento comments
- RSS feeds
- AddToAny support
- Inbuilt Search Support
- Minimal post metadata like Reading Time
- Simple pagination with page indicators
- Two navigation menus
  - Menu bar with left/right split
  - Navigation bar with custom tree
  
## Hugo versions

Bodhi v0.2 requires Hugo 0.158.0 or newer. Use Bodhi v0.1.2 if you need Hugo 0.70.0 support or the legacy template paths. For a theme installed as a submodule, pin the compatibility release with `git -C themes/bodhi checkout v0.1.2` and commit the updated submodule pointer in your site.

If you override theme templates in your site, update their paths before upgrading:

| v0.1 path | v0.2 path |
| --- | --- |
| `layouts/_default/baseof.html` | `layouts/baseof.html` |
| `layouts/_default/single.html` | `layouts/page.html` |
| `layouts/_default/list.html` | `layouts/list.html` |
| `layouts/_default/terms.html` | `layouts/taxonomy.html` |
| `layouts/_default/article.html` and `layouts/_default/search.html` | `layouts/article.html` and `layouts/search.html` |
| `layouts/_default/index.json` | `layouts/home.json` |
| `layouts/index.html` | `layouts/home.html` |
| `layouts/section/archive.html` | `layouts/archive/section.html` |
| `layouts/partials/` | `layouts/_partials/` |

Rename the `languageCode` setting to `locale`. The archive now follows `params.mainSections`, like the home feed. If your archive lives at a custom section path, move or copy its section template to the matching directory under `layouts/`.

## Get Started

### Clone as submodule in your hugo site

```
git submodule add https://github.com/rhnvrm/bodhi themes/bodhi
```

### Sample Config

After cloning the submodule, you can need to update your hugo config.toml

You can use the following sample config file:

```toml
baseURL = "https://rohanverma.net/"
locale = "en-US"
title = "Rohan Verma"
theme = "bodhi"

[services.googleAnalytics]
    id = "G-XXXXXXXXXX"

[params]
    subtitle = "(rhnvrm)"
    avatar = "/images/avatar.jpg"
    author = "Rohan Verma"
    commentoSrc = "https://commento.myselfhostedinstance.net/js/commento.js"
    footerMessage = "Feel free to use the content of this website with appropriate attribution to the author."

[[menu.main]]
name = "home"
url = "/"
weight = 1

[[menu.main_right]]
name = "contact"
url = "/contact/"
weight = 1

[[menu.nav]]
name = "projects"
url = "/projects"
weight = 2

[[menu.nav]]
parent = "projects"
name = "bodhi"
url = "/projects/bodhi"
weight = 1

[[menu.nav]]
name = "blogs"
url = "/blog"
weight = 1

[[menu.nav]]
parent = "blogs"
name = "archive"
url = "/archive"
weight = 1

[[menu.nav]]
parent = "blogs"
name = "tags"
url = "/tags"
weight = 2

[[menu.nav]]
parent = "blogs"
name = "categories"
url = "/categories"
weight = 3

[outputs]
  home = ["HTML", "RSS", "JSON"]

[params.fathomAnalytics]
    siteID = "XXXXX"
    serverURL = "https://fathom.myselfhostedinstance.net"

[markup]
  [markup.highlight]
    codeFences = true
    guessSyntax = true
    lineNoStart = 1
    noClasses = false
    tabWidth = 4
```

### Enable search

Keep `JSON` in the home outputs above and copy `exampleSite/content/search.md` to your site's `content/search.md`, or create a page at that path with `layout: search` in its front matter. Set `params.disableSearch = true` to hide the menu link.

The Fathom configuration above uses the legacy self-hosted tracker. For hosted Fathom, use the embed script from your Fathom dashboard.

## Inspiration - suckless

[suckless](https://suckless.org) is known for their focus on simplicity and clarity. Their website is a good example of simple website design. I really liked how they use the two-column design as a mini-sitemap. This tree layout, is something that is familiar and intuitive to a lot of people. This inspired me to build [Bodhi](/projects/bodhi) to have a two-column layout with the column showing a tree like column on the left. 
