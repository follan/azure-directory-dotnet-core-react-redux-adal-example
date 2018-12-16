import React from 'react';
import {authContext, authenticateToken} from './adal/auth';
import App from './App'

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        if (authenticateToken()) {
            this.setState({
                loggedIn: true
            })
        } else {
            authContext.login();
        }
    }
        
    render() {
        if(this.state.loggedIn){
            return <App />
        }
        else {
            return <h1>Not Authenticated</h1>      
        }
    }
}

export default AppContainer