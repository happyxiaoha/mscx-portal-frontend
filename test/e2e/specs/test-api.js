// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'api-index': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL + '/api.html'

    console.log(devServer)

    browser
      .url(devServer)
      .waitForElementVisible('.wrapper', 3000)
      // 检查title
      .assert.title('神州数云-API')
      // 检查是否有弹层
      .assert.elementNotPresent('.layui-layer')
      // 精选API
      .assert.elementPresent('.recommendApiList li')
      // 精选微应用
      .assert.elementPresent('.recommendSerList li')
      .end()
  }
}
