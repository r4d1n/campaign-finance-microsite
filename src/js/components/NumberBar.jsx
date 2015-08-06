'use strict';

let NumberBar = React.createClass({
  onChange (e) {
    console.log(e.target.value);
  },
  render() {
    console.log(this.props);
    let { candidates, data } = this.props;
    return (
      <section>
        <div className='big-num-bar'>
          <h3>
            <select onChange={this.onChange}>
            {candidates.map(name => <option key={candidates._id} value={candidates}>{candidates.name}</option>)}
            </select>
            Has Raised:
          </h3>
          <hr/>
          <h1>${this.props.raisedString}</h1>
          <hr/>
        </div>
      </section>
    );
  }
});

module.exports = NumberBar;
