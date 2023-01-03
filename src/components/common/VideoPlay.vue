<template>
   <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-text="连接中">
     <video ref="player" autoplay muted autobuffer preload type="application/x-mpegURL" style="width:100%;height:100%;object-fit: fill;"></video>
   </div>
</template>
<script>
const Hls = require('@/utils/hls.js')
export default {
    props: { 
        src: {
            type: String,
            default: 'http://128.128.34.12:83/openUrl/nrqZkS4/live.m3u8'
        }
    },
    data () {
        return {
            show: false,
            hls: null,
            video: null,
            loading: true,
        }
    },
    mounted () {
        this.$nextTick(()=>{
            this.video = this.$refs.player;
            if (Hls.isSupported()) {
                this.hls = new Hls();
                this.hls.attachMedia(this.video);
                this.hls.loadSource(this.src);
                this.hls.attachMedia(this.video);
                this.hls.on(Hls.Events.ERROR, (event, data)=> {
                    console.log(data.type)
                })
            }
            this.video.addEventListener('canplay',this.playerStart)
        })
    },
    methods: {
        playerStart () {
            this.loading = false; 
        },
        reload () {
            this.show = false;
            this.loading = true;
            this.hls.loadSource(this.src);
        }
    },
    beforeDestroy () {
        try {
            this.video.removeEventListener('canplay',this.playerStart);//移除监听
            this.hls.destroy();//销毁
            this.hls = null;
        } catch (error) {console.log(error)}
    },
    watch: {
        'src': function (val){
            this.hls.loadSource(val);
        }
    }
}
</script>
<style lang="scss" scoped>
.pisx-error{
    position: absolute;
    z-index: 100;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .el-icon-circle-close{
        font-size: 30px;
    }
}
</style>