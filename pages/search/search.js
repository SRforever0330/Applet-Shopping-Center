import {request} from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  data: {
    goods:[],
    //取消按钮是否显示
    isFocus:false,
    inputValue:""

  },
  TimeId:-1,
  //输入框改变触发事件
  handleInput(e){
    //获取输入值
    const {value}=e.detail;
    //判断合法性
    if(!value.trim()){
      //不合法
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    //准备发送请求获取数据
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },
  //发送请求函数
  async qsearch(query){
    const result=await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods:result
    })
    
  },
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })
  }

 
})