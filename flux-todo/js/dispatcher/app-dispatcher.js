var Dispatcher = require('./Dispatcher');

class AppDispatcher extends Dispatcher {
  handleViewAction(action){
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

module.exports = AppDispatcher;
