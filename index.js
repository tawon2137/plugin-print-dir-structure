var BLANK_LEVEL = 4;

var reduceInterator = function(depth, ignoreDepths) {
  return function (previous, current, currentIndex, array) {
    var isDirectory = typeof current === 'object';
    var isLastIndex = currentIndex === array.length - 1;
    var copyDepth = depth;

    if(isLastIndex) {
      ignoreDepths.push(depth);
    }

    if(currentIndex === 0) {
      ignoreDepths = ignoreDepths.filter(function(number) {
        return number <= depth;
      });
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
  var startHTML = '<pre class="directory-structure"><code>\.\n' ;
  var endHTML = '</code></pre>';

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
        var data = args.reduce(reduceInterator(0, []), []);

        data.forEach(item => {
          console.log(item.blank + item.line + item.name)
        })

        return renderToHTML(data);
    }
  }
}
