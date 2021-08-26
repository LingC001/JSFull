import axios from 'axios'

const _base_url = '/api/records'

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
