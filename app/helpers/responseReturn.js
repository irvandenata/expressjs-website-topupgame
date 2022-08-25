
const responseReturn = {
  success: ({data: data,message: message}) =>
  {
    const response = {
      meta: {
        code: 200,
        message: message,
        status: 'success'
      },
      data: data
    }
    return response;
  },
  error: ({message: message,code: c,data: data}) =>
  {
    const code = c || 500;
    const status = code === 404 ? 'not found' : 'error';
    const response = {
      meta: {
        code: code,
        message: message,
        status: status
      }
      ,
      data: data ?? {}
    }
    return response;
  }
}

module.exports = responseReturn;