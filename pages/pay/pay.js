import {getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from"../../request/index.js";
Page({  
  data:{
   address:{},
   cart:[],
   totalPrice:0,
   totalNum:0
  },
  onShow(){
    //获取缓存中的收货地址信息
    const address=wx.getStorageSync('address');
    //获取缓存中的购物车数据
    let cart=wx.getStorageSync('cart')||[];
    //过滤后的购物车数组
    cart=cart.filter(v=>v.checked);
    //复制
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
    })
    this.setData({
      cart,totalPrice,totalNum,address
    }); 
  },
  //点击支付按钮
  async handleOrderPay(){
  try {
      //判断缓存中有没有token
  const token=wx.getStorageSync('token');
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/auth'
    })
    return;
  }
  //创建订单
  //3.1 准备头参数
  // const header={Authorization:token};
  //3.2 准备请求体参数
  const order_price=this.data.totalPrice;
  const consignee_addr=this.data.address.all;
  const cart=this.data.cart;
  let goods=[];
  cart.forEach(v=>goods.push({
    goods_id:v.goods_id,
    goods_number:v.num,
    goods_price:v.goods_price
  }))
  const orderParams={order_price,consignee_addr,goods};
  //准备发送请求，创建订单,获取订单编号
  const {order_number}=await request({url:"/my/orders/create",method:"post",data:orderParams});
  //发起预支付的接口
  const {pay}=await request({url:"/my/orders/req_unifiedorder",method:"post",data:{order_number}})
  //发起微信支付  未许可！！！
  await requestPayment(pay);
  //查询后台订单状态
  const result=await request({url:"/my/orders/chkOrder",method:"post",data:{order_number}})
  await showToast({title:"支付成功"});
  //手动删除缓存中的已经支付了的商品
  let newCart=wx.getStorageSync('cart');
  newCart=newCart.filter(v=>!v.checked);
  wx.setStorageSync('cart', newCart);
  //跳转到订单页面
  wx-navigateTo({
    url:"/pages/order/order"
  });
  } catch (error) {
    console.log(error);
    await showToast({title:"支付失败"});
  }
  
  }


  })
