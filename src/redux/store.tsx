import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { movieList } from './movielist/reducers'
import { movieDetail } from './movie/reducer'
import { castlist } from './castlist/reducers'
import { trailerlist } from './trailerlist/reducers'
import { actorDetail } from './actor/reducers'
import { userReducer } from './user/reducers'
import { folder } from './folder/reducers'

export const initialState = {
  user: {
    isSignedIn: false,
    username: '',
    genres: [],
    favorite: [],
    folder: [],
    notifications: [],
    uid: '',
  },
  list: {
    isFetching: false,
    items: [],
    page: 0,
    total_pages: 0,
    error: {},
  },
  item: {
    isFetching: false,
    item: {},
    error: {},
  },
  folder: {
    list: [],
  },
}

export const createStore = (history: any) => {
  const logger = createLogger({
    collapsed: true,
    diff: true,
  })
  return reduxCreateStore(
    combineReducers({
      user: userReducer,
      router: connectRouter(history),
      movielist: movieList,
      castlist: castlist,
      trailerlist: trailerlist,
      moviedetail: movieDetail,
      actordetail: actorDetail,
      folder: folder,
    }),
    applyMiddleware(logger, routerMiddleware(history), thunk),
  )
}
