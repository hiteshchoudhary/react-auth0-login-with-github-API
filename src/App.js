import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Github from './Github';
import Header from './Components/Header';
import Auth0Lock from 'auth0-lock';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }

  static defaultProps = {
    clientID: '',
    domain: ''
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on('authenticated', (authResult) => {
      // console.log(authResult);

      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }
        // console.log(profile);

        this.setProfile(authResult.idToken, profile);

      });

    });
    this.getProfile();
  }

  setProfile(idToken, profile){
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile(){
    if(localStorage.getItem('idToken') != null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }


  showLock(){
    this.lock.show();
  }


  logout(){
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');

    });
  }



  render() {
    let gitty;

    if(this.state.idToken){
      gitty = <Github />
    } else{
      gitty = "Click on Login to view Github Viewer"
    }

    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          onLogout={this.logout.bind(this)}
          onLogin={this.showLock.bind(this)}
           />
         {gitty}
      </div>
    );
  }
}

export default App;
