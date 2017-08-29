import React from 'react';
import DisplayList from './DisplayList';

class AddList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      item: '',
    };
  }

  addItem() {
    this.setState({
      item: this.state.inputValue,
      inputValue: '',
    });
  }

  handleChange(change) {
    this.setState({
      inputValue: change.target.value,
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={(event) => { this.handleChange(event); }} />
        <button onClick={() => this.addItem()} >Add</button>
        <DisplayList item={this.state.item} />
      </div>
    );
  }
}

export default AddList;

