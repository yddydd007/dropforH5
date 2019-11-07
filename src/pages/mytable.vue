<template>
 <div class="">
   <list
     v-model="loading"
     :finished="finished"
     :error.sync="error"
     finished-text="没有更多了"
     @load="onLoad"
   >
<!--     datetime: "2019-11-06 15:13:05"-->
<!--     id: "2"-->
<!--     is_fatal: "0"-->
<!--     message: null-->
<!--     stack: null-->
<!--     version: ""-->

     <Cell
       v-for="(item,index) in list"
       :key="index"
     >
       <template slot="title">
         <span class="custom-title">{{item.datetime}}</span>
         <span class="custom-title">{{item.message}}</span>
         <span class="custom-title">{{item.stack}}</span>
         <span class="custom-title">{{item.is_fatal=='0'?'没崩溃':'崩溃了'}}</span>
       </template>
     </Cell>
   </list>
 </div>
</template>

<script>
    import { List,Cell } from 'vant';
    import http from '../http/http'
    export default {
        name: "mytable",
        data(){
          return{
              loading:false,
              finished:false,
              list:[],
              pn:1,
              error:false
          }
        },
        components:{
            List,
            Cell
        },
        methods:{
            onLoad(){
                let self = this;
                http.get('/error/catch_list', {
                    limit:10,
                    pn:this.pn++
                },(res) => {
                  self.list = res.data.list;
                  self.loading = false;
                  self.finished = true;
                },(error) => {
                    self.error = true;
                })
            },
            mounted(){
                this.onLoad()
            }
        }
    }
</script>

<style scoped>

</style>
