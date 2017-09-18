<template>
    <div class="loginBox">
        <h1>爱智康云平台</h1>
        <div class="loginForm">
            <div>
                <img src="../../assets/img/login_user.png"/>
                <input type="text" class="form-control username" placeholder="用户名" required="required" pattern="[a-zA-Z0-9]{6,10}" v-model="username">
            </div>
            <div>
                <img src="../../assets/img/login_pw.png"/>
                <input type="password" class="form-control password" placeholder="密码" required="required" pattern="[a-zA-Z0-9]{6,10}" v-model="password">
            </div>
            <div><button class="btn btn-primary login" @click="login()">登录</button></div>
            <div><button class="btn btn-primary register" @click="register()">注册</button></div>
        </div>
        <p @click="getPwd" class="getpwd">忘记密码了？</p>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        data : function () {
            return {
                username : '',
                password : ''
            }
        },
        methods : {
            login : function () {
                const $this = this;
                const md5Password = md5($this.password);
                axios({
                    method : 'post',
                    url : 'http://localhost:8080/api/agencyManager/login',
                    data : {
                        username : $this.username,
                        password : md5Password
//                        password : $this.password
                    }
                }).then(function (res) {
                    $this.$cookie.set('username',$this.username,1);
                    $this.$cookie.set('adminid',res.data.user.adminId,1);
                    $this.$router.push('/adminInterface');
                }).catch(function (res) {
                    alert('用户名或者密码错误');
                });
            },
            register : function () {
                this.$router.push('/register')
            },
            getPwd:function () {
              this.$router.push('./pwRecovery')
            }
        }
    }

</script>
<style>
    .loginBox{
        color: white;
        position: relative;
    }
    .loginBox h1{
        line-height: 150px;
        font-size: 40px;
        padding-bottom: 30px;
        text-align: center;
        letter-spacing: 3px;
        font-family: 微软雅黑, " foHelvetica Neue", Helvetica, Arial, sans-serif;
    }
    .loginBox p{font-size: 16px}
    .loginBox .loginForm{
        position: relative;
    }
    .loginBox .loginForm input{
        height: 50px;
        line-height: 50px;
        width: 260px;
        font-size: 14px;
        background: rgba(205,203,231,0.7);
        padding-left: 55px;
    }
    .loginBox .loginForm div:nth-child(1) img{
        position: absolute;
        left: 20px;
        top: 12px;
    }
    .loginBox .loginForm .username{
        margin-top: 11px;
        border-radius: 5px 5px 0 0;
    }
    .loginBox .loginForm div:nth-child(2) img{
        position: absolute;
        left: 24px;
        top: 62px;
    }
    .loginBox .loginForm .password{
        margin-top: 2px;
        border-radius: 0 0 5px 5px;
    }
    .loginBox .loginForm .btn {
        height: 50px;
        width: 100%;
        font-size: 16px;
    }
    .loginBox .loginForm .login{
        margin-top: 40px;
        background: #4f8ff0;
        border: 1px solid #4f8ff0;
    }
    .loginBox .loginForm .register{
        margin : 20px 0;
        background: #215fbd;
        border: 1px solid #215fbd;
    }
    .getpwd:hover{
      cursor: pointer;
      color: red;
    }
</style>
