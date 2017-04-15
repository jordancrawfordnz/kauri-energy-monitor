module.exports = function() {
  return function(req, res, next) {
    res.sendFile(require('path').join(__dirname, '../../client/index.html'));
  };
};