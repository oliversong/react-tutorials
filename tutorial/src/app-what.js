var FilterableProductTable = React.createClass({
  render: function() {
    return (
      /*jshint ignore:start */
      <div>
        <SearchBar />
        <ProductTable products={this.props.products} />
      </div>
      /*jshint ignore:end */
    );
  }
});

var SearchBar = React.createClass({
  render: function() {
    return (
      /*jshint ignore:start */
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
      /*jshint ignore:end */
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(
          /*jshint ignore:start */
          <ProductCategoryRow category={product.category} key={product.category} />
          /*jshint ignore:end */
        );
      }
      rows.push(
        /*jshint ignore:start */
        <ProductRow product={product} key={product.name} />
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
  <FilterableProductTable products={PRODUCTS} />,
  document.body
  /*jshint ignore:end */
);
