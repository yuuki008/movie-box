export const FETCH_ACTOR = 'FETCH_ACTOR'
export const fetchActor = () => {
  return {
    type: FETCH_ACTOR,
  }
}

export const FETCH_ACTOR_SUCCESS = 'FETCH_ACTOR_SUCCESS'
export const fetchActorSuccess = (data: Actor) => {
  return {
    type: FETCH_ACTOR_SUCCESS,
    data,
  }
}
export const FETCH_ACTOR_FAILURE = 'FETCH_ACTOR_FAILURE'
export const fetchActorFailure = (error: any) => {
  return {
    type: FETCH_ACTOR_FAILURE,
    error,
  }
}
