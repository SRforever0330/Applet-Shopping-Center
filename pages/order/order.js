import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders:[],
    tabs:[{
      id:0,
      value:"全部",
      isActive:true
    },
    {
     id:1,
     value:"待付款",
     isActive:false
   },
   {
     id:2,
     value:"待发货",
     isActive:false
   },
   {
    id:3,
    value:"退款/退货",
    isActive:false
  }
   ],
  },
  onShow(options){
    const token=wx.getStorageSync('token');
    if(!token){
      wx-wx.navigateTo({
        url: '/pages/auth/auth',
      });
      return;
    }
   let pages=getCurrentPages();
   //数组中 索引最大的页面就是当前页面
   let currentPage=pages[pages.length-1];
   const {type}=currentPage.options;
   this.changeTitleByIndex(type-1);
   this.getOrders(type);
  },
  //获取订单的方法
 async getOrders(type){
 try {
  const result=await request({url:"/my/orders/all",data:{type}});
  this.setData({
   orders: result.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
  })
 } catch (error) {
   return;
 }
 },
 //根据标题索引 激活选中标题数组
  changeTitleByIndex(index){
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
 },
  handletabsItemChange(e){
    const {index}=e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index+1);
    
  },

})