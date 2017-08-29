import React from 'react';

class AddList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: '',
      item: undefined,
    }
  }

  addItem() {
    var item = this.state.inputValue;
    this.setState({
      item: item,
      inputValue: '',
    })
  }

  handleChange(change){
    this.setState({
      inputValue: change.target.value,
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.handleChange.bind(this)}></input>
        <button onClick={this.addItem.bind(this)} >Add</button>
        <DisplayList item={this.state.item} />
      </div>
    );
  }
   
}

class DisplayList extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      list: [],
    };
  }

  componentWillReceiveProps(nextProp) {
    let list = this.state.list,
      itemName= nextProp.item;

    let item = {
      name: itemName,
      isDeleted: false
    }

    for(let i = 0; i < list.length; i++){
      if(list[i].name == itemName){
        return;
      }
    }
    if(item.name)
      list.push(item);
    this.setState({
      list: list,
    });
  }

  componentWillUpdate(){
    this.html = [];
    let list = this.state.list;
    for(let i = 0; i < list.length; i++){
      let id = 'item-'+(i+1);
      this.html.push(<li key={id} className={list[i].isDeleted? "deleted" : "active"} id={id} onClick={()=>{this.listItemClicked(i)}}>{list[i].name}</li>);
    }
  }

  listItemClicked(index){
    let list = this.state.list;
    list[index].isDeleted = !list[index].isDeleted;
    this.setState({
      list: list
    });
  }

  render(){
    return (
      <div>
        <ul>
          <h3>Todo List.</h3>
          {this.html}
        </ul>
      </div>
    );
  }
}

export default AddList;

