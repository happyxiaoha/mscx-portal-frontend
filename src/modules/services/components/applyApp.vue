<script>
  import API from 'common/api'
  import applyBase from 'components/applyBase'
  export default {
    extends: applyBase,
    methods: {
      isNeedPackage () {
        return this.chargeType !== '01'
      },
      getPackage (id) {
        return API.App.getPackage({
          appId: id
        })
      },
      placeFreeOrder (id) {
        return API.Common.placeFreeAppOrder({
          appId: id
        })
      },
      placeFeeOrder (options) {
        return API.Common.placeFeeAppOrder({
          appId: options.id,
          charRuleId: options.charRuleId,
          itemNum: options.itemNum
        })
      }
    }
  }
</script>