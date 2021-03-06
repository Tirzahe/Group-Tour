import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "./redux/travelersRedux";
import Home from "./Home";
import Login from "./Login";
import SignUp from './SignUp';
import GroupInfo from './GroupInfo';
import ProtectedRoute from "./ProtectedRoute";
import TripDetails from "./TripDetails";
import GroupWall from './GroupWall';
import EditTripForm from './EditTripForm';


class App extends Component {
    componentDidMount() {
        this.props.verify();
    }
    render(props) {
        const { isAuthenticated, loading } = this.props;
        return (
            <div>
                {loading ?
                    <div>...Loading user data</div>
                    :
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' render={props => isAuthenticated ?
                            <Redirect to="/groupinfo" /> :
                            <Login {...props} />
                        } />
                        <Route path='/signup' render={props => isAuthenticated ?
                            <Redirect to="/groupinfo" /> :
                            <SignUp {...props} />
                        } />
                        <ProtectedRoute path='/groupinfo' component={GroupInfo} />
                        <ProtectedRoute path='/tripdetails' component={TripDetails} />
                        <ProtectedRoute path='/groupwall/:id' component={GroupWall}/>
                        <ProtectedRoute path='/edit-trip/:id' component={EditTripForm}/>
                    </Switch>
                }
            </div>
        )
    }
}
export default withRouter(connect(state => state.travelers, { verify })(App));