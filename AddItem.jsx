import React from 'react';
import { Link } from 'react-router-dom';


class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      list: [],
      recent: '',
    };
  }

  componentWillMount() {
    /*eslint-disable */
    fetch('http://localhost:3000/lists')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          list: data,
        });
      });
    /*eslint-enable */  
  }

  addItem() {
    const list = this.state.list;
    const itemName = this.state.inputValue;
    const item = {
      name: itemName,
      isDeleted: false,
    };

    for (let i = 0; i < list.length; i += 1) {
      if (list[i].name === itemName) {
        return;
      }
    }

    /*eslint-disable */
    if (item.name) {
      list.push(item);

      fetch('http://localhost:3000/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
      });
    }
    /*eslint-enable */

    this.setState({
      inputValue: '',
      list,
      recent: itemName,
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
        <h3>Type in your Todo-Item</h3>
        <div id="user-input-box">
          <input
            value={this.state.inputValue}
            onChange={(event) => { this.handleChange(event); }}
          />
          <button id="add" onClick={() => this.addItem()} >Add</button>
        </div>
        <h5>
          {
          /*eslint-disable */
          	this.state.recent !== '' ? `${this.state.recent} successfuly added to the list.` : (this.state.inputValue === '' ? 'You need to type something to create a Todo-Item' : 'Press the "Add" button to add')
          /*eslint-enable */
          }
        </h5>
        <p><Link className="links" to="/view">View list</Link></p>
      </div>
    );
  }
}

export default AddItem;
