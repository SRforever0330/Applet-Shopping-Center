import {getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({  
  data:{
   address:{},
   cart:[],
   allChecked:false,
   totalPrice:0,
   totalNum:0
  },
  onShow(){
    //获取缓存中的收货地址信息
    const address=wx.getStorageSync('address');
    //获取缓存中的购物车数据
    const cart=wx.getStorageSync('cart')||[];
    this.setData({
      address
    })
    //计算全选
    // const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setCart(cart);
  },
  //点击收货地址
  async handleChooseAddress(){
   try {
    //1 获取权限状态
     const res1=await getSetting();
     const scopeAddress=res1.authSetting["scope.address"];
     //2 判断权限状态
          if(scopeAddress===true||scopeAddress==undefined){
          }else{
           await openSetting();}  
         //调用获取收获地址
           let address=await chooseAddress();
           address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
           wx-wx.setStorageSync('address', address);
   } catch (error) {
     console.log(error);
   }
  },
  //商品的选中
  handleItemChange(e){
    const goods_id=e.currentTarget.dataset.id;
    let {cart}=this.data;
    let index=cart.findIndex(v=>v.goods_id===goods_id);
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },
  //设置购物车状态同时，重新计算 底部工具栏信息
  setCart(cart){
 //重新设置到data和缓存中
   
    //复制
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }
      else{
        allChecked=false;
      }
    })
    //判断是否为空
    allChecked=cart.length!=0?allChecked:false;
    this.setData({
      cart,allChecked,totalPrice,totalNum
    }); 
    wx.setStorageSync("cart",cart);
  },
  //商品全选功能
  handleItemAllCheck(){
    let{cart,allChecked}=this.data;
    allChecked=!allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  //商品数量的编辑功能
  async handleItemNumEdit(e){
   const {operation,id}=e.currentTarget.dataset;
   let {cart}=this.data;
   const index=cart.findIndex(v=>v.goods_id===id);
   //判断是否要执行删除
   if (cart[index].num === 1 && operation === -1) {
    // 4.1 弹窗提示
    const result = await showModal({ content: "您是否要删除？" });
    if (result.confirm) {
      cart.splice(index, 1);
      this.setCart(cart);
    }
  } else {
    // 4  进行修改数量
    cart[index].num += operation;
    // 5 设置回缓存和data中
    this.setCart(cart);
  }
  },
  //点击结算功能
  async handlePay(){
    //判断地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      await showToast({title:"您还未选择收货地址"});
      return;
    }
    //判断有没有选购商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
  })
