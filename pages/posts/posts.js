// pages/posts/posts.js
var postsData = require('../../data/data.js');
Page({
  data: {
    imgurl: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ]
  },
  onLoad: function(options) {
    this.setData({
      posts_key: postsData.postlist
    });

  },
  onPostTap: function(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: 'posts-text/text?id=' + id,
    })
  },
  onSwiper: function(event) {
    var id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: 'posts-text/text?id=' + id,
    })
  },
  onShareAppMessage: function() {
    return {
      title: "文与字",
      path: "/pages/posts/posts",
      success: function() {
        wx.showToast({
          title: "转发成功",
          icon: "success",
          duration: 2000
        })
      }
    }
  },
})