let Mock = require('mockjs');
let techStack = Mock.mock([
  {
    name: 'Front-End',
    children: [
      {
        name: 'HTML',
        children: [
          {
            name: 'Jade',
            'value|1-10': 0,
          },
          {
            name: 'Pug',
            'value|1-10': 0,
          },
        ],
      },
      {
        name: 'CSS',
        children: [
          {
            name: 'Sass',
            'value|5-10': 0,
          },
          {
            name: 'Less',
            'value|10-15': 0,
          },
          {
            name: 'Stylus',
            'value|10-1': 0,
          },
          {
            name: 'Scss',
            'value|3-6': 0,
          },
        ],
      },
      {
        name: 'JavaScript',
        children: [
          {
            name: 'ECMA Script',
          },
          {
            name: 'AJAX',
            children: [
              {
                name: 'Axios',
                'value|3-6': 0,
              },
            ],
          },
          {
            name: 'Vue',
            children: [
              {
                name: 'Vue-Router',
                'value|10-15': 0,
              },
              {
                name: 'VueX',
                'value|8-10': 0,
              },
              {
                name: 'ElementUI',
                'value|20-25': 0,
              },
              {
                name: 'Vant',
                'value|10-20': 0,
              },
            ],
          },
        ],
      },
    ],
  },
]);

module.exports = [
  // 树状图
  {
    url: '/dashboard/tree',
    type: 'get',
    response: {
      code: 200,
      data: techStack,
    },
  },
  // 折线图
  {
    url: '/dashboard/bar-line',
    type: 'get',
    response: {
      code: 200,
      data: {
        peoples: {
          itemClass: 'peoples',
          itemDesc: 'New Visits',
          'itemNum|10000-99999': 0,
          'expectedData|10': ['@natural(100,200)'],
          'actualData|10': ['@natural(90,180)'],
        },
        message: {
          itemClass: 'message',
          itemDesc: 'Messages',
          'itemNum|10000-99999': 0,
          'expectedData|10': ['@natural(80,185)'],
          'actualData|10': ['@natural(120,150)'],
        },
        money: {
          itemClass: 'money',
          itemDesc: 'Puchases',
          'itemNum|10000-99999': 0,
          'expectedData|10': ['@natural(150,200)'],
          'actualData|10': ['@natural(170,180)'],
        },
        shopping: {
          itemClass: 'shopping',
          itemDesc: 'Shoppings',
          'itemNum|10000-99999': 0,
          'expectedData|10': ['@natural(130,200)'],
          'actualData|10': ['@natural(100,180)'],
        },
      },
    },
  },
  // 玫瑰图
  {
    url: '/dashboard/pie',
    type: 'get',
    response: {
      code: 200,
      data: [
        {
          'value|300-350': 0,
          name: 'Industries',
          itemStyle: { color: '#5470C6' },
          label: { color: '#5470C6' },
        },
        {
          'value|250-280': 0,
          name: 'Technology',
          itemStyle: { color: '#91CC75' },
          label: { color: '#91CC75' },
        },
        {
          'value|200-240': 0,
          name: 'Forex',
          itemStyle: { color: '#FAC858' },
          label: { color: '#FAC858' },
        },
        {
          'value|135-150': 0,
          name: 'Science',
          itemStyle: { color: '#EE6666' },
          label: { color: '#EE6666' },
        },
        {
          'value|50-80': 0,
          name: 'Biology',
          itemStyle: { color: '#3BA272' },
          label: { color: '#3BA272' },
        },
        {
          'value|30-50': 0,
          name: 'Physical',
          itemStyle: { color: '#2EC7C9' },
          label: { color: '#2EC7C9' },
        },
      ],
    },
  },
  // 旭日图
  {
    url: '/dashboard/sun-burst',
    type: 'get',
    response: {
      code: 200,
      data: techStack,
    },
  },
  // 表格 transaction list
  {
    url: '/dashboard/transaction-list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        data: {
          total: 20,
          'items|20': [
            {
              order_no: '@guid',
              timestamp: `@time('T')`,
              username: '@name',
              price: '@float(1000, 15000, 0, 2)',
              'status|1': ['success', 'pending'],
            },
          ],
        },
      };
    },
  },
];
