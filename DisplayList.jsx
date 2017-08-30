import React from 'react';
import Display from './Display';

class DisplayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      query: 'all',
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

  componentWillReceiveProps(nextProp) {
    const list = this.state.list;
    const itemName = nextProp.item;
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
      list,
    });
  }

  listItemClicked(index) {
    const list = this.state.list;
    list[index].isDeleted = !list[index].isDeleted;
    this.setState({
      list,
    });
  }

  showSelected(choice) {
    this.setState({
      query: choice,
    });
  }

  render() {
    return (
      <div>
        <div className="button-bar">
          <button id="all" onClick={() => this.showSelected('all')}>All</button>
          <button id="active" onClick={() => this.showSelected('active')}>Active</button>
          <button id="finished" onClick={() => this.showSelected('finished')}>Finished</button>
        </div>
        <div>
          <h3>Todo List.</h3>
          <Display
            list={this.state.list}
            query={this.state.query}
            onClick={(i) => { this.listItemClicked(i); }}
          />
        </div>
      </div>
    );
  }
}

export default DisplayList;

