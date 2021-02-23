import store from '../app/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchActions } from '../features/search/searchSlice';

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useOutsideClickHandler = (ref) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(searchActions.closeSearch());
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [ref]);
}