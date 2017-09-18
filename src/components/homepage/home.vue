<template>
    <div class="homePage-bg">
        <div class="boxLogin">
            <img id="logo" src="../../assets/img/login_logo.png"/>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>


</script>
<style>
    .homePage-bg{
        width: 100%;
        height: 100%;
        position: fixed;
        background-image: url('../../assets/img/bg_img_01-jpg.jpg'),
        url('../../assets/img/bg_img_02-jpg.jpg'),
        url('../../assets/img/bg_img_03-jpg.jpg'),
        url('../../assets/img/bg_img_04-jpg.jpg');
        background-repeat: no-repeat,no-repeat,no-repeat,no-repeat;
        background-position: left top,right top,left bottom,right bottom;
        background-size:50.1% 50.1%,50% 50.1%,50.1% 50%,50% 50%
    }
    .homePage-bg .boxLogin{
        height: auto;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .homePage-bg #logo{
        width: 140px;
        height: auto;
    }
</style>
