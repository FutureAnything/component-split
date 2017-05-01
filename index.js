var mkdom = require('mkdom')
var strip = require('strip-indent')
var scope = require('scope-css')

module.exports = split

function split (html) {
  var component = mkdom(html)
  var styles = component.querySelectorAll('style')
  var hosts = {}

  ;(function next (i) {
    if (!styles[i]) return
    var style = styles[i]
    var host = style.getAttribute('data-host')
    if (!host) return next(++i)
    style.parentNode.removeChild(style)
    var element = component.querySelector(host)
    if (!element) return next(++i)
    hosts[fmt(host)] = {
      html: stripped(element.outerHTML),
      css: stripped(scope(style.textContent, host))
    }
    next(++i)
  })(0)

  return hosts
}

function fmt (host) {
  return host
    .replace(/\W/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
}

function stripped (str) {
  return strip(str)
    .replace(/(^\r?\n|\r?\n$)/g, '')
}
