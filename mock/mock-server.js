const chokidar = require('chokidar');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const Mock = require('mockjs');

// 不会打印!!
console.log('mock-server-js');

// 表示mock文件夹
const mockDir = path.join(process.cwd(), 'mock');

function registerRoutes(app) {
  let mockLastIndex;
  const { mocks } = require('./index.js');
  // mocksForServer 和 mocks的区别是
  // 1:url都被包装成了正则 2:添加默认type 3:respond 从 config => {...} 变成了 (request,response) => {...}
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response);
  });
  for (const mock of mocksForServer) {
    // app.get(url,callback)
    app[mock.type](mock.url, mock.response);
    mockLastIndex = app._router.stack.length;
  }
  const mockRoutesLength = Object.keys(mocksForServer).length;
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  };
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)];
    }
  });
}

// for mock server
// url / type / respond 都是Mock模块所导出的route对象的属性
const responseFake = (url, type, respond) => {
  return {
    // 因为在前面还需要添加东西 如果url是正则的话根本拼接不了 所以只能是字符串 
    // 既然都是字符串了 那如果我写的url是要正则呢? 所以不如全部都转成正则吧
    // 注意事项就是: 原来的单反斜杠变成双反斜杠 如 \d => \\d 
    // 而如果本来的url是要表示字符串的话 注意一些特殊字符
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      setTimeout(() => {
        console.log('request invoke:' + req.path);
        res.json(
          Mock.mock(respond instanceof Function ? respond(req, res) : respond)
        );
      }, 300);
    },
  };
};

module.exports = app => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  // 这个app就是 express对象
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  const mockRoutes = registerRoutes(app);
  var mockRoutesLength = mockRoutes.mockRoutesLength;
  var mockStartIndex = mockRoutes.mockStartIndex;

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routes stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength);

          // clear routes cache
          unregisterRoutes();

          const mockRoutes = registerRoutes(app);
          mockRoutesLength = mockRoutes.mockRoutesLength;
          mockStartIndex = mockRoutes.mockStartIndex;

          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`
            )
          );
        } catch (error) {
          console.log(chalk.redBright(error));
        }
      }
    });
};
