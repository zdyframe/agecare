<template>
    <div class="elderManageBox">

        <!--  添加 、 编辑 老人 按钮  -->
        <div class="btn-box">
          <button class="btn btn-cancel" @click="cancelAdd()" v-show="buttonOption.subElderBol">取消</button>
          <button class="btn btn-save" @click="subInfo()" v-show="buttonOption.subElderBol">保存</button>

          <button class="btn btn-cancel" @click="cancelEdit()" v-show="buttonOption.updateElderBol">取消</button>
          <button class="btn btn-update" @click="updateInfo()" v-show="buttonOption.updateElderBol">保存</button>

          <button class="btn btn-edit" @click="editInfo()" v-show="buttonOption.editBol">编辑信息</button>
          <button class="btn btn-add" @click="showAddElderForm()" v-show="buttonOption.addBol">添加老人</button>
        </div>

        <!--添加老人信息 框-->
        <div class="addElderForm" v-show="DomOption.showIt">
          <div class="addElderContent">
            <div class="elderHeadBox">
              <div id="btn-uploader">
                <img id="elderHeadImg">
                <img src="../../assets/img/loading.gif" v-show="showLoading" class="loadingImg">
                <button id="pickfiles" class="btn btn-default btnUpload">上传头像</button>
              </div>
            </div>
            <div class="elderList">
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>姓名:</span>
                <input type="text" v-model="elderInfo.name">
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>性别:</span>
                <select v-model="elderInfo.sex">
                  <option>男</option>
                  <option>女</option>
                </select>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>出生日期:</span>
                <input id="birthday" type="text">
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>入院日期:</span>
                <input id="goHospital"type="text">
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>计划住院时间(天):</span>
                <input type="number" v-model="elderInfo.hospitalDays">
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>家属电话:</span>
                <input type="text" v-model="elderInfo.connectPhoneNumber">
              </div>
              <div v-show="DomOption.showState">
                <img src="../../assets/img/reg_user.png">
                <span>老人状态:</span>
                <select v-model="elderInfo.state">
                  <option>入院</option>
                  <option>出院</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="addElderForm" v-show="DomOption.showThis">
          <div class="showElderContent">
            <div class="oldManHeadBox">
              <div>
                <img :src="elderInfo.headImg" id="oldManHeadImg">
              </div>
            </div>
            <div class="elderList">
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>姓名:</span>
                <div>{{ elderInfo.name }}</div>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>性别:</span>
                <div>{{ elderInfo.sex }}</div>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>ID:</span>
                <div>{{ elderInfo.ID }}</div>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>出生日期:</span>
                <div>{{ elderInfo.birthday }}</div>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>入院日期:</span>
                <div>{{ elderInfo.admissionDate }}</div>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>计划住院时间(天):</span>
                <div>{{ elderInfo.hospitalDays }}</div>
              </div>
              <div>
                <img src="../../assets/img/reg_user.png">
                <span>家属电话:</span>
                <div>{{ elderInfo.connectPhoneNumber }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 页面加载进来后显示的老人信息 -->
        <div class="elderMgeCount" v-show="DomOption.showElderMgeCount">
          <div class="theElderInfoBox" v-for="(item,index) in oldManInfo" @click="showElderInformation(index)">
            <div><img :src="item.headImage"></div>
            <div>
              <div>姓名1：{{ item.name }}</div>
              <div>性别：{{ item.sex }}</div>
              <div>ID：{{ item.id }}</div>
            </div>
          </div>
        </div>


    </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'

  export default {
    computed : {
      ...mapState([
        'oldManInfo',
      ])
    },
    mounted(){
      const $this = this;
      $("#birthday").datetimepicker(
        { format: 'yyyy-mm-dd',minView:"month", language:'zh-CN', bootcssVer:3 }
      ).on('changeDate', function (res) {
          $this.elderInfo.birthday = $this.GetTheDate(res)
      });
      $("#goHospital").datetimepicker(
        { format: 'yyyy-mm-dd',minView:"month", language:'zh-CN', bootcssVer:3 }
      ).on('changeDate', function (res) {
          $this.elderInfo.admissionDate = $this.GetTheDate(res);
      });
      let token;
      axios({
        method:'get',
        url :'http://localhost:8080/api/img/token'
      }).then(function (res) {
        token = res.data.token;
        $this.initQiniu(token);
      }).catch(function (res) {
          alert('token请求失败！')
      });
    },
    data : function () {
      return {
        buttonOption : { addBol : true, editBol : false, updateElderBol : false, subElderBol : false },
        DomOption : { showIt : false, showThis : false, showElderMgeCount: true, showState : false },
        elderInfo : { headImg : '', name : '', sex : '', ID : '', birthday : '', admissionDate : '', hospitalDays : '', connectPhoneNumber :'', state : '入院'},
        showLoading : false,
        pensionerId : ''
      }
    },
    methods : {

//        事件触发方法
      showAddElderForm : function () {

        var extendInfo = { headImg : '', name : '', sex : '', ID : '', birthday : '', admissionDate : '', hospitalDays : '', connectPhoneNumber :'', state : '入院'};
        this.elderInfo = Object.assign({},this.elderInfo,extendInfo);

        var extendButton = { addBol : false, editBol : false, updateElderBol : false, subElderBol : true };
        this.buttonOption = Object.assign({},this.buttonOption,extendButton);

        var extendDom = { showIt : true, showThis : false, showElderMgeCount: false, showState : false };
        this.DomOption = Object.assign({},this.DomOption,extendDom);

        document.getElementById('birthday').value = '';
        document.getElementById('goHospital').value = '';
        document.getElementById('elderHeadImg').src = '';

      },
      editInfo : function () {

        var extendButton = { addBol : false, editBol : false, updateElderBol : true, subElderBol : false };
        this.buttonOption = Object.assign({},this.buttonOption,extendButton);

        var extendDom = { showIt : true, showThis : false, showElderMgeCount: false, showState : true };
        this.DomOption = Object.assign({},this.DomOption,extendDom);

        document.getElementById('birthday').value = this.elderInfo.birthday;
        document.getElementById('goHospital').value = this.elderInfo.admissionDate;
        document.getElementById('elderHeadImg').src = this.elderInfo.headImg;
      },
      updateInfo : function () {
          var agencyId = this.$cookie.get('agencyId');
          var pensionerId = this.elderInfo.ID;
          const $this = this;
          axios({
            method : 'put',
            url : 'http://localhost:8080/api/agencyManager/' + agencyId + '/' + pensionerId + '/update',
            data : {
              name: $this.elderInfo.name,
              sex: $this.elderInfo.sex,
              birthday: $this.elderInfo.birthday,
              admissionDate: $this.elderInfo.admissionDate,
              hospitalDays: $this.elderInfo.hospitalDays,
              headImage: $this.elderInfo.headImg,
              connectPhoneNumber:$this.elderInfo.connectPhoneNumber
            }
          }).then(function (response) {
              /*如果老人是出院的状态。。删除该老人信息。。页面不在显示这个老人。。重新请求该页面。。。*/


              //重新请求当前老人所在页面的信息
              axios({
                method : 'get',
                url : 'http://localhost:8080/api/agencyManager/'+ agencyId +'/pensioners/' + $this.$store.state.currentPage + '/4'
              }).then(function (res) {
                //更新老人管理页面信息
                $this.$store.state.oldManInfo = [];
                for(let i=0;i<res.data.pensionerFamily.length;i++){
                  $this.$store.state.oldManInfo.push({
                    name:res.data.pensionerFamily[i].name,
                    sex:res.data.pensionerFamily[i].sex,
                    id:res.data.pensionerFamily[i].pensionerId,
                    headImage : res.data.pensionerFamily[i].headImage
                  });
                }
              }).catch(function (res) {
                alert('老人信息更新失败！！')
              });

            var extendButton = { addBol : true, editBol : false, updateElderBol : false, subElderBol : false };
            $this.buttonOption = Object.assign({},$this.buttonOption,extendButton);

            var extendDom = { showIt : false, showThis : false, showElderMgeCount: true, showState : false };
            $this.DomOption = Object.assign({},$this.DomOption,extendDom);
          }).catch(function (res) {
              alert('hha,无法更新！！')
          })
      },
      cancelEdit : function () {
        var extendButton = { addBol : true, editBol : false, updateElderBol : false, subElderBol : false };
        this.buttonOption = Object.assign({},this.buttonOption,extendButton);

        var extendDom = { showIt : false, showThis : false, showElderMgeCount: true, showState : false };
        this.DomOption = Object.assign({},this.DomOption,extendDom);
      },
      subInfo:function () {
        const $this = this;
        var agencyId = $this.$cookie.get('agencyId');
        axios({
          method : 'post',
          url : 'http://localhost:8080/api/agencyManager/' + agencyId + '/pensioner/add',
          data : {
            name: $this.elderInfo.name,
            sex: $this.elderInfo.sex,
            birthday: $this.elderInfo.birthday,
            admissionDate: $this.elderInfo.admissionDate,
            hospitalDays: $this.elderInfo.hospitalDays,

            headImage: $this.elderInfo.headImg,
            connectPhoneNumber: $this.elderInfo.connectPhoneNumber
          }
        }).then(function (response) {
            //请求最后一页的老人信息

/*老人信息添加成功后请求最后一页的老人信息进行展示，在请求之前需要判断最后一页显示的老人信息是否已经满了，在不包括刚刚添加的老人情况系啊，
* 如果满了就在添加一页请求*/
          let maxPage = $this.$store.state.splitPages.length;
          axios({
            method : 'get',
            url : 'http://localhost:8080/api/agencyManager/'+ agencyId +'/pensioners/' + maxPage + '/4'
          }).then(function (res) {
              if((res.data.size-1) % maxPage === 0){
                  maxPage += 1;
                $this.$store.state.splitPages = [];
                for( let i=0; i < maxPage; i++ ){
                  let page = i + 1;
                  $this.$store.state.splitPages.push(page)
                }
                  axios({
                    method : 'get',
                    url : 'http://localhost:8080/api/agencyManager/'+ agencyId +'/pensioners/' + maxPage + '/4'
                  }).then(function (res1) {
                    $this.$store.state.oldManInfo = [];
                    for(let i=0;i<res1.data.pensionerFamily.length;i++){
                      $this.$store.state.oldManInfo.push({
                        name:res1.data.pensionerFamily[i].name,
                        sex:res1.data.pensionerFamily[i].sex,
                        id:res1.data.pensionerFamily[i].pensionerId,
                        headImage : res1.data.pensionerFamily[i].headImage
                      });
                    }
                  }).catch(function (res1) {

                  })
              }else {
                $this.$store.state.oldManInfo = [];
                for(let i=0;i<res.data.pensionerFamily.length;i++){
                  $this.$store.state.oldManInfo.push({
                    name:res.data.pensionerFamily[i].name,
                    sex:res.data.pensionerFamily[i].sex,
                    id:res.data.pensionerFamily[i].pensionerId,
                    headImage : res.data.pensionerFamily[i].headImage
                  });
                }
              }

          }).catch(function (res) {
              alert('error')
          });

          var extendButton = { addBol : true, editBol : false, updateElderBol : false, subElderBol : false };
          $this.buttonOption = Object.assign({},$this.buttonOption,extendButton);

          var extendDom = { showIt : false, showThis : false, showElderMgeCount: true, showState : false };
          $this.DomOption = Object.assign({},$this.DomOption,extendDom);
        }).catch(function (res) {
          alert('失败！添加老人信息。')
        })
    },
      cancelAdd : function () {
        var extendButton = { addBol : true, editBol : false, updateElderBol : false, subElderBol : false };
        this.buttonOption = Object.assign({},this.buttonOption,extendButton);

        var extendDom = { showIt : false, showThis : false, showElderMgeCount: true, showState : false };
        this.DomOption = Object.assign({},this.DomOption,extendDom);
      },
      showElderInformation : function (index) {
        const $this = this;
        var agencyId = this.$cookie.get('agencyId');
        var pensionerId = this.$store.state.oldManInfo[index].id;
        this.pensionerId = pensionerId;
        axios({
          method : 'get',
          url : 'http://localhost:8080/api/agencyManager/' + agencyId + '/' + pensionerId + '/detail'
        }).then(function (res) {
          var extendButton = { addBol : false, editBol : true, updateElderBol : false, subElderBol : false };
          $this.buttonOption = Object.assign({},$this.buttonOption,extendButton);

          var extendDom = { showIt : false, showThis : true, showElderMgeCount: false, showState : false };
          $this.DomOption = Object.assign({},$this.DomOption,extendDom);

          var extendInfo = {
            headImg : res.data.headImage,
            name : res.data.name,
            sex : res.data.sex,
            ID : res.data.pensionerId,
            birthday : $this.changeDate(res.data.birthday),
            admissionDate : $this.changeDate(res.data.admissionDate),
            hospitalDays : res.data.hospitalDays,
            connectPhoneNumber :res.data.connectPhoneNumber,
            state : '入院'
          };
          $this.elderInfo = Object.assign({},$this.elderInfo,extendInfo);

        }).catch(function (res) {
          alert('太卡了，再试试吧！')
        });
      },

//      静态等待调用方法
      changeDate : function (obj) {
        var date = new Date(obj);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate() + '';
        var theDayIs = Y+M+D;
        return theDayIs;
      },
      GetTheDate : function (res) {
        var day = res.date.getDate();
        var month = res.date.getMonth() + 1;
        if( day < 10 ){
          day = '0' + day;
        }
        if( month < 10 ){
          month = '0' + month;
        }
        var theDate = res.date.getFullYear() + '-' + month + '-' + day;
        return theDate
      },
      initQiniu : function (token) {
        const $this = this;
        let uploader = Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: 'pickfiles',
          uptoken: token,
          get_new_uptoken: false,
          domain: 'http://ohpqebzgj.bkt.clouddn.com/',
          container: 'btn-uploader',
          flash_swf_url: '../../../node_modules/plupload/js/Moxie.swf',
          dragdrop: true,
          drop_element: 'btn-uploader',
          chunk_size: '4mb',
          auto_start: true,
          unique_names: false,
          save_key: false,
          max_retries: 3,
          filters : {
            max_file_size : '1024kb',
            prevent_duplicates: true,
            mime_types: [
              { title: "图片文件", extensions: "jpg,jpeg,gif,png"}

            ]
          },
          init: {
            // 文件添加进队列后，处理相关的事情
            'FilesAdded': function(up, files) {
              $this.showLoading = true;
            },
            'BeforeUpload': function(up, file) {},
            'UploadProgress': function(up, file) {},

            // 每个文件上传成功后，处理相关的事情
            'FileUploaded': function(up, file, info) {
              var file = file.getNative();
              console.log(file);
              var reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = function(e) {
                document.getElementById("elderHeadImg").src = this.result;
                $this.showLoading = false;
              };
              var domain = up.getOption('domain');
              var res = JSON.parse(info.response);

              $this.elderInfo.headImg = domain + res.key;
//              $this.sourceLink = domain + res.key;
            },
            //上传出错时，处理相关的事情
            'Error': function(up, err, errTip) {
              alert('传不上去吧！那就在试试吧。。。。')
            },
            //队列文件处理完毕后，处理相关的事情
            'UploadComplete': function() {},
            'Key': function(up, file) {
              var key =file.name;
              return key;
            }
          }
        });

      },
    }
  }

</script>
<style>
  .elderManageBox{
    width: 100%;
    height: auto;
  }

  /*------------------------------------------------*/
  .btn-box{
    width: 100%;
    height: 45px;
    padding: 15px 15px 0 15px;
  }
  .btn-box > button{
    float: right;
    width: 110px;
    height: 30px;
    background-color: #428bca;
    color: #fff;
    font-size: 14px;
    line-height: 16px;
    border: 1px solid #428bca;
    outline: 0;
  }
  .btn-box .btn-cancel{
    margin-left: 15px;
  }
/*------------------------------------*/
  .addElderForm{
    width: 820px;
    background: #fff;
    margin: 50px auto;
    border: 2px solid #63bdf2;
    border-radius: 5px;
    height: 420px;
  }
  .addElderContent{
    background: #EEEEEE;
    width: 800px;
    height: 400px;
    border: 2px solid #63bdf2;
    border-radius: 5px;
    margin: 8px;
  }
  .showElderContent{
    width: 800px;
    height: 400px;
    border: 2px solid #63bdf2;
    border-radius: 5px;
    margin: 8px;
  }
  .elderHeadBox{
    width: 49%;
    display: inline-block;
    position: relative;
  }
  .oldManHeadBox{
    width: 49%;
    display: inline-block;
    position: relative;
    top: -150px;
  }
  #elderHeadImg,#oldManHeadImg {
    width: 200px;
    height: 200px;
    margin-top: 40px;
    margin-left: 90px;
  }
  .loadingImg{
    width: 200px;
    height: 200px;
    margin-top: 40px;
    margin-left: -203px;

  }
  .btnUpload{
    width: 120px;
    height: 30px;
    outline: 0;
    background-color: #428bca;
    border: 1px solid #428bca;
    border-radius: 3px;
    color: #fff;
    margin-left: 130px;
    margin-top: 20px;
  }
  .elderList{
    display: inline-block;
    width: 49%;
    height: 300px;
    margin-top: 40px;
  }
  .elderList > div{
    line-height: 40px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #333
  }
  .elderList > div img{
    margin: 0 12px;
  }
  .elderList > div span{
    width: 170px;
    margin: 0;
    display: inline-block;
  }
  .elderList > div input,.elderList > div select{
    display: inline-block;
    width: 142px;
    height: 32px;
    border: 1px solid #eee;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
  }
  .elderList > div div{
    display: inline-block;
    width: 142px;
    height: 32px;
    text-align: left;
  }
  .elderList > div select{
    background-color: #fff
  }
  /*-----------------------------------------------------------------------------------------*/
  .elderMgeCount{
    height: 500px;
    background: #fff;
    margin-top: 61px;
    padding: 0 0 16px 20px;
    /*border: 2px solid greenyellow;*/
  }
  .theElderInfoBox{
    width: 240px;
    height: 120px;
    padding: 10px;
    margin: 0 18px 24px 0;
    /*border: 1px solid red;*/
    float: left;
  }
  .theElderInfoBox:hover{
    border: 1px solid #eee;
    background: #eee;
    border-radius: 5px;
  }
  .theElderInfoBox > div{
    width: 49%;
    height: 100%;
    float: left;
    /*border: 1px solid goldenrod;*/
  }
  .theElderInfoBox > div:nth-child(1) > img{
    width: 100%;
    height: 100%;
  }
  .theElderInfoBox > div:nth-child(2) > div{
    margin-left: 5px;
    width: 100%;
    height: 33px;
    line-height: 33px;
  }
</style>
