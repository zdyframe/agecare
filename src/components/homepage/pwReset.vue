<template>
  <div class="pwResetBox">
    <h1>重置密码</h1>
    <form class="pwResetForm">
      <div>
        <div class="newPwdBox">
          <img src="../../assets/img/reg_pw.png"/>
          <input class="newpwd" type="password" placeholder="请输入新密码" v-model="tel"/>
        </div>
        <div class="againPwdBox">
          <img src="../../assets/img/comfirm_pw.png"/>
          <input class="againpwd" type="password" placeholder="请再次输入密码" v-model="code"/>
        </div>
      </div>
      <div><button class="next" @click="next()">下一步</button></div>
      <div><button class="pre" @click="goBack()">返回</button></div>
    </form>
  </div>
</template>

<script>

</script>

<style scoped>

  .pwResetBox{
    color: white;
    position: relative;
  }
  .pwResetBox h1{
    line-height: 150px;
    font-size: 40px;
    padding-bottom: 30px;
    text-align: center;
    letter-spacing: 3px;
    font-family: 微软雅黑, " foHelvetica Neue", Helvetica, Arial, sans-serif;
  }
  .pwResetBox .pwResetForm{
    position: relative;
  }
  .pwResetBox .pwResetForm > div:nth-child(1){
    width: 260px;
    background: #cdcbe7;
    border: 1px solid #cdcbe7;
    border-radius: 5px;
    padding: 10px 10px 20px;
  }
  .newPwdBox img,.againPwdBox img{
    position: absolute;
    width: 24px;
    height: auto;
    margin-top: 8px;
    margin-left: 5px;
    padding-right: 5px;
    border-right: 1px solid #cdcbe7;
  }
  .newPwdBox img{
    top: -2px;
  }
  .againPwdBox img{
    top: 8px;
  }
  .newPwdBox,.againPwdBox{
    position: relative;
    width: 100%;
    height: 35px;
    text-align: left;
  }
  .newpwd,.againpwd{
    padding-left: 40px;
    width: 100%;
    color: #555;
    height: 100%;
    border-radius: 3px;
    font-size: 14px;
    background: #fff;
  }
  .againpwd{
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

</style>
