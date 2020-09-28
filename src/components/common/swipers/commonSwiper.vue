<!--
 * @Description: 公共轮播图
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-07-15 14:53:29
 * @LastEditors: cherry
 * @LastEditTime: 2020-08-12 16:37:53
--> 
<template>
  <div class="common-swiper">
    <van-swipe class="swiper-box common-swiper-item" :height="height" :autoplay="flag ? 3000 : 0"  :loop="loop" indicator-color="white" @change="onChange">
      <van-swipe-item v-for="(item,index) in imgUrls" :key="index" class="common-swiper-item">
        <!-- && index === current -->
        <div class='video-item' v-if="item.type === 'video'">
          <img :src="item[urlName]" @click="play(item, index)" class="video-bgc wh" v-if="!videoAutoplay && item[urlName]">
          <video
              :id="'myVideo' + index"
              :src="item.video"
              style="width: 100%; height: 100%; object-fit: fill;"
              preload="auto"
              playsinline="true"
              webkit-playsinline="true"
              x5-playsinline="true"
              x-webkit-airplay="true"
              x5-video-player-fullscreen="true"
              x5-video-orientation="portraint"
              controls
              muted
              autobuffer
              :autoplay="videoAutoplay"
              :loop="loop"
            > </video>
        </div>
        <img v-else class='video-play-btn wh' @click="imgClick(item)" :src="item[urlName] || item" alt="" v-lazy="item[urlName] || item">
      </van-swipe-item>
      <template #indicator>
        <div class="center-dots-box center-dot" :style="centerBot ? 'bottom:' + centerBot + 'px' : ''" v-if="imgUrls.length > 1">
          <div class="center-dots" :class="current == index ? 'center-dots-active' : ''" v-for="(item, index) in imgUrls" :key='index'></div>
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script>
  export default {
    name: 'commonSwiper',
    components: {},
    props: {
      imgUrls: { // 图片数组
        type: Array,
        default: function() {
          return []
        }
      },
      center: { // 是否居中
        type: Boolean,
        default: false
      },
      centerBot:{ // 居中提示的距离底部定位
        type: Number,
        default: 0
      },
      urlName: {  // 指定属性名
        type: String,
        default: 'img'
      },
      loop: {   // 是否循环
        type: Boolean,
        default: true
      },
      // 注意事项 宽高是vant内置的 vantui的根配置是37.5 本项目的是75 
      width: {
        type: Number,
        default: 375
      },
      height: {
        type: Number,
        default: 230
      }
      // width: {
      //   type: String,
      //   default: '10rem'
      // },
      // height: {
      //   type: String,
      //   default: '6.13rem'
      // }
    },
    data() {
      return {
        current: 0,
        flag: true,
        videoAutoplay: true,
        isWifi: true
      }
    },
    methods: {
      onChange(index) {
        this.current = index
        let item = this.imgUrls[index]
        // if(item.type === 'video' && this.isWifi) {
        //   this.flag = false
        //   this.videoAutoplay = true
        // } else {
          // 处理视频全部暂停
          this.imgUrls.map((item,index) => {
            if (item.type === 'video') {
              let player = document.getElementById("myVideo" + index)
              player.pause()
            }
          })
          // console.log(item, 'item')
          // 当前视频播放
          if (item.type === 'video') {
            this.flag = false
            const player = document.getElementById("myVideo" + index);
            // console.log(player, 'player')
            player.play()
            player.onended = () => { // 当前视频播放结束
              console.log('触发视频播放结束')
              this.flag = true
            }
            // if (player.play) {
            //   player.pause()
            // } else {
              
              
            // }
          }
        // }
      },
      // 点击图片
      imgClick(item) {
        console.log(item, '点击图片')
      }
    },
    created() {
    }
  }
</script>
<style lang="scss">
// /deep/ 穿透
 .common-swiper {
    .common-swiper-item {
      height: 460px !important;
    }
 }
</style>
<style scoped lang='scss'>
  .swiper-box{
    // position: relative;
  }
  .slide-image{
    width: 100%;
    height: 100%;
  }
  .bottom{
    bottom: 20px;
  }
  .video-item{
    position: relative;
    width: 100%;
    height: 460px;
  }
  .video-item .video-play-btn {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
  }
  .video-item .video-bgc {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    margin: auto;
  }
  .video-play-icon {
    font-size: 60px;
    color: #C7C5C3;
    position: absolute;
    width: 60px;
    height: 60px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
  }
  /* 居中提示 */
  .center-dots-box {
    position: absolute;
    bottom: 54px;
    left: 50%;
    transform: translate(-50%, 0);
    display: flex;
  }
  .center-dots {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0.6;
    background: #FFFFFF;
    margin-right: 12px;
  }
  .center-dots-active {
    width: 32px;
    height: 8px;
    border-radius: 4px;
    background: #FFFFFF;
    opacity: 1
  }
</style>
