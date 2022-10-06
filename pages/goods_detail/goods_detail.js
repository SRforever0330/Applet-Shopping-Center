import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  data: {
  goodsObj:{},
  isCollect:false
  },
  //商品对象
  GoodsInfo:{},
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  //获取商品详情数据
  async getGoodsDetail(goods_id){
    const result=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=result;
     // 1 获取缓存中的商品收藏的数组
     let collect = wx.getStorageSync("collect") || [];
     // 2 判断当前商品是否被收藏
     let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:result.goods_name,
        goods_price:result.goods_price,
        goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:result.pics
      },
      isCollect
    })
    
  },
  handlePreviewImage(e){
    const current=e.currentTarget.dataset.url;
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
    wx-wx.previewImage({
      urls,
      current
    })
    
  },
  handleCartAdd(){
    let cart=wx.getStorageSync("cart")||[];
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      //不存在购物车里
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })
  },
  handleCollect(){
    let isCollect=false;
    let collect=wx.getStorageSync("collect")||[];
    let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    //当index不等于-1表示已经被收藏过
    if(index!==-1){
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
          title: '取消成功',
          icon: 'success',
          mask:true
      });
    }else{
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask:true
    });
    }
    wx.setStorageSync("collect",collect);
    this.setData({
      isCollect
    })
  }

  
})