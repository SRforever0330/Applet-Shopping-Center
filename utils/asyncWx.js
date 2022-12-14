//promise形式的getSetting
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
  })
}
//promise形式的chooseAddress
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    });
  })
}
/**
 * promise 形式  openSetting
 */
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

export const showModal=({content})=>{
  return new Promise((resolve,reject)=>{
    wx.showModal({
      title: '提示',
      content: content,
      success :(result) =>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
export const showToast=({title})=>{
  return new Promise((resolve,reject)=>{
    wx.showToast({
      title: title,
      icon:'none',
      success :(result) =>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}


 export const login=()=>{
    return new Promise((resolve,reject)=>{
      wx-wx.login({
        timeout: 10000,
        success: (result) => {
          resolve(result);
        },
        fail:(err)=>{
          reject(err);
        }
    })
  })
}
//微信支付必要参数
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
   wx-wx.requestPayment({
     ...pay,
     success: (result) => {
       resolve(result);
     },
     fail: (err) => {
       reject(err);
     }
   })
})
}