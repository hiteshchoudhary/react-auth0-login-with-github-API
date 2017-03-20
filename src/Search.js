import React, { Component } from 'react';



class Search extends Component {

  submitForm(event){
    event.preventDefault();
    let value = this.refs.username.value;
    this.props.searchProfile(value);
    this.refs.username.value = '';
  }


  render(){
    return(
      <div className="search-box">
        <form onSubmit={this.submitForm.bind(this)}>
          <label><input type="search" ref="username" placeholder="type username and hit enter hard"/></label>
        </form>
      </div>
    );
  }
}

export default Search;
