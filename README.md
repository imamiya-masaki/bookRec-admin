# bookrec-admin

## Project setup
rootで
```
npm install
```

### Compiles and hot-reloads for development
publicに入って
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### portターゲット
heroku(windows勢?)はtarget変えてね！！！

vue.config.js

module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/': {
        //local
        target: 'http://127.0.0.1:8080/',
        //heroku
        // target: 'http://54.178.65.84:8080/'
      }
    }
  }
}
