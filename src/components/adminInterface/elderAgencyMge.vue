<template>
    <div class="wrapper">
        <!-- btn control-->
        <div class="btn-box">
            <button class="btn" @click="del()">{{ Msg.del }}</button>
            <button class="btn" @click="add()">{{ Msg.add }}</button>
            <button class="btn" @click="edit()">{{ Msg.edit }}</button>
        </div>
        <!-- Agency Mge List  -->
        <div class="elderMgeContent">
            <table class="table table-bordered table-Mge">
                <thead>
                    <tr>
                        <th></th>
                        <th>机构名称</th>
                        <th>机构地址</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in agencyArr">
                        <td>
                            <div class="radio" @click="selected(index)">
                                <img src="../../assets/img/my_checkbox.png" v-show="item.bol"/>
                            </div>
                        </td>
                        <td>{{ item.agencyName }}</td>
                        <td>{{ item.address }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>
<script>
    import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'
    import axios from 'axios'

    //初始化时候获取注册时候的养老机构信息
    export default {
        computed : {
            ...mapState([
                'agencyArr',
            ])
        },
        data : function () {
            return {
                Msg : {del : '删除机构',add : '添加机构',edit : '编辑机构'},
            }
        },
        methods : {
            del : function(){
                for(let i=0;i<this.$store.state.agencyArr.length;i++){
                    if(this.$store.state.agencyArr[i].bol === true){
                      this.$store.commit('changeTrue');
                      this.$store.state.btnMsg = this.Msg.del;
                      this.$store.state.boll = true;
                      this.$store.state.title = false;
                      this.$store.state.index = i;
                    }
                }
            },
            add : function () {
                if(this.$store.state.agencyArr.length >= 5){
                    alert('您最多可以添加5家机构！！')
                }else {
                    this.$store.state.agencyName = '';
                    this.$store.state.address = '';
                    this.$store.state.title = true;
                    this.$store.commit('changeTrue');
                    this.$store.state.btnMsg = this.Msg.add;
                }
            },
            edit : function () {
                for(let i=0;i<this.$store.state.agencyArr.length;i++){
                    if(this.$store.state.agencyArr[i].bol === true){
                        this.$store.state.address = this.$store.state.agencyArr[i].address;
                        this.$store.state.title = true;
                        this.$store.commit('changeTrue');
                        this.$store.state.btnMsg = this.Msg.edit;
                        this.$store.state.bol = false;
                        this.$store.state.index = i;
                    }
                }
            },
            selected : function (index) {
                const arr = this.$store.state.agencyArr;
                for(let i=0;i<arr.length;i++){
                    arr[i].bol = false;
                }
                arr[index].bol = true;
            }
        }
    }
</script>
<style>
    .wrapper{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .btn-box{
        width: 100%;
        height: 45px;
        padding-right: 15px;
        padding-left: 15px;
        position: relative;
    }
    .btn-box .btn{
        float: right;
        margin-top: 15px;
        width: 110px;
        height: 30px;
        line-height: 16px;
        border: 1px solid #428bca;
        outline: 0;
        background-color: #428bca;
        color: #fff;
        font-size: 14px;
    }
    .btn-box .btn:hover{
        cursor: pointer;
    }
    .btn-box button:not(:first-child){
        margin-right: 20px;
    }

    /*-----------------------------   table  Mge    ----------------------------*/
    .elderMgeContent{
        background-color: #fff;
        margin-top: 25px;
        margin-right: 18px;
        padding: 0 0 16px 20px;
    }
    .elderMgeContent>.table.table-Mge>thead>tr,.elderMgeContent>.table-Mge>thead>tr>th {
        border: 1px solid #666;
        background-color: #428bca;
        color: #fff;
        font-weight: normal;
        height: 23px;
        line-height: 23px;
        text-align: center;
    }
    .table-Mge>thead>tr>th:nth-child(1),.table-Mge>tbody>tr>td:nth-child(1) {
        width: 40px;
        background-color: #428bca;
    }
    .table-Mge>tbody>tr>td,.table-Mge>tbody>tr{
        text-align: center;
    }
    .table-Mge>tbody>tr>td{
        border: 1px solid #666;
        color: #666;
        font-size: 14px;
        height: 23px;
        line-height: 23px;
        vertical-align: middle;
        width: calc(50%);
    }
    .radio{
        width: 20px;
        height: 20px;
        margin: 0 auto;
        border-radius: 50%;
        background-color: white;
    }
    .radio img{
        transform: translateY(-2px);
    }
</style>
