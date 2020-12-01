import { useSelector as useReactReduxSelector } from 'react-redux'

export function useSelector<TSelected = unknown>(
  selector: (state: StoreState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) {
  return useReactReduxSelector<StoreState, TSelected>(selector, equalityFn)
}
