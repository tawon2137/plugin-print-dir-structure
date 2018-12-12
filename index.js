var BLANK_LEVEL = 4;
var currentInteratordepth = 0;
var isLastLine = false;

var reduceInterator = function(depth, ignoreDepths) {
  return function (previous, current, currentIndex, array) {
    var isDirectory = typeof current === 'object';
    var isLastIndex = currentIndex === array.length - 1;
    var copyDepth = depth;
    if(isLastIndex) {
      switch(true) {
        case depth === 0:
          isLastLine = true
          ignoreDepths = [depth];
          currentInteratordepth += BLANK_LEVEL;
          break;
        case isLastLine:
          ignoreDepths.push(depth);
          ignoreDepths = ignoreDepths.filter(function(number) {
            return number <= depth;
          });
          depth === currentInteratordepth && (currentInteratordepth += BLANK_LEVEL);
      }
    }

    var row = {
      name: isDirectory ? current.name + '/' : current,
      blank: getBlank(depth, ignoreDepths),
      depth: depth / BLANK_LEVEL + 1,
      isDirectory: isDirectory,
      line: (isLastIndex ? '└──' : '├──')
    }
    previous.push(row);


    if(isDirectory && Array.isArray(current.list) && current.list.length > 0) {
      return previous.concat(
        current.list.reduce(reduceInterator((copyDepth += BLANK_LEVEL), ignoreDepths), [])
      )
    }

    return previous;
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

function renderToHTML(data) {
  var startHTML = '<pre class="directory-structure">\n<code>\n' ;
  var endHTML = '</code>\n</pre>';

  return data.reduce(function(html, current) {
    return html + (current.blank + current.line + current.name) + '\n'
  }, startHTML)  + endHTML
}

module.exports = {
  book: {
    assets: './assets',
  },
  filters: {
    directoryStructure: function(arr) {
        if(typeof arr === 'string') {
          arr = JSON.parse(arr);
        }
        var args = arr;
        var data = args.reduce(reduceInterator(0, []), ['.']);

        return renderToHTML(data);
    }
  }
}
