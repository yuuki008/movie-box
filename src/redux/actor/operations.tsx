import { API_KEY, URL_PERSON } from "../../api"
import {fetchActor, fetchActorSuccess, fetchActorFailure} from './actions';

export const fetchActorDetail = (id: string) => {
    const url_actor = URL_PERSON + id + API_KEY;
    return async (dispatch:any) => {
        dispatch(fetchActor())
        return fetch(url_actor)
            .then(response => response.json())
            .then(data => dispatch(fetchActorSuccess(data)))
            .catch(error => dispatch(fetchActorFailure(error)))
    }
}