import request from './request';

export function transactionList(query) {
  return request({
    url: '/dashboard/transaction-list',
    method: 'get',
    params: query
  })
}

export function treeChart(){
  return request({
    url: '/dashboard/tree',
    method: 'get',
  })
}

export function barLineChart(){
  return request({
    url: '/dashboard/bar-line',
    method: 'get',
  })
}

export function pieChart(){
  return request({
    url: '/dashboard/pie',
    method: 'get',
  })
}

export function subBurstChart(){
  return request({
    url: '/dashboard/sun-burst',
    method: 'get',
  })
}


