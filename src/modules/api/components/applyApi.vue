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
        return API.Api.getPackage({
          apiServiceId: id
        })
      },
      placeFreeOrder (id) {
        return API.Common.placeFreeApiOrder({
          apiId: id
        })
      },
      placeFeeOrder (options) {
        return API.Common.placeFeeApiOrder({
          apiId: options.id,
          charRuleId: options.charRuleId,
          itemNum: options.itemNum
        })
      }
    }
  }
</script>