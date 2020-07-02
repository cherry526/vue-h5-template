import Vue from 'vue'

let listenAction
let originalHeight
let currHeight
const directives =  {
  // 输入框自动聚焦元素
  focus: {
    inserted: function(el) {
      el.focus()
    }
  },
  // 监听滚动事件
  scroll: {
    bind: function(el, binding, vnode) {
      el.addEventListener('scroll', vnode.context.loadMore)
    },
    unbind: function(el, binding, vnode) {
      el.removeEventListener('scroll', vnode.context.loadMore)
    }
  },
  // 解决安卓键盘把固定定位向上顶
  footers: {
    //  inserted
    inserted: function (el, binding, vNode) {
    const elStyle = el.style
    let active = false
    originalHeight = document.body.clientHeight;
    const reset = () => {
      if(!active) {
        return
      }
      elStyle.display = 'block';
      // let app = document.getElementById('apps')
      // app.style.borderBottom = '1.33rem solid transparent'
      active = false
    }
    const hang = () => {
      if(active) {
        return
      }
      elStyle.display = 'none'
      // let app = document.getElementById('apps')
      // app.style.borderBottom = 0
      active = true
    }
    const getCurrHeight = () => {
      let getHeight = document.body.clientHeight
      return getHeight
    }
    const check = () => {
      currHeight = getCurrHeight()
      if((currHeight/originalHeight) < 0.8 ) {
        hang()
      }else {
        reset()
      }
    }
    listenAction = () => {
      check()
    }
    window.addEventListener('resize', listenAction);
  },
  update: function(el, binding, vNode){
    const elStyle = el.style;
    let active = false
    originalHeight = document.body.clientHeight;
    const reset = () => {
      if(!active) {
        return
      }
      elStyle.display = 'block';
      active = false;
    }
    const hang = () => {
      if(active) {
        return
      }
      elStyle.display = 'none'
      // let app = document.getElementById('apps')
      // app.style.paddingBottom = 0
      active = true
    }
    const getCurrHeight = () => {
      let getHeight = document.body.clientHeight;
      return getHeight
    }
    const check = () => {
      currHeight = getCurrHeight();
      if((currHeight/originalHeight) < 0.8 ) {
        hang()
      }else {
        reset()
      }
    }
    listenAction = () => {
      check()
    }
    window.addEventListener('resize', listenAction)
  }
  // unbind() {
  //   window.removeEventListener('resize',listenAction);
  // }
  }
}
export default (Vue) => {
  for (const key in directives) {
    Vue.directive(key, directives[key])
  }
}
