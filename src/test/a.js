let path = require('path');
console.log(path.join('/foo', './bar', 'here')); //=> /foo/bar/here
console.log(path.resolve('/foo', '/bar', '/here').length); //=> webpack下 /here node下 c:/here  
