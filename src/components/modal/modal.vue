<template>
    <div class="modal-box" v-if="modalShowOrHide">

        <!-- NO.1 Modal  Agency Mge   -->
        <div class="agencyBox" v-show="showAgencyModel">
            <div class="addPension">
                <h3 v-show="title">{{ btnMsg }}</h3>
                <h3 v-show="!title">提示</h3>
                <div class="addInfo" v-show="title">
                    <p v-show="bol">机构名称</p>
                    <p v-show="bol"><input type="text" v-model="agencyName"/></p>
                    <p>机构地址</p>
                    <p><input type="text" v-model="address"/></p>
                </div>
                <p class="delAgency" v-show="!title">删除该机构？</p>
                <div class="bottom-btn">
                    <button @click="updatePension($store.state.index)" v-show='!boll'>保存</button>
                    <button @click="cut($store.state.index)" v-show='boll'>确认</button>
                    <button @click="hide()">取消</button>
                </div>
            </div>
        </div>

        <!-- NO.2   -->


    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import axios from 'axios'

    export default {
        computed : {
            ...mapState([
                'btnMsg','bol','boll','modalShowOrHide','showAgencyModel','title'
            ]),
            agencyName : {
                get: function () {
                    return this.$store.getters.agencyName
                },
                set: function (value) {
                    this.$store.commit('setAgencyName', value)
                }
            },
            address : {
                get: function () {
                    return this.$store.getters.address
              },
                set: function (value) {
                    this.$store.commit('setAddress', value)
                }
            }
        },
        methods : {
            hide : function(){
                this.$store.commit('changeFalse')
            },
            updatePension : function(index){
                const $this = this;
                const adminId = $this.$cookie.get('adminid');
              //添加机构
                if( index === '' ){
                    if($this.agencyName && $this.address){
                        $this.hide();
                        $this.$store.dispatch('addRess', { adminId, agencyName : $this.agencyName, address: $this.address })
                        axios({
                            method : 'post',
                            url : 'http://localhost:8080/api/agencyManager/addAgency/' + adminId,
                            data : {
                              agencyName : $this.agencyName,
                              address : $this.address
                            }
                        }).then(function (res) {
                            $this.$store.state.agencyArr.push({ agencyName:$this.agencyName,address:$this.address,agencyId:res.data.agencyid,bol:false });
                            $this.hide();
                        }).catch(function (res) {
                            alert('机构添加失败')
                        })
                    }
                //编辑机构
                }else {

                    $this.$store.state.bol = true;
                    $this.hide();
                    $this.$store.state.index = '';
                    this.$store.state.agencyArr[index].address = this.address;
                    this.$store.state.address = '';
                }
            },
            cut : function (index) {
                const id =  this.$store.state.agencyArr[index].agencyId;
                const $this = this;
                if(index === 0){
                    alert('不能删除该机构！')
                }else {
                  axios({
                    method : 'delete',
                    url : 'http://localhost:8080/api/agencyManager/'+ id +'/del',
                  }).then(function (res) {
                    $this.$store.state.index = '';
                    $this.$store.commit('changeFalse');
                    $this.$store.state.boll = false;
                    $this.$store.state.agencyArr.splice(index,1)
                  }).catch(function (res) {
                    alert('呀！失败了！')
                  });
                }



            }
        }
    }

</script>
<style>
    .modal-box{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100000;
    }

    /* --------------------  Agency Mge  ------------------------*/
    .agencyBox{
        width: 100%;
        height: 100%;
        background-color: rgba(21,21,21,.5);
    }
    .addPension{
        width: 450px;
        height: auto;
        border: 1px solid rgb(102,102,102 );
        border-radius: 5px;
        position: absolute;
        top: 160px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
    }
    .addPension h3{
        width: 100%;
        height: 42px;
        line-height: 42px;
        text-align: left;
        text-indent: 15px;
        color: white;
        background-color: rgb(66, 139, 202);
        margin-top: 0;
    }
    .addPension .addInfo {
        width: 80%;
        margin: 20px auto;
    }
    .addPension .addInfo p{
        text-align: left;
        width: 100%;
        height: 35px;
        line-height: 35px;
    }
    .addPension .addInfo p input{
        width: 100%;
        height: 100%;
    }
    .addPension .bottom-btn{
        width: 100%;
        height: 30px;
        text-align: right;
        margin-top: 50px;
        margin-bottom: 20px;
        padding-right: 30px;
    }
    .addPension .bottom-btn button{
        text-align: center;
        height: 100%;
        width: 100px;
        background-color: rgb(66, 139, 202);
        color: white;
        border: none;
        margin-right: 15px;
    }
    .addPension .delAgency{
      width: 100%;
      height: 135px;
      font-size: 21px;
      text-align: center;
      line-height: 135px;
    }
    /* --------------------    ------------------------*/



</style>
