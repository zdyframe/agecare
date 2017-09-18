<template>
    <div class="registerBox">
        <h1>手机注册</h1>
        <form class="registerForm">
            <div>
                <div class="telBox">
                    <img src="../../assets/img/register_ph.png"/>
                    <input class="tel" type="text" placeholder="请输入手机号码" v-model="tel"/>
                </div>
                <div class="codeBox">
                    <input class="code" type="text" placeholder="短信验证码" v-model="code"/>
                    <button @click="getCode()" class="btn btn-success btn-code">{{ msgGetCode }}</button>
                </div>
            </div>
            <div><button class="next" @click="next()">下一步</button></div>
            <div><button class="pre" @click="goBack()">返回</button></div>
        </form>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data : function () {
            return {
                msgGetCode : '获取验证码',
                tel : '',
                code : '',
                second : 60
            }
        },
        methods : {
            getCode : function () {
                const $this = this;

                //1.检查手机号是否可用
                axios({
                  method : 'post',
                  url : 'http://103.249.252.151:8080/api/agencyManager/register/phone',
                  data : {
                    phonenum : $this.tel
                  }
                }).then(function (res) {
                  //2.获取验证码
                  axios({
                    method : 'post',
                    url : 'http://103.249.252.151:8080/api/agencyManager/getcode',
                    data : {
                      phonenum : $this.tel
                    }
                  }).then(function (res) {
                    $this.msgGetCode = '剩余' + $this.second + '秒';
                    const timer = setInterval(function () {
                      $this.second -= 1;
                      $this.msgGetCode = '剩余' + $this.second + '秒';
                    },1000);
                    setTimeout(function () {
                      clearInterval(timer);
                      $this.msgGetCode = '重新发送';
                    },60000);
                  }).catch(function (res) {
                    alert("号码有误请重新发送");
                  })

                }).catch(function (res) {
                    alert('号码已经注册或者输入错误')
                })
            },
            next : function () {
                const $this = this;
                axios({
                    method : 'post',
                    url : 'http://localhost:8080/api/agencyManager/phone/checkcode',
                    data : {
                        code :$this.code,
                        phonenum : $this.tel
                    }
                }).then(function (res) {
                    $this.$router.push('/registerInfo');
                }).catch(function (res) {
                    alert('验证码或者手机号有误')
                })
            },
            goBack : function () {
                this.$router.push('/')
            }
        }
    }

</script>
<style scoped>

    .registerBox{
        color: white;
        position: relative;
    }
    .registerBox h1{
        line-height: 150px;
        font-size: 40px;
        padding-bottom: 30px;
        text-align: center;
        letter-spacing: 3px;
        font-family: 微软雅黑, " foHelvetica Neue", Helvetica, Arial, sans-serif;
    }
    .registerBox .registerForm{
        position: relative;
    }
    .registerBox .registerForm > div:nth-child(1){
        width: 260px;
        background: #cdcbe7;
        border: 1px solid #cdcbe7;
        border-radius: 5px;
        padding: 10px 10px 20px;
    }
    .telBox img{
        position: absolute;
        width: 24px;
        height: auto;
        margin-top: 8px;
        margin-left: 5px;
        padding-right: 5px;
        border-right: 1px solid #cdcbe7;
    }
    .telBox,.codeBox{
        width: 100%;
        height: 35px;
        text-align: left;
    }
    .tel,.code{
        color: #555;
        height: 100%;
        border-radius: 3px;
        font-size: 14px;
        background: #fff;
    }
    .tel{
        width: 100%;
        padding-left: 40px
    }
    .code{
        width: 55%;
        padding-left: 10px;
        margin-top: 10px;

    }
    .next,.pre{
        width: 100%;
        height: 50px;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        outline: 0;
    }
    .next{
        background: #4f8ff0;
        border: 1px solid #4f8ff0;
        margin-top: 40px;
    }
    .pre{
        background: #215fbd;
        border: 1px solid #215fbd;
        margin-top: 20px;
    }
    .codeBox .btn-code{
        width: 96px;
        text-align: center;
    }

</style>
