# register-multicast-dns

Easily route a `.local` domain to your computer

```
npm install register-multicast-dns
```

## Usage

``` js
var register = require('register-multicast-dns')

// if someone resolves test.local it will now
// resolve to your local network ip
register('test')
```

## Command line usage

``` sh
npm install -g register-multicast-dns
register-multicast-dns test
```

## License

MIT
