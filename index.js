var BLANK_LEVEL = 4;

var reduceInterator = function(depth) {
  return function (previus, current, currentIndex, array) {
    const isFolder = typeof current === 'object';
    const isLast = currentIndex === array.length - 1;
    return previus + (isFolder ? directoryToHTML(current, isLast, depth) : fileToHTML(current, isLast, depth))
  }
}


var getBlank = function (level) {
  var blank = '';
  for(var i = 0; i < level; i++) {
    blank += ' ';
  }
  return blank
}

function directoryToHTML(directory, isLast, depth) {
  var HTML = getBlank(depth) + '<span class="directory">' + (isLast ? '└── ' : '├── ') + directory.name + '<span>\n';

  return Array.isArray(directory.list) && directory.list.length > 0  ? directory.list.reduce(reduceInterator((depth += BLANK_LEVEL)), HTML) : HTML;
}

function fileToHTML(fileName, isLast, depth) {
  return  getBlank(depth) + '<span class="file">' + (isLast ? '└── ' : '├── ') + fileName + '<span>\n'
}




/**
 * <pre><code>.
|   ...
├── src/
|   ├── assets/
|   ├── img/
|   └── fonts/
|   ...
...
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md
</code></pre>
 *
 *
 */


module.exports = {
  book: {
    assets: './assets',
  },
  blocks: {
    directoryStructure: {
      process: function(block) {
        const args = Array.prototype.concat.apply([], block.args)
        const html = args.reduce(reduceInterator(0), '<pre>\n<code>\n') + '</code>\n</pre>';
        console.log(html);
        return html;
      }
    }
  }
}
