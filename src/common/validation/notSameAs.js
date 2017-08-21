import {ref, withParams} from 'vuelidate/lib/validators/common'

export default function (equalTo) {
  return withParams({type: 'notSameAs'}, function (value, parentVm) {
    return value !== ref(equalTo, this, parentVm)
  })
}
