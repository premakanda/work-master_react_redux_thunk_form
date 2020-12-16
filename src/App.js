import React from 'react';
import {HashRouter, Route, withRouter} from "react-router-dom";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import './App.css';
import store from "./redux/redux-store";
import LoginPage from "./components/Login/LoginPage";
import TasksContainer from "./components/Content/TasksContainer";

class App extends React.Component {
    render() {
        return (
            <div className='content'>
                <div className='app-wrapper'>
                    <Route path='/' render={() => <TasksContainer />}/>
                    <Route path='/login' render={() => <LoginPage />}/>
                </div>
            </div>
        );
    }
}

let AppContainer = compose(connect(null, null), withRouter)(App);

const MainApp = props => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>

    )
}

export default MainApp;


