import request from './request'

export function searchAuthor(name) {
  return request({
    url: '/search/author',
    method: 'get',
    params: { name }
  })
}


