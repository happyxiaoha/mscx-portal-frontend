<template>
  <el-dialog title="选择标签" custom-class="tag-dialog" :visible.sync="dialogVisible" :before-close="handleClose">
    <div class="tag-list-area" ref="tagArea">
      <div class="filter-area">
        <div class="filter-a">
          <a href="javascript:;" @click="toTag(item)" v-for="item in letterArray">{{item}}</a>
        </div>
        <el-input class="tag-search" v-model="searchText" placeholder="请输入查询内容"></el-input>
      </div>
      <el-checkbox-group v-model="selectedTags" v-if="tags.length > 0">
        <ul class="tag-content" v-if="filterTags.length > 0">
          <li v-for="item in filterTags">
            <el-checkbox :label="item.tagId + '|' + item.name">{{item.name}}</el-checkbox>
          </li>
        </ul>
        <div class="tag-content empty-tip" v-else>
          没有搜索到“{{searchText}}”，是否将“{{searchText}}”标签添加到标签字典中，如果是，点击<a href="javascript:;" @click="addNewTag">添加</a>
        </div>
      </el-checkbox-group>
      <!-- <label class="tag-content empty-tip" v-else>
        此分类无标签
      </label> -->
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import API from 'common/api'
  import _ from 'lodash'
  export default {
    props: ['visible', 'categoryId', 'defaultTags'],
    data () {
      return {
        dialogVisible: this.visible,
        tags: [],
        filterTags: [],
        selectedTags: this.defaultTags || [],
        searchText: '',
        letterArray: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
        'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
        'v', 'w', 'x', 'y', 'z']
      }
    },
    created () {
      this.getTags()
    },
    methods: {
      handleClose (done) {
        done()
        this.$emit('toggle', this.dialogVisible)
      },
      closeDialog () {
        this.dialogVisible = false
        this.$emit('toggle', this.dialogVisible)
      },
      getTags () {
        API.Dict.getTagsInfoWithPinyin({
          categoryId: this.categoryId
        }).then((res) => {
          this.tags = res.result
          this.filterTag()
        })
      },
      toTag (letter) {
        let index = _.findIndex(this.tags, (item) => {
          return item.tagPinyin === letter
        })
        if(index) {
          this.$refs.tagArea.scrollTop = index * 27 + 60
        }
      },
      addNewTag () {
        API.Dict.addTag({
          categoryId: this.categoryId,
          tagName: this.searchText
        }).then((res) => {
          this.getTags()
        })
      },
      filterTag () {
        if(this.searchText === '') {
          this.filterTags = this.tags
        }else {
          this.filterTags = _.filter(this.tags, (item) => {
            return item.name.toLocaleUpperCase().indexOf(this.searchText.toLocaleUpperCase()) >= 0
          })
        }
      },
      submit () {
        this.$emit('selected', this.selectedTags)
        this.closeDialog()
      }
    },
    watch: {
      visible () {
        this.dialogVisible = this.visible
      },
      categoryId () {
        this.getTags()
      },
      searchText () {
        this.filterTag()
      },
      defaultTags () {
        this.selectedTags = this.defaultTags || []
      }
    }
  }
</script>
<style lang="less">
  .tag-dialog {
    width: 350px;
    position: relative;
    .el-dialog__body {
      padding: 0!important;
    }
    .tag-list-area {
      height: 400px;
      overflow: auto;
      .filter-area {
        position: relative;
        top: 0;
        left: 0;
        width: 94%;
        background: #fff;
        padding: 10px 0 0;
        z-index: 999;
        font-size: 12px;
        .filter-a {
          padding: 0 10px 5px 30px;
          a {
            display: block;
            float: left;
            margin-right: 4px;
          }
        }
        .tag-search {
          position: absolute;
          top: 35px;
          left: 25px;
          width: 180px;
          z-index: 99999;
        }
      }
      .tag-content {
        margin-top: 60px;
        width: 84%;
        padding: 10px 20px;
        position: relative;
        z-index: 10;
        li {
          padding: 3px 0;
        }
      }
      .empty-tip {
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
</style>