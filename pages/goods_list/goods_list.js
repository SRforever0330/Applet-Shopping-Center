//用户上滑到底，加载下一页
//1.找到滚动条触底事件
/*2.判断还有没有下一页数据
  3.假如没有下一页，则弹出提示
  4.有就加载
*/ 
import {request} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tabs:[{
     id:0,
     value:"综合",
     isActive:true
   },
   {
    id:1,
    value:"销量",
    isActive:false
  },
  {
    id:2,
    value:"价格",
    isActive:false
  }
  ],
  goodsList:[]
  
  },

  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.QueryParams.cid=options.cid||"";
  this.QueryParams.query=options.query||"";
  this.getGoodsList();
  },
  //获取商品列表数据
  async getGoodsList(){
  const result=await request({url:"/goods/search",data:this.QueryParams});
  //获取总条数
  const total=result.total;
  //计算总页数
  this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
  // console.log(this.totalPages);
  
  this.setData({
    goodsList:[...this.data.goodsList,...result.goods]
  })
  //关闭下拉刷新等待
  wx-wx.stopPullDownRefresh();
  },
  handletabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
    
  },
  //页面触底
  onReachBottom(){
    //判断还有没有数据
    if(this.QueryParams.pagenum>=this.totalPages){
      //没有下一页
    wx-wx.showToast({title: '没有下一页数据'})     
    }else{
      //有下一页
    this.QueryParams.pagenum++;
    this. getGoodsList();
    
  }
},
//下拉刷新事件
    onPullDownRefresh(){
      //重置数组
      this.setData({
        goodsList:[]
      })
      //重置页码
      this.QueryParams.pagenum=1;
      this.getGoodsList();
    }
})