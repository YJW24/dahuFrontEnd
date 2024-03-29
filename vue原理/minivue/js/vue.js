class Vue {
  constructor(options) {
    // 1.通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    const el = options.el
    this.$el = typeof el === 'string' ? document.querySelector(el) : el

    // 2.把data中的成员转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data)

    // 3.调用observe对象，监听数据的变化
    new Observer(this.$data)
    // 4.调用compiler对象，解析指令和插值表达式
  }

  // 遍历data中的所有属性，把data的属性注入到vue实例中
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (data[key] === newValue) {
            return
          }
          data[key] === newValue
        },
      })
    })
  }
}
