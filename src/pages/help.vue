<template>
    <div class="help">
      <collapse v-model="activeNames" accordion>
        <collapse-item title="如何提高中签几率" name="drawprobability">
          <p>1.分享给更多的用户，每增加一次助攻可以提升中签几率</p>

          <p>2.参与活动的未中签次数，可帮助您累计提升中签几率</p>

          <p>3.在炒饭 APP的可使用余额越多时，可提升每次活动的中签几率</p>
        </collapse-item>
        <collapse-item title="预售,现货发货时间" name="futures">
          1.海外预售周期：35天内发出
          2.国内现货周期：48小时内发出；
        </collapse-item>
        <collapse-item title="限时抢购参与规则" name="draw" >
          <img width="100%" src="../../static/img/qgou.png" alt="">
        </collapse-item>
        <collapse-item title="限时抽签及原价购参与规则" name="panicbuy" >
          <img width="100%" src="../../static/img/chq.png" alt="">
        </collapse-item>
        <collapse-item title="自由交易区购买规则" name="freetrade" >
          <img width="100%" src="../../static/img/freeTradeRules.png" alt="">
        </collapse-item>
        <collapse-item title="平台收货地址" name="ourAdress" >
          收件人:酱爆君
          联系电话:17191187921
          公司地址：北京市朝阳区朝外大街乙6号 朝外SOHO B座 0823
        </collapse-item>
        </collapse>
    </div>
</template>

<script>
    import { Collapse, CollapseItem } from 'vant';
    export default {
        name: "help",
        data(){
            return{
                activeNames:''
            }
        },
        components:{
            Collapse,
            CollapseItem
        },
        mounted(){
          this.activeNames = this.$route.params.type
        },
        methods:{
            clickBtn (index, i) {
                this.flag = true
                const arrList = this.conditions[index].list[i].value
                const _this = document.getElementsByClassName('btn-container')[index].children[i]
                const attr = _this.getAttribute('class')
                if (attr.indexOf('active') === -1) {
                    _this.setAttribute('class', 'btn active')
                    // this.arrVal.push( arrList ) + "-"
                    this.getLeftList()
                } else {
                    _this.setAttribute('class', 'btn')
                    // this.arrVal.splice(index,1)

                    this.getLeftList()
                }

                if (this.arrVal.indexOf(arrList) === -1 ) {
                    let newArr = this.arrVal.push( arrList );
                    let newStr = newArr.join('-')
                } else {
                    this.arrVal.splice(this.arrVal.indexOf(arrList),1)
                }
            },
        }
    }
</script>

<style scoped>
  .help{
    padding: 20px 10px 50px 10px;
  }
  h5{
    line-height: 26px;
    font-size: 16px;
  }
  p{
    line-height: 26px;
    text-indent: 35px;
    text-align: left;
  }
  .important{
    font-size: 16px;
    font-weight: bold;
  }
</style>
