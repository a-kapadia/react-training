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
        <div id="user-input-box">
          <input
            value={this.state.inputValue}
            onChange={(event) => { this.handleChange(event); }}
          />
          <button id="add" onClick={() => this.addItem()} >Add</button>
        </div>
        <DisplayList item={this.state.item} />
      </div>
    );
  }
}

export default AddList;

