function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}

function asyncExecAll (fn, arr) {
  
}

module.exports = {
  safeStringify : safeStringify,
  asyncDispatchAll: asyncDispatchAll
}
