<template>
    <div class="registerInfoBox">
        <h1>完善注册信息</h1>
        <div class="regList">
            <div>
                <img src="../../assets/img/reg_user.png"/>
                <input v-model="username" 　type="text" placeholder="请输入用户名"/>
            </div>
            <div>
                <img src="../../assets/img/reg_pw.png"/>
                <input v-model="password" type="text" placeholder="请输入密码"/>
            </div>
            <div>
                <img src="../../assets/img/comfirm_pw.png"/>
                <input type="text" placeholder="请再次输入密码"/>
            </div>
            <div>
                <img src="../../assets/img/real_name.png"/>
                <input v-model="realname" type="text" placeholder="请输入您的真实姓名"/>
            </div>
            <div class="sexBox">
                <img src="../../assets/img/user_sex.png"/>
                <div class="sex">
                    <input v-model="sex" value="男" type="radio" id="boy"/>
                    <label for="boy">男</label>
                    <input v-model="sex" value="女" type="radio" id="girl"/>
                    <label for="girl">女</label>
                </div>
            </div>
            <div>
                <img src="../../assets/img/ID_num.png"/>
                <input v-model="idnumber" type="text" placeholder="请输入您的身份证号"/>
            </div>
            <div>
                <img src="../../assets/img/pre_name.png"/>
                <input v-model="agencyname" type="text" placeholder="请输入养老机构的名称"/>
            </div>
            <div>
                <img src="../../assets/img/address.png"/>
                <input v-model="address" type="text" placeholder="请输入机构的地址"/>
            </div>
            <div>
                <img src="../../assets/img/user_mail.png"/>
                <input v-model="email" type="text" placeholder="请输入您的邮箱"/>
            </div>
            <div>
                <img src="../../assets/img/register_ph.png"/>
                <input v-model="phonenum" type="text" placeholder="请输入您的电话号码"/>
            </div>
            <div>
                <img src="../../assets/img/register_ph.png"/>
                <input v-model="code" type="text" placeholder="邀请码"/>
            </div>

            <div><button @click="confirm()" class="btn btn-primary sure">确定注册</button></div>
            <div><button @click="goBack()" class="btn btn-primary back">返回</button></div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data : function () {
            return {
                agencyname : '',
                address : '',
                phonenum : '',
                realname : '',
                username : '',
                password : '',
                sex : '',
                idnumber : '',
                email : '',
                code : ''
            }
        },
        methods : {
            confirm : function () {
                const $this = this;
                const md5Password = md5($this.password);

                //前端表单验证

                axios({
                    method : 'post',
                    url : 'http://localhost:8080/api/agencyManager/setinfo',
                    data : {
                        agencyname : this.agencyname,
                        address : this.address,
                        phonenum : this.phonenum,
                        realname : this.realname,
                        username : this.username,
                        password : md5Password,
//                        password : $this.password,
                        sex : this.sex,
                        idnumber : this.idnumber,
                        email : this.email,
                        code : this.code
                    }
                }).then(function (res) {
                    $this.$router.push('/')
                }).catch(function (res) {
                    alert('失败了！')
                })
            },
            goBack : function () {
                this.$router.push('/register')
            }
        }
    }

</script>
<style>

    .registerInfoBox {
        color: white;
        position: relative;
    }
    .registerInfoBox h1{
        padding-bottom: 20px;
        line-height: 40px;
        font-size: 30px;
        text-align: center;
        letter-spacing: 2px;
        font-family: 微软雅黑, " foHelvetica Neue", Helvetica, Arial, sans-serif;
    }
    .regList{
        width: 260px;
        height: auto;
    }
    .registerInfoBox .regList .btn{
        width: 100%;
        height: 100%;
        font-size: 16px;
        outline: 0;
        border-radius: 6px;
    }
    .registerInfoBox .regList .sure{
        background: #4f8ff0;
        border: 1px solid #4f8ff0;
        margin-top: 35px;
    }
    .registerInfoBox .regList .back{
        background: #215fbd;
        border: 1px solid #215fbd;
        margin-top: 50px;
    }
    .regList > div{
        width: 100%;
        height: 40px;
        margin-bottom: 2px;

        /*border-bottom: 2px solid greenyellow;*/
    }
    .regList > div > input{
        width: 100%;
        height: 100%;
        padding-left: 55px;
        border-radius: 5px;
        background: #cdcbe7;
        border: 1px solid #cdcbe7;
        font-size: 14px;
        color: #000;
    }
    .regList > div > img{
        position: absolute;
        margin-top: 10px;
        margin-left: 10px;
        width: 20px;
        height: 20px;
    }
    .regList .sex{
        height: 100%;
        width: 100%;
        background: #cdcbe7;
        border: 1px solid #cdcbe7;
        padding-left: 55px;
        border-radius: 5px;
        font-size: 14px;
        color: #000;
        line-height: 40px;
    }
    .regList .sex input,.regList .sex label{
        display: inline-block;
        width: 18px;
        height: 18px;
        float: left;
    }
    .regList .sexBox img{
        left: 0;
    }

</style>
