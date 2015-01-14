/** @jsx React.DOM */
var React = require('react');

var MyComponent = React.createClass({
  render: function() {
    return <span className="MyComponent">Hello, MyComponent!</span>;
  }
});

module.exports = MyComponent;
