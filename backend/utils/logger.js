const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log((new Date()).toISOString() + ': ', ...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error((new Date()).toISOString() + ': ',...params)
  }
}

module.exports = {
  info, error
}