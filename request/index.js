//同时发送异步请求代码的次数
let ajaxTime=0;
export const request=(params)=>{
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }

  ajaxTime++;
  //显示加载中效果
  wx-wx.showLoading({
    title: '加载中',
    mask: true
  });
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
   return new Promise((resolve,reject)=>{
    wx.request({ 
      ...params,
      header,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
          reject(err);
        },
      complete:()=>{
         ajaxTime--;
         if(ajaxTime===0){
           wx.hideLoading();
         }
      }
    });
   
})
}