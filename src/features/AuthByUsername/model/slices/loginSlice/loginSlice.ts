import { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';
import { LoginSchema } from '../../types/loginSchema';
import { loginByUsername } from '../../services/loginByUsername/loginByUsername';

const initialState: LoginSchema = {
    isLoading: false,
    email: '',
    password: '',
};

export const loginSlice = buildSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: loginActions,
    reducer: loginReducer,
    useActions: useLoginActions,
} = loginSlice;