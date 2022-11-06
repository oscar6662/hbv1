import { configureStore, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import { authSlice } from './auth.slice';
import { ThunkAction } from 'redux-thunk'


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

