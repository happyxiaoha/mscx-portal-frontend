<script>
  import API from 'common/api'
  import applyBase from 'components/applyBase'
  export default {
    extends: applyBase,
    methods: {
      isNeedPackage () {
        // 如果是免费的或者是后付款的，就不需要获取套餐
        return this.chargeType !== '01' && this.chargeType !== '03'
      },
      getPackage (id) {
        return API.Saas.getPackage({
          saasId: id
        })
      },
      placeFreeOrder (id) {
        return API.Common.placeFreeSaasOrder({
          appId: id
        })
      },
      placeAfterFeeOrder (id) {
        return API.Common.placeAfterFeeSaasOrder({
          appId: id
        })
      },
      placeFeeOrder (options) {
        return API.Common.placeFeeSaasOrder({
          appId: options.id,
          charRuleId: options.charRuleId,
          itemNum: options.itemNum
        })
      }
    }
  }
</script>