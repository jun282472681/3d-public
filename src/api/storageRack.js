import request from '@/utils/request';

// 新增漫游
export function getInventoryList(data) {
  return request({
    url: '/api/inventory/position',
    method: 'get',
    params: data,
  });
}

// 新增漫游
export function getAllInventoryList() {
  return request({
    url: '/api/inventory/list',
    method: 'post',
    data: {}
  });
}