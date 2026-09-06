module.exports.crearOrFail = function crearOrFail(message) {
  const error = new Error(message);
  throw error;
};
