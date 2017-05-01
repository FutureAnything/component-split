#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var split = require('./index')
var keys = Object.keys

var hosts = split(read(process.argv[2]))

keys(hosts).forEach(function (name) {
  keys(hosts[name]).forEach(function (ext) {
    write(name + '.' + ext, hosts[name][ext])
  })
})

function read (file) {
  return fs.readFileSync(file, 'utf8')
}

function write (file, content) {
  return fs.writeFileSync(path.join(
    process.argv[3] || process.cwd(), file
  ), content)
}
