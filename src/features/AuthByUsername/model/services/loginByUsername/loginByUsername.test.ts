import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';
import { testUserData } from '@/entities/User/testing';
import { userActions } from '@/entities/User';

describe('async thunk loginByUsername test', () => {
    const userAuthenticationData = {
        username: 'testUsername',
        password: '123',
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('success login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: testUserData }));
        const result = await thunk.callThunk(userAuthenticationData);

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(testUserData),
        );
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.api.post).toHaveBeenCalledWith(
            '/login',
            userAuthenticationData,
        );
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(testUserData);
    });

    test('error login with empty username', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({ username: '', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('error login with missing password', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({
            username: 'testUsername',
            password: '',
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('error login with wrong credentials', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(userAuthenticationData);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled();
        expect(thunk.api.post).toHaveBeenCalledWith(
            '/login',
            userAuthenticationData,
        );
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('error login with missing data in response', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: null }));
        const result = await thunk.callThunk(userAuthenticationData);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalledWith(
            '/login',
            userAuthenticationData,
        );
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('network error during login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(
            Promise.reject(new Error('Network Error')),
        );
        const result = await thunk.callThunk(userAuthenticationData);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalledWith(
            '/login',
            userAuthenticationData,
        );
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('error login with unexpected server response', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(
            Promise.resolve({ data: { unexpectedField: 'value' } }),
        );
        const result = await thunk.callThunk(userAuthenticationData);

        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('server error during login (500)', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 500 }));
        const result = await thunk.callThunk(userAuthenticationData);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalledWith(
            '/login',
            userAuthenticationData,
        );
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe(
            'Login failed. Please check your username and password and try again.',
        );
    });

    test('multiple simultaneous login requests', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: testUserData }));

        const results = await Promise.all([
            thunk.callThunk(userAuthenticationData),
            thunk.callThunk(userAuthenticationData),
            thunk.callThunk(userAuthenticationData),
        ]);

        results.forEach((result) => {
            expect(result.meta.requestStatus).toBe('fulfilled');
            expect(result.payload).toEqual(testUserData);
        });

        expect(thunk.api.post).toHaveBeenCalledTimes(3);
    });
});

// let dispatch: Dispatch;
// let getState: () => StateSchema;
// beforeEach(() => {
//  dispatch = jest.fn();
//  getState = jest.fn();
// });
// test('success login', async () => {
//     const testUserData = { username: 'afff', id: '12' };
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: testUserData }));
//     const action = loginByUsername({ username: 'afff', password: '123' });
//     const result = await action(dispatch, getState, undefined);
//     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(testUserData));
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(mockedAxios.post).toHaveBeenCalledTimes(3);
//     expect(result.meta.requestStatus).toBe('fulfilled');
//     expect(result.payload).toEqual(testUserData);
// });
//
// test('error login', async () => {
//     const testUserData = { username: 'afff', id: '12' };
//     mockedAxios.post.mockReturnValue(Promise.resolve({ data: testUserData }));
//     const action = loginByUsername({ username: 'afff', password: '123' });
//     const result = await action(dispatch, getState, undefined);
//     expect(mockedAxios.post).toHaveBeenCalled();
//     expect(mockedAxios.post).toHaveBeenCalledTimes(2);
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toBe('error');
// });
