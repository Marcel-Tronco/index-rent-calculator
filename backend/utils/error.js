class BadCredentialsError extends Error {
  constructor(...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadCredentialsError)
    }
    this.name = 'BadCredentialsError'
  }
}

class ValidationError extends Error {
  constructor(...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadCredentialsError)
    }
    this.name = 'ValidationError'
  }
}

class SqlError extends Error {
  constructor(...params) {
    super(...params)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadCredentialsError)
    }
    this.name = 'SqlError'
  }
}


module.exports = {
  BadCredentialsError, SqlError, ValidationError
}