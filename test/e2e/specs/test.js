// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'index': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('.wrapper', 3000)
      // 是否存加载未完成的页面区域
      .assert.hidden('.loading')
      // 精选API
      .assert.elementPresent('.recommendApiList')
      // 精选微应用
      .assert.elementPresent('.recommendSerList')
      .end()
  }
}
