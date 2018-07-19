// pages/posts/posts-text/text.js
var postsData = require('../../../data/data.js');
var app = getApp();
Page({
  data: {
    isplaymusic: false
  },
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
    //音乐
    if (app.globalData.g_isplaymusic && app.globalData.g_currentMusicPostId===id) {
      this.setData({
        isplaymusic: true
      })
    }
    this.setMuiscMonitor();
  },
  //监听音乐播放与暂停
  setMuiscMonitor: function() {
    var that = this
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isplaymusic: true
      })
      app.globalData.g_isplaymusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function() {
      that.setData({
        isplaymusic: false
      })
      app.globalData.g_isplaymusic = false;
      app.globalData.g_currentMusicPostId=null;
    })
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
          },
        })
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: "文章详情",
      path: "/pages/posts-text/text",
      success: function () {
        // 转发成功
        console.log("转发成功");
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败");
      }
      // success: function() {
      //   wx.showToast({
      //     title: "转发成功",
      //     icon: "success",
      //     duration: 2000
      //   })
      // }
    }
  },
  //音乐播放
  onMusic: function(event) {
    var currentPostId = this.data.currentPostId
    var isplaymusic = this.data.isplaymusic
    if (isplaymusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isplaymusic: false
      })

    } else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postlist[currentPostId].music.url,
        title: postsData.postlist[currentPostId].music.title,
        coverimgUrl: postsData.postlist[currentPostId].music.coverImg,
      })
      this.setData({
        isplaymusic: true
      })
    }
  },
})