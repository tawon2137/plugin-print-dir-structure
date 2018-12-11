var BLANK_LEVEL = 4;
var currentInteratordepth = 0;
var isRun = false;

var reduceInterator = function(depth, ignoreDepths) {
  return function (previus, current, currentIndex, array) {
    const isFolder = typeof current === 'object';
    const isLast = currentIndex === array.length - 1;

    if(isLast) {
      switch(true) {
        case depth === 0:
          isRun = true;
          ignoreDepths = [depth];
          currentInteratordepth += BLANK_LEVEL;
          break;
        case isRun && depth === currentInteratordepth:
          ignoreDepths.push(currentInteratordepth);
          ignoreDepths = ignoreDepths.filter(function(number) {
            return number <= depth;
          });
          currentInteratordepth += BLANK_LEVEL;
        default:
          ignoreDepths.push(depth);
          ignoreDepths = ignoreDepths.filter(function(number) {
            return number <= depth;
          });
      }
    }

    return previus +
           (
             isFolder ? directoryToHTML(current, isLast, depth, ignoreDepths)
                      : fileToHTML(current, isLast, depth, ignoreDepths)
           )
  }
}


var getBlank = function (level, ignoreDepths) {
  var blank = '';
  for(var i = 0; i < level; i++) {
    if(i % BLANK_LEVEL === 0 && !ignoreDepths.includes(i)) {
      blank += '|'
    }else {
      blank += ' ';
    }
  }
  return blank
}

function directoryToHTML(directory, isLast, depth, ignoreDepths) {
  var HTML = '<span class="directory' + ' depth-' + (depth / BLANK_LEVEL) +'">' + getBlank(depth, ignoreDepths) + (isLast ? '└── ' : '├── ') + directory.name + '<\/span>\/\n'
  return Array.isArray(directory.list) && directory.list.length > 0  ? directory.list.reduce(reduceInterator((depth += BLANK_LEVEL), ignoreDepths), HTML) : HTML;
}

function fileToHTML(fileName, isLast, depth, ignoreDepths) {
  return '<span class="file' + ' depth-' + (depth / BLANK_LEVEL) +' ">' + getBlank(depth, ignoreDepths) + (isLast ? '└── ' : '├── ') + fileName + '<\/span>\n'
}


module.exports = {
  book: {
    assets: './assets',
  },
  blocks: {
    directoryStructure: {
      process: function(block) {
        const args = Array.prototype.concat.apply([], block.args)
        const html = args.reduce(reduceInterator(0, []), '<pre class="directory-structure">\n<code>\n') + '</code>\n</pre>';
        console.log(html);
        return html;
      }
    }
  }
}
