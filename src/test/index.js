let path = require('path');
console.log(path.join('/abc'));

console.log(path.resolve('/foo','/bar','./here') ); //=> /bar/here
//=> 1覆盖0 2覆盖1
console.log(path.resolve('/foo','/bar','/here'));//=> /here