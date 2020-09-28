<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yesong
 * @Date: 2020-08-03 20:49:17
 * @LastEditors: yesong
 * @LastEditTime: 2020-08-08 16:54:23
--> 
<template>
  <div @click="chooseImg">
    <slot name="uploadImg"></slot>
  </div>
</template>
<script>
  import getWXSign from '@/utils/wx'
  export default {
    name: 'uploadImg',
    data() {
      return {
        $wx: {}
      }
    },
    props: {
      imgs: {
        type: Array
      },
      uploadImgNum: {
        type: Number,
        default: 1
      }
    },
    async created() {
      try {
        this.$wx = await getWXSign()
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      chooseImg() {
        var that = this;
        let count = this.uploadImgNum || 1;
            count = count - this.imgs.length
        this.$wx.chooseImage({
          count: count, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            var i = 0,
              len = localIds.length;
            function upload() {
              that.$wx.uploadImage({
                localId: localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function(res) {
                  i++;
                  if (i < len) {
                    upload();
                  }
                  var serverId = res.serverId; // 返回图片的服务器端ID即media_id将次id传给后台，然后返回oss图片地址
                  that.$api.downloadImage({
                    mediaId: serverId
                  }).then(res => {
                    if (res.state) {
                      that.imgs.push(res.info.mediaUrl)
                      // 验证图片敏感
                      that.$emit('update:imgs', that.imgs)
                      that.$Toast(`上传成功`)
                    } else {
                      that.$Toast(res.message)
                      that.$emit('imgError', res.message)
                    }
                  });
                }
              });
            }
            upload();
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped>

</style>


