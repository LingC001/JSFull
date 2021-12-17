import axios from 'axios'

const _base_url = '/api/records'

/**
 * 存储计算结果
 * @param params {Number} params.calValue 前端计算的结果
 * @return {Promise<unknown>}
 */
export const saveCalResult = params => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${_base_url}`, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
