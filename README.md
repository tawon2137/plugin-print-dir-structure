# print-dir-structure

---

Include JSON Directory Data as HTML Format code block to your GitBook.


### example
> Sample directory structure
```
├──...
├──src/
|   ├──assets/
|   |   └──css/
|   |   |   ├──...
|   |   |   └──index.css
|   ├──components/
|   ├──config/
|   ├──core/
|   ├──lib/
|   ├──App.js
|   ├──init.js
|   └──main.js
├──...
└──dist/
    ├──assets/
    |   └──css/
    |       ├──...
    |       └──index.css
    ├──components/
    ├──config/
    ├──core/
    ├──lib/
    ├──App.js
    ├──init.js
    └──main.js
```

> mock Data /assets/mock.js

```javascript
var mockJSON = [
  "...",
  {
    "name": "src",
    "list": [
      {
        "name": "assets",
        "list": [
          {
            "name": "css",
            "list": [
              "...",
              "index.css"
            ]
          },
        ]
      },
      {
        "name": "components"
      },
      {
        "name": "config"
      },
      {
        "name": "core"
      },
      {
        "name": "lib"
      },
      "App.js",
      "init.js",
      "main.js"
    ]
  },
  "...",
  {
    "name": "dist",
    "list": [
      {
        "name": "assets",
        "list": [
          {
            "name": "css",
            "list": [
              "...",
              "index.css"
            ]
          },
        ]
      },
      {
        "name": "components"
      },
      {
        "name": "config"
      },
      {
        "name": "core"
      },
      {
        "name": "lib"
      },
      "App.js",
      "init.js",
      "main.js"
    ]
  },
]

```
