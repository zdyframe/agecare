<template>
    <div class="oldManListBox">

      <!-- 页面加载进来后显示的老人信息 -->
      <div class="wrap" v-show="bol">
        <div class="oldManBox" v-for="(item,index) in $store.state.oldManInfo" @click="showElderCareInfo(index)">
          <div><img :src="item.headImage"></div>
          <div>
            <div>姓名:{{item.name}}</div>
            <div>性别:{{item.sex}}</div>
            <div>ID:{{item.id}}</div>
          </div>
        </div>
      </div>


      <!---->
      <div class="careMgeBox" v-show="!bol">

        <ul class="nav nav-pills nav-nur">
          <li role="presentation" v-for="(item,index) in navArr" :class="{active : item.active}" @click="changeP(index)"><a>{{item.txt}}</a></li>
        </ul>

        <div class="nurDetailBox">

          <!--显示老人生活照-->
          <div class="photoBox" v-show="navArr[0].show">
            <div class="elderLifePic" v-for="item in elderLifePics">
              <div class="photoDate">{{item.uploadaDate}}</div>
              <div class="lifePhoto" v-for="pic in item.photoPath"><img :src="pic"></div>
            </div>
            <button class="btn btn-more" v-show="true">更多</button>
          </div>

          <!--显示老人生命体征-->
          <div class="signsBox" v-show="navArr[1].show">

          </div>

          <!--显示用药情况-->
          <div class="drugBox" v-show="navArr[2].show">

          </div>

          <!--显示老人消耗品使用情况-->
          <div class="consumablesBox" v-show="navArr[3].show">

          </div>

        </div>

      </div>

    </div>
</template>
<script>
  import axios from 'axios'

  export default{
      data : function () {
        return {
            navArr : [
              {txt : '照片查看',active : true,show : true},
              {txt : '生命体征',active : false,show : false},
              {txt : '用药情况',active : false,show :false},
              {txt : '消耗品',active : false,show : false},
            ],
            bol : true,
            elderLifePics : [],
        }
      },
      methods : {
        changeP : function (index) {
          for(let i=0;i<this.navArr.length;i++){
              this.navArr[i].active = false;
              this.navArr[i].show = false;
          }
          this.navArr[index].active =true;
          this.navArr[index].show =true;




        },
        showElderCareInfo : function (index) {
            const $this = this;
            this.bol = false;
            this.$store.state.showPage = false;
            var pensionerId = this.$store.state.oldManInfo[index].id;
            var nowDate = this.getTheDate();
            var fiveDay = this.fiveDaysAgo();

          axios({
              method : 'get',
              url : 'http://localhost:8080/api/agencyManager/' + pensionerId + '/lifephotos/' + fiveDay + '/' + nowDate,
            }).then(function (res) {

                var obj = {};
                for(let i=0;i<res.data.length;i++){
                    var key = res.data[i].uploadaDate;
                    var upDate = $this.getTheDate(key);
                    if(!obj[key]){
                        obj[key] = {'uploadaDate' : upDate,'photoPath' : []}
                    }
                    obj[key]['photoPath'].push(res.data[i].photoPath)
                }
                for(let key in obj){
                    $this.elderLifePics.push(obj[key])
                }
            }).catch(function (res) {
                alert('Mges : 91');
            })

        },
        getTheDate : function (obj) {

            if(obj){
              var date = new Date(obj);
            }else {
              var date = new Date();
            }
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate() + '';
            var theDayIs = Y+M+D;
            return theDayIs;
        },
        fiveDaysAgo : function () {
            var fiveDayTime = 5 * 24 * 60 * 60 * 1000;
            var time = new Date().getTime() - fiveDayTime;
            var fiveDay = this.getTheDate(time);
            return fiveDay;
        },






      }

  }

</script>
<style>
.oldManListBox{
  width: 100%;
  height: auto;
}
  /**/

.wrap{
  height: 500px;
  background: #fff;
  margin-top: 61px;
  padding: 0 0 16px 20px;
  /*border: 2px solid greenyellow;*/
}
.oldManBox{
  width: 240px;
  height: 120px;
  padding: 10px;
  margin: 0 18px 24px 0;
  /*border: 1px solid red;*/
  float: left;
}
.oldManBox:hover{
  border: 1px solid #eee;
  background: #eee;
  border-radius: 5px;
}
.oldManBox > div{
  width: 49%;
  height: 100%;
  float: left;
  /*border: 1px solid goldenrod;*/
}
.oldManBox > div:nth-child(1) > img{
  width: 100%;
  height: 100%;
}
.oldManBox > div:nth-child(2) > div{
  margin-left: 5px;
  width: 100%;
  height: 33px;
  line-height: 33px;
}
/**/
  .careMgeBox{
    margin: 20px;
  }
    .careMgeBox .nav-nur{
      width: 100%;
      height: 40px;
    }
  .careMgeBox .nav-nur li:hover{
    cursor: pointer;
  }

  .careMgeBox .nurDetailBox{
    width: 100%;
    height: 610px;
    border: 1px solid #666;
    padding: 10px 10px 50px;
  }

/**/
  .photoBox{
    width: 100%;
    height: 100%;
    border: 1px solid red;
    padding: 0 10px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .photoBox .btn-more{
    display: block;
    width: 70px;
    height: 35px;
    line-height: 16px;
    margin: 10px auto;
    background-color: #337ab7;
    color: #fff;
    text-align: center;
  }
.elderLifePic{
  width: 100%;
  border: 1px solid blue;
  overflow: hidden;
}

.photoDate{
  width: 120px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background-color: #ddd;
  border: 1px solid #ddd;
  border-radius: 3px;
  color: #fff;
  margin-bottom: 10px;
}

  .lifePhoto{
    width: 200px;
    height: 200px;
    float: left;
    margin-right: 9px;
  }
  .lifePhoto > img{
    width: 100%;
    height: 100%;
  }
/**/
  .signsBox{
    width: 100%;
    height: 100%;
    border: 1px solid green;
    padding: 0 10px;
  }





</style>
