<template>
    <div class="adminWrap">
        <!--left interface-->
        <div class="leftBox">
            <div class="title">爱智康云平台</div>
            <div class="menu">
                <div class="menu-list" v-for="(item,index) in message">
                    <h3 @click="jump(index)" :class="{ bg : item.changeBg }">{{ item.msg }}</h3>
                    <h3 @click="jump(index,count)" :class="{ showBlock : bol, bg : block.changeBg }" v-if="item.childList" v-for=" (block,count) in item.childList">{{ block.childMsg }}</h3>
                </div>
            </div>
        </div>
        <!-- head interface -->
        <div class="headBox">
            <span class="lod-down" @click="lodDown()"><img src="../../assets/img/log_down.png"/></span>
            <span class="admin-name">{{ this.$cookie.get('username') }}</span>
            <span class="admin-name">管理员</span>
            <span class="select-box">
                <select @change="upDateAgencyInfo()" id="agencySel">
                    <option :id="index" v-for="(item,index) in $store.state.agencyArr">{{ item.agencyName }}</option>
                </select>
            </span>
        </div>
        <!-- the content interface  -->
        <div class="content-box">
            <div class="content-head">{{ contentHeadText }}</div>

            <div class="content">
              <!--  router content  -->
              <router-view></router-view>
            </div>

            <!-- 老人管理分页操作 -->
            <nav aria-label="Page navigation" class="splitPage" v-show="$store.state.showPage">
              <ul class="pagination">
                <li>
                  <a aria-label="Previous" @click="prePage()">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li v-for="item in $store.state.splitPages" v-show=" (item > minPage && item <= (minPage + 10)) ">
                  <a @click="changePage(item)">{{ item }}</a>
                </li>
                <li>
                  <a aria-label="Next" @click="nextPage()">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
                <li><a>一共{{ $store.state.splitPages.length }}页</a></li>
              </ul>
          </nav>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {

      //判断当前操作是  登录进来  还是   刷新操作  --> 通过是否存在 cookie ---- agencyId
        mounted : function () {
            const $this = this;
            const adminid = this.$cookie.get('adminid');

            axios({
                method : 'get',
                url : 'http://localhost:8080/api/agencyManager/agencys/' + adminid,
            }).then(function (res) {
                $this.$store.state.agencyArr = [];
                for(let i=0;i<res.data.length;i++){
                    $this.$store.state.agencyArr.push({agencyName:res.data[i].agencyName, address:res.data[i].address, agencyId:res.data[i].agencyId, bol:false});
                }
                if($this.$cookie.get('agencyId')){ //刷新操作
                    $this.getNewInfo();
                }else{                             // 登录操作
                    $this.$cookie.set('agencyId',res.data[0].agencyId,1);
                    $this.getNewInfo();
                }
            }).catch(function (res) {
                alert('呀！失败了！')
            });
        },
        data : function(){
            return {
              minPage : 0,
              message : [
                  {msg : '老人管理',     path : '/adminInterface/elderManage',changeBg : false},
                  {msg : '养老机构管理', path : '/adminInterface/elderAgencyMge',changeBg : false},

                  {
                      msg : '照护管理',
                      path : '/adminInterface/elderAgencyMges',
                      changeBg : false,
                      childList : [
                          {childMsg : '照片管理',path : '/adminInterface/carePhotoMge',changeBg : false},
                          {childMsg : '每日菜谱',path : '/adminInterface/careMenuMge',changeBg : false},
                          {childMsg : '每周活动',path : '/adminInterface/careActiveMge',changeBg : false}
                      ]
                  },

                  {msg : '费用管理',     path : '/adminInterface/expenseMge',changeBg : false},
                  {msg : '消息管理',     path : '/adminInterface/messageMge',changeBg : false},
                  {msg : '账户管理',     path : '/adminInterface/accountMge',changeBg : false},
                  {msg : '密码修改',     path : '/adminInterface/pwModify',changeBg : false}
              ],
              bol : true,
              contentHeadText : '老人管理'
            }
        },
        methods : {
            changePage : function (page) {
                let agencyId = this.$cookie.get('agencyId');
                this.$store.commit('changeCP',page);
                this.getElderMgeInfo(agencyId,page);
            },
            prePage:function () {
                let agencyId = this.$cookie.get('agencyId');
                if(this.$store.state.currentPage > 1){
                    this.$store.commit('minusCP');
                    this.getElderMgeInfo(agencyId,this.$store.state.currentPage);
                }
                if(this.minPage > 0){
                    this.minPage --;
                }
            },
            nextPage : function () {
                let agencyId = this.$cookie.get('agencyId');
                let maxPageNum = this.$store.state.splitPages.length;

                if(this.$store.state.currentPage < maxPageNum){
                  this.$store.commit('plusCP');
                  this.getElderMgeInfo(agencyId,this.$store.state.currentPage);
                }
                if( maxPageNum > (this.minPage + 10)){
                    this.minPage ++;
                }
            },
            //根据路由信息判断应该向后台发出什么样的请求获取信息
            getNewInfo : function () {
                const $this = this;
                var routeName = this.$route.name;
                var agencyId = this.$cookie.get('agencyId');

                switch (routeName){
                  case 'AdminInterface' :
                      $this.getElderMgeInfo(agencyId,1);
                      $this.$router.push('/adminInterface/elderManage');
                      break;
                  case 'ElderManage' :
                      $this.getElderMgeInfo(agencyId,1);
                      break;
                  case 'AccountMge' :
                    break;
                  case 'ElderAgencyMges' :
                      $this.$store.state.showPage = true;
                      $this.getElderMgeInfo(agencyId,1);
                    break;
                  case 'ElderAgencyMge' :
                    break;
                  case 'ExpenseMge' :
                    break;
                  case 'MessageMge' :
                    break;
                  case 'PwModify' :
                    break;
                  case 'CareMenuMge' :
                    break;
                  case 'CareActiveMge' :
                    break;
                  case 'CarePhotoMge' :
                    $this.getAllOldManInfo(agencyId);
                    break;
                  default :
                    break;
                }

            },
            //点击选择机构 -->  保存机构ID 并根据机构ID更新当前页面
            upDateAgencyInfo:function () {
                this.$cookie.delete('agencyId');
                let sel = document.getElementById('agencySel');
                let index = sel.options[sel.selectedIndex].id;
                let agencyId = this.$store.state.agencyArr[index].agencyId;
                this.$cookie.set('agencyId',agencyId,1);
                this.getNewInfo();
            },
            //点击跳转
            jump : function (index,count) {
                const $this = this;
                var CRoute = this.$route.path;
                if( count == undefined ){
                    if(CRoute === $this.message[index].path){
                        return
                    }else {
                      for(var i=0;i<$this.message.length;i++){
                        $this.message[i].changeBg = false;
                        if($this.message[i].childList){
                          for(var j = 0;j < $this.message[i].childList.length;j++){
                            $this.message[i].childList[j].changeBg = false;
                          }
                        }
                      }
                      $this.$store.state.showPage =false;
                      $this.message[index].changeBg = true;
                      $this.$router.push($this.message[index].path);
                      $this.contentHeadText = $this.message[index].msg;
                      $this.getNewInfo();
                    }

                }else{
                    if(CRoute === $this.message[index].childList[count].path){
                        return
                    }else {
                      for(var i=0;i<$this.message.length;i++){
                        $this.message[i].changeBg = false;
                        if($this.message[i].childList){
                          for(var j = 0;j < $this.message[i].childList.length;j++){
                            $this.message[i].childList[j].changeBg = false;
                          }
                        }
                      }

                      $this.$store.state.showPage =false;

                      $this.message[index].childList[count].changeBg = true;
                      $this.$router.push($this.message[index].childList[count].path);
                      $this.contentHeadText = $this.message[index].childList[count].childMsg;
                      $this.getNewInfo();
                    }

                }

            },
            //删除登录时 和登录后 记录的cookie
            lodDown: function () {

                this.$router.push('/');
                this.$cookie.delete('username');
                this.$cookie.delete('adminid');
                this.$cookie.delete('agencyId')
            },
            //获取信息
            getElderMgeInfo : function (agencyId,pageNum) {
                this.$store.state.showPage = true;
                const $this = this;
              axios({
                method : 'get',
                url : 'http://localhost:8080/api/agencyManager/'+ agencyId +'/pensioners/' + pageNum + '/4'
              }).then(function (res) {

                console.log(res);
                //分页处理操作
                let maxPage = res.data.pages;
                $this.$store.state.splitPages = [];
                for( let i=0; i < maxPage; i++ ){
                  let page = i + 1;
                  $this.$store.state.splitPages.push(page)
                }
                //更新老人管理页面信息
                $this.$store.state.oldManInfo = [];
                for(let i=0;i<res.data.pensionerFamily.length;i++){
                  $this.$store.state.oldManInfo.push({
                    name:res.data.pensionerFamily[i].name,
                    sex:res.data.pensionerFamily[i].sex,
                    id:res.data.pensionerFamily[i].pensionerId,
                    headImage : res.data.pensionerFamily[i].headImage,
                  });
                }
              }).catch(function (res) {
                  alert('请求失败了!');
              });
            },
            getAllOldManInfo : function (agencyId) {
              const $this = this;
              axios({
                method : 'get',
                url : 'http://localhost:8080/api/agencyManager/'+ agencyId +'/pensioners'
              }).then(function (res) {
                $this.$store.state.allOldManInfo = [];
                for(let i=0;i<res.data.length;i++){
                  $this.$store.state.allOldManInfo.push({
                    name : res.data[i].name,
                    sex : res.data[i].sex,
                    id : res.data[i].pensionerId,
                    headImg : res.data[i].headImage,
                    showSelOne : false
                  })
                }
              }).catch(function (res) {
                alert('adminInterface : 297')
              })
            }
        }
    }
</script>
<style>
    .adminWrap{
        width: 100%;
        height: 100%;
        position: absolute;
    }
    /* ---------------------------------------   head    -----------------------------------------*/
    .headBox{
        width: 100%;
        height: 100px;
        background-color: #fff;
        position: fixed;
        top: 0;
        border-bottom: 2px solid #63bdf2;
    }
    .headBox .lod-down,.headBox .admin-name,.headBox .select-box{
        float: right;
        line-height: 100px;
        text-align: center;
        display: block;
    }
    .headBox .lod-down{
        width: 66px;
        height: 100%;
        border-left: 1px solid #ccc;
    }
    .headBox .admin-name{
        width: 100px;
        height: 100%;
        font-size: 14px;
        color: #428bca;
    }
    .headBox .select-box{
        width: 227px;
        height: 100%;
    }
    .headBox .select-box select{
        width: 100%;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #428bca;
        background-color: #428bca;
        color: #fff;
    }

    /* -------------------------------------   content    ---------------------------------------*/

    .content-box{
        min-width: 820px;
        height: 100%;
        margin-left: 200px;
        background-color: #f2f2f2;
        padding: 100px 10px 0 10px;
    }
    .content-box .content-head{
        padding: 10px 0;
        font-size: 14px;
        line-height: 20px;
    }
    .content-box .content{
        padding: 5px 0 50px;
        background: #fff;
        border: 1px solid #999;
        border-radius: 3px;
        overflow: hidden;
    }

    /* ---------------------------------------   left    -----------------------------------------*/

    .leftBox{
        width: 200px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: auto;
        background-color: #323232;
        padding: 0;
        z-index: 1000;
        overflow-y: visible;
        color: #fff;
        float: left;
    }
    .leftBox .title{
        text-align: center;
        height: 45px;
        line-height: 45px;
        font-size: 20px;
        margin-top: 25px;
        margin-bottom: 10px;
    }
    .leftBox .menu{
        padding-left: 0;
        padding-top: 20px;
    }
    .leftBox .menu .menu-list{
        width: 200px;
        min-height: 60px;
        margin-bottom: -1px;
        background-color: #323232;
    }
    .leftBox .menu .menu-list h3{
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        padding-left: 40px;
        margin-top: 0;
        margin-bottom: 0;
    }
    .leftBox .menu .menu-list h3.bg{
        background-color: #666;
    }
    .leftBox .menu .menu-list h3:hover{
        background-color: #666;
    }
    .menu-list h3:not(:first-child){
        text-indent: 2em;
        display: block;
        transition: all 1s ease;
    }
    /*   照护管理下的列表是否显示   */
    /*.menu-list h3:not(:first-child).showBlock{display: none}*/

  /*-------------------分页操作----------------------*/
    .splitPage{
      float: right;
      margin-top: -10px;
    }
    .splitPage li a:hover{
      background-color: rgb(66,139,202);
      cursor: pointer;
    }
    /*:class="{ cPage : item===currentPage }"选中时候绑定背景色*/
    .splitPage ul li a.cPage{
      background-color: rgb(66,139,202);
    }
</style>
