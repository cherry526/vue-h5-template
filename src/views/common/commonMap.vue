<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: cherry
 * @Date: 2020-08-07 18:42:51
 * @LastEditors: cherry
 * @LastEditTime: 2020-09-28 16:57:28
-->
<template>
  <div>
    <div id="container" style="width:100vw;height:100vh;"></div>
  </div>
</template>
<script>
  export default {
    name: 'commonMap',
    mixins: [],
    computed: {},
    components:{},
        data() {
          return {
            longitude:0, //经度
            latitude:0, //纬度
            city:''
          }
        },
        methods:{
        // 定位获得当前位置信息
        getMyLocation() {
          var geolocation = new qq.maps.Geolocation("SKLBZ-67R6W-QCERG-OI2RA-VDCDV-4JBE4", "本地会员生活服务");
          geolocation.getIpLocation(this.showPosition, this.showErr);
          //geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
        },
        showPosition(position) {
          console.log(position);
          this.latitude = position.lat;
          this.longitude = position.lng;
          this.city = position.city;
          this.setMap();
        },
        showErr() {
          console.log("定位失败");
          this.getMyLocation();//定位失败再请求定位，测试使用
        },
        //位置信息在地图上展示
        setMap() {
          //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
          //设置地图中心点
          var myLatlng = new qq.maps.LatLng(this.latitude,this.longitude);
          //定义工厂模式函数
          var myOptions = {
            zoom: 11,               //设置地图缩放级别
            center: myLatlng,    //设置中心点样式
            mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
          }
          // //获取dom元素添加地图信息
          var map = new qq.maps.Map(document.getElementById("container"), myOptions);
        //给定位的位置添加图片标注
          var marker = new qq.maps.Marker({
              position: myLatlng,
              map: map
          });
          //给定位的位置添加文本标注
          var marker = new qq.maps.Label({
              position: myLatlng,
              map: map,
              content:'定位地址在这儿~'
          });
        }
      },
    mounted() {
      if(this.$route.query.lat) {
        this.latitude = this.$route.query.lat
        this.longitude = this.$route.query.lng
        this.setMap()
      } else {
        this.getMyLocation();
      }
    },
    created() {
    }
  }
</script>
<style scoped lang='scss'>

</style>