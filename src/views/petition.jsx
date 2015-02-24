/** @jsx React.DOM */

var React = require('react');

var PetitionView = React.createClass({

  render: function() {

    return  <div className="petition">
              <h1>{ this.props.title }</h1>
              <div>{ this.props.context }</div>
            </div>
  }

});

module.exports = PetitionView;