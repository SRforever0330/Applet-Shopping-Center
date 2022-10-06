import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //左侧的菜单数据
  leftMenuList:[],
  //右侧的商品数据
  rightContent:[],
  //被选中的索引
  currentindex:0,
  //右侧内容滚动条顶部距离
  scrollTop:0
  },
  //接口返回数据
  Cates:[],

  onLoad: function (options) {
    //判断有无旧数据
    const Cates=wx.getStorageSync("cates");
    if(!Cates){
      this.getCates();
    }else{
      //有旧的数据
      if(Date.now()-Cates.time>1000*300){
        this.getCates();
      }else{
        //可以使用旧数据
        this.Cates=Cates.data;
        //构造左侧大菜单数据
        let leftMenuList=this.Cates.map(v=>v.cat_name);
        //构造右侧商品数据
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  
  },
  //获取分类数据
  
  async getCates(){
    // request({
    //   url:"/categories"
    // })
    // .then(result=>{
    //   this.Cates=result.data.message;
    //   //把数据存入到本地存储中
    //    wx-wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
    //   //构造左侧大菜单数据
    //   let leftMenuList=this.Cates.map(v=>v.cat_name);
    //   //构造右侧商品数据
    //   let rightContent=this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })
    //使用es7的async await发送请求
    const result=await request({url:"/categories"});
    this.Cates=result;
     //把数据存入到本地存储中
    wx-wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      //构造左侧大菜单数据
    let leftMenuList=this.Cates.map(v=>v.cat_name);
      //构造右侧商品数据
    let rightContent=this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
      })
  },
  //左侧点击事件
  handleItemTap(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].children;
    this.setData({
      currentindex:index,
      rightContent, 
      //重新设置右侧的滚动条开始位置
      scrollTop:0
    })
  
    
  }


  
})