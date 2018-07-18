// pages/posts/posts-text/text.js
var postsData = require('../../../data/data.js');
Page({
  data: {},
  //接收主组件传递的id值
  onLoad: function(options) {
    var id = options.id
    this.data.currentPostId = id
    var postData = postsData.postlist[id];
    this.setData({
      postData: postData
    })
    var postsCollected = wx.getStorageSync("posts_collected")
    if (postsCollected) {
      var postCollected = postsCollected[id];
      this.setData({
        collected: postsCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[id] = false
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  onColletionTap: function() {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏与未收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新文章是否收藏得缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 500,
      icon: "success"
    })
  },
  onshare: function(e) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到qq",
      "分享到微薄"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        // res.cancel
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能",
          success: function() {
            wx.showToast({
              title: "分享成功",
              icon: "success",
              duration: 2000
            })
          }
        })
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: "文章详情",
      path: "/pages/posts-text/text",
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