<template>
    <div class="carePhotoBox">
        <div class="careBtn-Box" id="btn-uploader">
            <button class="btn btn-addPic" id="pickfiles">添加照片</button>
            <button class="btn btn-upPic" @click="upLoadAllPic()">上传照片</button>
        </div>
        <div class="carePicContent">
            <div class="elderListBox">
                <div class="selElder">
                    <div class="selIcon" @click="selAll()"><img src="../../assets/img/my_checkbox.png" v-show="showSelAll"></div>
                    <div>老人选择</div>
                </div>
                <div class="elderList">
                  <!--选择老人-->
                  <div class="oldMan" v-for="(item,index) in $store.state.allOldManInfo">
                      <div class="theRadio" @click="selOne(index)"><img src="../../assets/img/my_checkbox.png" v-show="item.showSelOne"></div>
                      <img :src="item.headImg">
                      <div class="oldManSimpleInfo">
                        <div>{{item.name}}</div>
                        <div>ID:{{item.id}}</div>
                      </div>
                  </div>

                </div>
            </div>
            <div class="addPicBox">
                <div class="selPic">已选照片</div>
                <div class="picList">
                  <!--本地展示照片-->
                  <div class="photo" v-for="item in showLocalImgArr">
                    <img :src="item">
                  </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import axios from 'axios'

  export default{

      mounted : function () {
        const $this = this;
        let token;
        axios({
          method:'get',
          url :'http://localhost:8080/api/img/token'
        }).then(function (res) {
          token = res.data.token;
          $this.initQiniuA(token);
        }).catch(function (res) {
          alert('carePhotoMge : 57')
        });
      },


      data : function () {
        return {
          showSelAll : false,
          upLoadImgArr : [],
          showLocalImgArr : [],
        }
      },
      methods : {
        upLoadAllPic : function () {
          //判断是否选择了老人  再进行上传
          const $this =this;
          let arr = [];
          for(let i = 0;i<this.$store.state.allOldManInfo.length;i++){
              if(this.$store.state.allOldManInfo[i].showSelOne){
                  arr.push(this.$store.state.allOldManInfo[i].id)
              }
          }
          if(arr.length > 0){
            axios({
              method : 'post',
              url : 'http://localhost:8080/api/agencyManager/setphoto',
              data : {
                pensioners:arr,
                paths:$this.upLoadImgArr
              }
            }).then(function (res) {
                alert('老人生活照片上传成功！');
                $this.showLocalImgArr = [];

            }).catch(function (res) {
                alert('后台不接收！丫的！')
            })
          }else {
              alert('请选择一位老人在进行上传。')
          }

        },
        selAll : function () {
            if(this.showSelAll=== true){
              this.showSelAll = false;
              for(let i=0;i<this.$store.state.allOldManInfo.length;i++){
                this.$store.state.allOldManInfo[i].showSelOne = false;
              }
            }else {
              this.showSelAll = true;
              for(let i=0;i<this.$store.state.allOldManInfo.length;i++){
                this.$store.state.allOldManInfo[i].showSelOne = true;
              }
            }
        },
        selOne : function (index) {

          this.$store.state.allOldManInfo[index].showSelOne = !this.$store.state.allOldManInfo[index].showSelOne;

        },
        initQiniuA : function (token) {
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
//                $this.showLoading = true;
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
                    $this.showLocalImgArr.push(this.result)
                };
                var domain = up.getOption('domain');
                var res = JSON.parse(info.response);
                var sourcesLink = domain + res.key;
                $this.upLoadImgArr.push(sourcesLink)
              },
              //上传出错时，处理相关的事情
              'Error': function(up, err, errTip) {
                alert('不能选择重复的照片')
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
  .carePhotoBox{
    width: 100%;
    height: auto;
  }
  /**/
  .careBtn-Box{
    width: 100%;
    border: 1px solid red;
    padding-left: 15px;
  }
  .btn-addPic,.btn-upPic{
    margin-top: 15px;
    width: 110px;
    height: 30px;
    line-height: 16px;
    background-color: #428bca;
    color: #fff;
    font-size: 14px;
    border: 1px solid #428bca;
    outline: 0;
  }
  .btn-upPic{
    margin-left: 20px;
  }
  /**/
  .carePicContent{
    width: 1040px;
    height: 530px;
    border: 1px solid #666;
    margin: 20px auto;
  }
  .elderListBox,.addPicBox{
    width: 50%;
    height: 100%;
    float: left;

  }
  /**/
  .selElder,.selPic{
    background-color: #428bca;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
  .selElder div{
    float: left;
  }
  .selElder div:nth-child(2){
    width: 488px;
    height: 100%;
    text-align: center;
  }
  .selIcon{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 10px;
    background-color: #fff;
  }
  .selIcon img{
    width: 100%;
    height: 100%;
    margin-bottom: 22px;
  }
  .elderList,.picList{
    width: 100%;
    height: 488px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .elderList .oldMan {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid red;
  }
  .oldMan .theRadio{
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 30px;
    background-color: #fff;
    border: 1px solid #009263
  }
  .theRadio img{
    width: 100%;
    height: 100%;
    margin-bottom: 4px;
  }
  .oldMan > img{
    margin-top: 10px;
    margin-left: 20px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    border: 1px solid red;
  }
  .oldManSimpleInfo{
    float: right;
    width: 200px;
    height: 100%;
  }
  .oldManSimpleInfo div{
    width: 100%;
    height: 50%;
    line-height: 35px;
    text-align: right;
  }
  .picList .photo{
    width: 33%;
    height: 33%;
    float: left;
  }
  .photo img{
    width: 100%;
    height: 100%;
    border: 1px solid blue;
  }

</style>
