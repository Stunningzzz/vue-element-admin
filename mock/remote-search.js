const Mock = require('mockjs');

const NameList = [];
const count = 100;

for (let i = 0; i < count; i++) {
  let name = Mock.mock('@first');
  NameList.includes(name) || NameList.push(name); 
}

module.exports = [
  // username search
  {
    url: '/search/author',
    type: 'get',
    response: config => {
      const { name } = config.query;
      const mockNameList = NameList.filter(
        item => !name || item.toLowerCase().startsWith(name.toLowerCase())
      );
      return {
        code: 200,
        data: { items: mockNameList },
      };
    },
  },
];
