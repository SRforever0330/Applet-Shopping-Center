import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    //导航数据
    catesList:[],
    //楼层数据
    floorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(result)=>{
    //     this.setData({
    //       swiperList:result.data.message       

    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList(){
    request({url:'/home/swiperdata'})
    .then(result=>{
      this.setData({
              swiperList:result       
            })
    })
  },
  //获取导航数据
  getCatesList(){
    request({url:'/home/catitems'})
    .then(result=>{
      this.setData({
              catesList:result      
            })
    })
  },
  getFloorList(){
    request({url:'/home/floordata'})
    .then(result=>{
      for(let k=0;k<result.length;k++){
        result[k].product_list.forEach((v,i)=>{
          result[k].product_list[i].navigator_url=v.navigator_url.replace('?','/goods_list?');
        })
      }
      this.setData({
              floorList:result     
            })
    })
  },
});