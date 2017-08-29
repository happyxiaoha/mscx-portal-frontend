<template>
  <div class="filter" v-loading="loading">
    <div class="filter-item">
      <label>对象：</label>
      <div class="filter-content">
        <el-checkbox-group v-model="checkedObject" class="object-checkbox">
          <el-checkbox :label="item.dictCode" v-for="item in objectList" :key="item.id">{{item.dictName}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="filter-item">
      <label>范围：</label>
      <div class="filter-content">
        <el-select v-model="province" class="range-select" placeholder="请选择">
          <el-option key="" label="不限" value=""></el-option>
          <el-option
            v-for="item in provinceOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <span class="append-txt">省</span>
        <el-select v-model="city" class="range-select" placeholder="请选择">
          <el-option key="" label="不限" value=""></el-option>
          <el-option
            v-for="item in cityOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <span class="append-txt">市</span>
        <el-select v-model="area" class="range-select" placeholder="请选择">
          <el-option key="" label="不限" value=""></el-option>
          <el-option
            v-for="item in areaOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        <span class="append-txt">区县</span>
      </div>
    </div>
    <div class="filter-item">
      <label>分类：</label>
      <div class="filter-content">
        <ul :class="[categoryMore ? 'expand' : '' ,'filter-tags']" ref="categoryUl">
          <li>
            <a href="javascript:;" @click="chooseCategory(-1)" :class="[activeCateIndex === -1 ? 'active' : '']">不限</a>
          </li>
          <li v-for="(item, index) in categoryList" :key="item.categoryId">
            <a href="javascript:;" @click="chooseCategory(index)" :class="[activeCateIndex === index ? 'active' : '']">{{item.categoryName}}</a>
          </li>
        </ul>
        <div class="tags-more">
          <a href="javascript:;" @click="toggleCategory">{{categoryMore ? '收起<<' : '更多>>'}}</a>
        </div>
      </div>
    </div>
    <div class="filter-item">
      <label>标签：</label>
      <div class="filter-content">
        <ul :class="[tagsMore ? 'expand' : '' ,'filter-tags']" ref="tagsUl">
          <li>
            <a href="javascript:;" @click="chooseTag(-1)" :class="[activeTagIndex === -1 ? 'active' : '']">不限</a>
          </li>
          <li v-for="(item, index) in tagsList" :key="item.tagId">
            <a href="javascript:;" @click="chooseTag(index)" :class="[activeTagIndex === index ? 'active' : '']">{{item.tagName || item.name}}</a>
          </li>
        </ul>
        <div class="tags-more">
          <a href="javascript:;" @click="toggleTags">{{tagsMore ? '收起<<' : '更多>>'}}</a>
        </div>   
      </div>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import API from 'common/api'
  import _ from 'lodash'
  const resource = require('./city.json')
  const DATA_API_TYPE = 'dataAPI'
  const TOOL_API_TYPE = 'toolAPI'
  const MODEL_API_TYPE = 'modelAPI'
  const SERVICE_TYPE = 'service'
  const SAAS_TYPE = 'saas'
  export default {
    props: ['type', 'category', 'tag'],
    data: function () {
      return {
        loading: false,
        checkedObject: [],
        objectList: [],
        province: '',
        city: '',
        area: '',
        provinceOptions: resource.provinces,
        cityOptions: [],
        areaOptions: [],
        categoryList: [],
        tagsList: [],
        categoryMore: false,
        tagsMore: false,
        activeCateIndex: -1,
        activeTagIndex: -1,
        categoryId: '',
        tagId: ''
      }
    },
    computed: {
      
    },
    watch: {
      province (val, oldVal) {
        this.city = ''
        this.area = ''
        let province = _.find(resource.provinces, (item) => {
            return item.code === val;
        }) || {};
        this.cityOptions = province.cities || []
        this.$emit('updateParams', {
          scope: province.name || ''
        })
      },
      city (val, oldVal) {
        this.area = ''
        if(!val) return
        let city = _.find(this.cityOptions, (item) => {
            return item.code === val;
        }) || {};
        this.areaOptions = city.areas || []
        this.$emit('updateParams', {
          scope: city.name || ''
        })
      },
      area (val, oldVal) {
        if(!val) return
        let area = _.find(this.areaOptions, (item) => {
            return item.code === val;
        });
        this.$emit('updateParams', {
          scope: area.name || ''
        })
      },
      checkedObject (val, oldVal) {
        this.$emit('updateParams', {
          serviceObject: val.join(',')
        })
      },
      categoryId (val, oldVal) {
        this.$emit('updateParams', {
          categoryId: val
        })
        this.loading = true
        this.tagId = ''
        this.activeTagIndex = -1
        if(val === -1) {
          switch(this.type) {
            case DATA_API_TYPE:
              API.Dict.getDataApiTags().then((res) => {
                this.tagsList = res.result;
                this.loading = false
              })
              break;
            case TOOL_API_TYPE:
              API.Dict.getToolApiTags().then((res) => {
                this.tagsList = res.result;
                this.loading = false
              })
              break;
            case MODEL_API_TYPE:
              API.Dict.getModelApiTags().then((res) => {
                this.tagsList = res.result;
                this.loading = false
              })
              break;
            case SERVICE_TYPE:
              API.Dict.getServiceTags().then((res) => {
                this.tagsList = res.result;
                this.loading = false
              })
              break;
            case SAAS_TYPE:
              API.Dict.getSaasTags().then((res) => {
                this.tagsList = res.result;
                this.loading = false
              })
              break;
          }
        }else {
          API.Dict.getTagsInfo({
            categoryId: val
          }).then((res) => {
            this.tagsList = res.result;
            this.loading = false
          })
        }
      },
      tagId (val, oldVal) {
        this.$emit('updateParams', {
          tagId: val
        })
      }
    },
    created () {
      this.loading = true
      switch(this.type) {
        case DATA_API_TYPE:
          this.getDataApiBundle();
          break;
        case TOOL_API_TYPE:
          this.getToolApiBundle();
          break;
        case MODEL_API_TYPE:
          this.getModelApiBundle();
          break;
        case SERVICE_TYPE:
          this.getServiceBundle();
          break;
        case SAAS_TYPE:
          this.getSaaSBundle();
          break;
      }
      
    },
    methods: {
      toggleCategory () {
        this.categoryMore = !this.categoryMore;
        this.$refs.categoryUl.scrollTop = 0;
      },
      toggleTags () {
        this.tagsMore = !this.tagsMore;
        this.$refs.tagsUl.scrollTop = 0;
      },
      getDataApiBundle () {
        Axios.all([API.Dict.getServiceObject(),
          API.Dict.getDataApiCategory(),
          API.Dict.getDataApiTags()]).then(Axios.spread((serviceObject, category, tags) => {
            this.objectList = serviceObject.result;
            this.categoryList = category.result;
            this.tagsList = tags.result;
            this.loading = false;
            this.handleDefaultCategory()
            this.handleDefaultTag()
          }))
      },
      getToolApiBundle () {
        Axios.all([API.Dict.getServiceObject(),
          API.Dict.getToolApiCategory(),
          API.Dict.getToolApiTags()]).then(Axios.spread((serviceObject, category, tags) => {
            this.objectList = serviceObject.result;
            this.categoryList = category.result;
            this.tagsList = tags.result;
            this.loading = false;
            this.handleDefaultCategory()
            this.handleDefaultTag()
          }))
      },
      getModelApiBundle () {
        Axios.all([API.Dict.getServiceObject(),
          API.Dict.getModelApiCategory(),
          API.Dict.getModelApiTags()]).then(Axios.spread((serviceObject, category, tags) => {
            this.objectList = serviceObject.result;
            this.categoryList = category.result;
            this.tagsList = tags.result;
            this.loading = false;
            this.handleDefaultCategory()
            this.handleDefaultTag()
          }))
      },
      getServiceBundle () {
        Axios.all([API.Dict.getServiceObject(),
          API.Dict.getServiceCategory(),
          API.Dict.getServiceTags()]).then(Axios.spread((serviceObject, category, tags) => {
            this.objectList = serviceObject.result;
            this.categoryList = category.result;
            this.tagsList = tags.result;
            this.loading = false;
            this.handleDefaultCategory()
            this.handleDefaultTag()
          }))
      },
      getSaaSBundle () {
        Axios.all([API.Dict.getServiceObject(),
          API.Dict.getSaasCategory(),
          API.Dict.getSaasTags()]).then(Axios.spread((serviceObject, category, tags) => {
            this.objectList = serviceObject.result;
            this.categoryList = category.result;
            this.tagsList = tags.result;
            this.loading = false;
            this.handleDefaultCategory()
            this.handleDefaultTag()
          }))
      },
      chooseCategory (index) {
        index = typeof index === undefined ? -1 : index
        this.activeCateIndex = index
        this.categoryId = index !== -1 ? this.categoryList[index].categoryId : ''
      },
      chooseTag (index) {
        index = typeof index === undefined ? -1 : index
        this.activeTagIndex = index
        this.tagId = index !== -1 ? this.tagsList[index].tagId : ''
      },
      handleDefaultCategory () {
        let defaultCategoryIndex = -1
        if(this.category) {
          _.each(this.categoryList, (item, index) => {
            if(item.categoryId == this.category)  {
              defaultCategoryIndex = index
              return
            }
          })
          this.activeCateIndex = defaultCategoryIndex
        }
      },
      handleDefaultTag () {
        let defaultTagIndex = -1
        if(this.tag) {
          _.each(this.tagsList, (item, index) => {
            if(item.tagId == this.tag)  {
              defaultTagIndex = index
              return
            }
          })
          this.activeTagIndex = defaultTagIndex
        }
      },
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/variables.less";
  @import "../../assets/less/mixins.less";
  .filter {
    background: #fff;
    border: 1px solid #ccc;
    box-sizing: border-box;
    .box-shadow();
    .filter-item {
      // height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #eee;
      padding-left: 25px;
      overflow: hidden;
      label {
        color: @linkColor;
        width: 80px;
        display: block;
        float: left;
      }
      .filter-content {
        padding-left: 100px;
        position: relative;
        .range-select {
          width: 110px;
          input {
            border: 0
          }
        }
        .object-checkbox label {
          color: #666;
        }
        .append-txt {
          display: inline-block;
          vertical-align: middle;
        }
        .filter-tags {
          overflow: hidden;
          height: 60px;
          padding-right: 10px;
          box-sizing: border-box;
          &.expand {
            height: auto;
            max-height: 500px;
            overflow: auto;
          }
          li {
            float: left;
            width: 80px;
            margin-right: 20px;
            text-align: center;
            .ellipsis();
            position: relative;
            &:first-child {
              text-align: left;
              padding-left: 0;
            }
            a {
              color: #666;
            }
            a.active {
              color: #fff;
              background: #22c6c1;
              padding: 5px 12px;
              border-radius: 5px;
              border: 0;
            }
          }
        }
        .tags-more {
          position: absolute;
          right: 20px;
          top: 0;
        }
      }
    }
  }
</style>
