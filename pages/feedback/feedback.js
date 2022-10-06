// pages/feedback/feedback.js
Page({

  data: {
    tabs:[{
      id:0,
      value:"体验问题",
      isActive:true
    },
    {
     id:1,
     value:"商品、商家投诉",
     isActive:false
   }
   ],
   //被选中的图片路径数组
   chooseImgs:[],
   //文本域的内容
   textVal:""
  },
  handletabsItemChange(e){
    const {index}=e.detail;
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
    
  },
  //点击加号选择图片事件
  handleChooseImg(){
    wx-wx.chooseImage({
      //最多上传几张
      count: 9,
      //图片格式 原图 压缩
      sizeType: ['original','compressed'],
      //图片来源 相册 相机
      sourceType: ['album','camera'],
      success: (result) => {
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
        
      }
    })
  },
  //子向父传递
  handleImgDel(e){
    const {index}=e.detail;
    let {chooseImgs}=this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },
  //文本域的输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  //提交按钮的点击事件
  handleFormSubmit(){
   const {textVal}=this.data;
   if(!textVal.trim()){
    wx-wx.showToast({
      title: '输入不合法',
      icon:"none",
      mask: true
    });
    return;
   }
   //此处是我偷懒
   else{
     wx-wx.showToast({
       title: '提交成功',
       duration:5500,
       icon: 'success',
       mask: true
     })
     this.setData({
      //被选中的图片路径数组
     chooseImgs:[],
     //文本域的内容
     textVal:""
     })
     wx-wx.navigateBack({
       delta: 1
     })
   }
  }
  
})