import request from '@/utils/request';

// 新增漫游
export function addCusRoam(data) {
  return request({
    url: '/api/cusRoam/save',
    method: 'post',
    data,
  });
}

// 漫游查询
export function getCusRoamList() {
  return request({
    url: '/api/cusRoam/list',
    method: 'get',
  });
}

// 新增巡检组合
export function addPollCom(data) {
  return request({
    url: '/api/pollCom/save',
    method: 'post',
    data,
  });
}

// 巡检查询
export function getPollComList(params) {
  return request({
    url: '/api/pollCom/list',
    method: 'get',
    params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

