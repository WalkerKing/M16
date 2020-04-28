<template>
    <div>
        <h2>map</h2>
        <div id="container"
             class="map_container"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    mounted () {
        this.initMap()
    },
    methods: {
        initMap () {
            var map = new window.BMap.Map("container");
            // 创建地图实例  
            var point = new window.BMap.Point(116.404, 39.915);
            // 创建点坐标  
            map.centerAndZoom(point, 15);
            // 初始化地图，设置中心点坐标和地图级别 
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.addControl(new BMap.MapTypeControl());
            map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用  
        }
    }
}
</script>

<style>
.map_container {
    width: 100%;
    height: 80vh;
}
</style>