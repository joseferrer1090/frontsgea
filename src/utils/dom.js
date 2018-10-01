export default {
  addListener: function (target, type, listener) {
    target.addEventListener(type, listener)
    return {
      remove: () => {
        target.removeEventListener(type, listener)
      }
    }
  }
}
