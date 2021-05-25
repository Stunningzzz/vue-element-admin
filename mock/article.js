const Mock = require('mockjs');

const List = [];
const count = 100;

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri =
  'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: i + 1,
      timestamp: +Mock.Random.date('T'),
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      content_short: 'mock data',
      content: baseContent,
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      display_time: '@datetime',
      comment_disabled: true,
      pageviews: '@integer(300, 5000)',
      image_uri,
      platforms: ['a-platform'],
      source_uri: '@url',
    })
  );
}

module.exports = [
  {
    url: '/article/list',
    type: 'get',
    response: config => {
      const {
        importance,
        type,
        title,
        page = 1,
        limit = 20,
        sort,
      } = config.query;

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false;
        if (type && item.type !== type) return false;
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });

      if (sort === '-id') {
        mockList = mockList.reverse();
      }

      const pageList = mockList.filter(
        (item, index) => index >= limit * (page - 1) && index < limit * page
      );

      return {
        code: 200,
        data: {
          total: mockList.length,
          items: pageList,
        },
      };
    },
  },

  {
    url: '/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query;
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 200,
            data: article,
          };
        }
      }
    },
  },

  {
    url: '/article/pv',
    type: 'get',
    response: config => {
      let { id } = config.query,
        index = id - 1,
        pageviews = List[index].pageviews;
      keys = ['PC', 'IOS', 'Android', 'Web'];
      let pvData = keys.map((key, index) => {
        let count;
        if (index === keys.length - 1) {
          count = pageviews;
        } else {
          count = Mock.mock(`@int(${pageviews / 8},${pageviews / 2})`);
          pageviews -= count;
        }
        return {
          key,
          pv: count,
        };
      });
      return {
        code: 200,
        data: {
          pvData,
        },
      };
    },
  },

  {
    url: '/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
      };
    },
  },

  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
      };
    },
  },

  {
    url: '/article/delete',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success',
      };
    },
  },
];
