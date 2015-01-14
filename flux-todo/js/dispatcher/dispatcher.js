// var Promise = require('es6-promise').Promise;

var _callbacks = [];
var _promises = [];

class Dispatcher {
  register(callback) {
    _callbacks.push(callback);
    return _callbacks.length - 1;
  }

  dispatch(payload) {
    var resolves = [];
    var rejects = [];
    _promises = _callbacks.map(function(_, i) {
      return new Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });
    _callbacks.forEach(function(callback, i) {
      Promise.resolve(callback(payload)).then(function() {
        resolves[i](payload);
      }, function() {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      });
    });
    _promises = [];
  }
}

module.exports = Dispatcher;
