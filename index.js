var addr = require('network-address')
var multicastdns = require('multicast-dns')

module.exports = function (name) {
  name = name.replace('.local', '')
  var mdns = multicastdns()

  mdns.on('error', function () {
    // ignore errors
  })

  mdns.on('query', function (query) {
    var qs = query.questions
    for (var i = 0; i < qs.length; i++) {
      if (qs[i].name.replace('.local', '') !== name) continue
      if (qs[i].type !== 'A' && qs[i].type !== 'AAAA') continue

      mdns.respond({
        answers: [{
          name: qs[i].name,
          type: 'A',
          ttl: 300,
          data: addr.ipv4()
        }],
        additionals: [{
          name: qs[i].name,
          type: 'AAAA',
          ttl: 300,
          data: addr.ipv6()
        }]
      })
      return
    }
  })

  return function () {
    mdns.destroy()
  }
}
