var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  render: function() {
    return (
      /*jshint ignore:start */
      React.createElement("div", null, 
        React.createElement(SearchBar, null), 
        React.createElement(ProductTable, {products: this.props.products})
      )
      /*jshint ignore:end */
    );
  }
});

var SearchBar = React.createClass({displayName: "SearchBar",
  render: function() {
    return (
      /*jshint ignore:start */
      React.createElement("form", null, 
        React.createElement("input", {type: "text", placeholder: "Search..."}), 
        React.createElement("p", null, 
          React.createElement("input", {type: "checkbox"}), 
          ' ', 
          "Only show products in stock"
        )
      )
      /*jshint ignore:end */
    );
  }
});

var ProductTable = React.createClass({displayName: "ProductTable",
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(
          /*jshint ignore:start */
          React.createElement(ProductCategoryRow, {category: product.category, key: product.category})
          /*jshint ignore:end */
        );
      }
      rows.push(
        /*jshint ignore:start */
        React.createElement(ProductRow, {product: product, key: product.name})
        /*jshint ignore:end */
      );
      lastCategory = product.category;
    });
  }
});

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

React.render(
  /*jshint ignore:start */
  React.createElement(FilterableProductTable, {products: PRODUCTS}),
  document.body
  /*jshint ignore:end */
);
