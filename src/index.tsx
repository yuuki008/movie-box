import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import * as History from 'history'
import { MovieContainer, MovieDetail, Actor, MyList } from './containers'
import { createStore } from './redux/store'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { Reset, SignIn, SignUp } from './containers/Auth'
import AuthWrapper from './AuthWrapper'
import { Header } from './components'

const history = History.createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/reset" component={Reset} />
                <AuthWrapper>
                    <Header />
                    <Route exact path="/" component={MovieContainer} />
                    <Route exact path="/upcoming" component={MovieContainer} />
                    <Route exact path="/now_playing" component={MovieContainer} />
                    <Route exact path="/top_rated" component={MovieContainer} />
                    <Route path="/search(/:keyword)?" component={MovieContainer} />
                    <Route path="/movie(/:id)?" component={MovieDetail} />
                    <Route path="/actor(/:id)?" component={Actor} />
                    <Route exact path="/mylist" component={MyList} />
                </AuthWrapper>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
