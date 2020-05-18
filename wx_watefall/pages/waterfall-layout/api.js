import { users } from './mock';

const request = function request(option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: option.url,
      method: option.method || 'POST',
      data: option.data || {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: (res) => {
        console.log('res:', res)

        resolve({
          data: {
            users: res
          }
        })
      },
      fail: (err) =>{
        reject(err)
      }
    })
  })
}

export const getUserInfo = function getUserInfo(options) {
  return request({
    url: 'http://mock.be.mi.com/mock/434/v2/index/like'
  })
}