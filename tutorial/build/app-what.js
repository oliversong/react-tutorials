var FilterableProductTable = React.createClass({displayName: "FilterableProductTable",
  getInitialState: function() {
    return {
      filterText: "",
      inStockOnly: false
    }
  },
  handleSearchInput: function(filterText, inStockOnly) {
    this.setState({
      filterText:filterText,
      inStockOnly:inStockOnly
    });
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(SearchBar, {
          filterText: this.state.filterText, 
          inStockOnly: this.state.inStockOnly, 
          onUserInput: this.handleSearchInput}
        ), 
        React.createElement(ProductTable, {
          products: this.props.products, 
          filterText: this.state.filterText, 
          inStockOnly: this.state.inStockOnly}
        )
      )
    );
  }
});

var SearchBar = React.createClass({displayName: "SearchBar",
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.getDOMNode().value,
      this.refs.inStockOnlyInput.getDOMNode().checked
    );
  },
  render: function() {
    return (
      React.createElement("form", null, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Search...", 
          value: this.props.filterText, 
          ref: "filterTextInput", 
          onChange: this.handleChange}
        ), 
        React.createElement("p", null, 
          React.createElement("input", {
            type: "checkbox", 
            checked: this.props.inStockOnly, 
            ref: "inStockOnlyInput", 
            onChange: this.handleChange}
          ), 
          ' ', 
          "Only show products in stock"
        )
      )
    );
  }
});

var ProductTable = React.createClass({displayName: "ProductTable",
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product)  {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return
      }
      if (product.category !== lastCategory) {
        rows.push(React.createElement(ProductCategoryRow, {category: product.category, key: product.category}));
      }
      rows.push(React.createElement(ProductRow, {product: product, key: product.name}));
      lastCategory = product.category;
    }.bind(this));
    return (
      React.createElement("table", null, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Name"), 
            React.createElement("th", null, "Price")
          )
        ), 
        React.createElement("tbody", null, rows)
      )
    );
  }
});

var ProductRow = React.createClass({displayName: "ProductRow",
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      React.createElement("span", {style: {color: 'red'}}, 
        this.props.product.name
      );
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, name), 
        React.createElement("td", null, this.props.product.price)
      )
    );
  }
});

var ProductCategoryRow = React.createClass({displayName: "ProductCategoryRow",
  render: function() {
    return (React.createElement("tr", null, React.createElement("th", {colSpan: "2"}, this.props.category)));
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

React.render(React.createElement(FilterableProductTable, {products: PRODUCTS}), document.body);
