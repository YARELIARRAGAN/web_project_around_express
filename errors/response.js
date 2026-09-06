module.exports.responseError = function responseError(res, statusCode, message) {
  res.status(statusCode).json({
    message,
  });
};
