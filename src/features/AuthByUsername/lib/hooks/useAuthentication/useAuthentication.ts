import { useState } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { loginByUsername } from '../../../model/services/loginByUsername/loginByUsername';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { logoutUser } from '@/entities/User';
import { signupByEmail } from '../../../model/services/signupByEmail/signupByEmail';

interface AuthCredentials {
    email: string;
    password: string;
}

interface UseAuthenticationProps {
    onSuccess?: () => void;
}

interface UseAuthenticationReturn {
    isFetchingUser: boolean;
    signInCall: (credentials: AuthCredentials) => Promise<void>;
    signUpCall: (credentials: AuthCredentials) => Promise<void>;
    signOutCall: () => Promise<void>;
}

export const useAuthentication = ({
    onSuccess,
}: UseAuthenticationProps): UseAuthenticationReturn => {
    const dispatch = useAppDispatch();
    const forceUpdate = useForceUpdate();
    const [isFetchingUser, setIsFetchingUser] = useState(false);

    const signInCall = async ({ email, password }: AuthCredentials) => {
        setIsFetchingUser(true);

        await dispatch(loginByUsername({ username: email, password }))
            .unwrap()
            .then((data) => {
                onSuccess?.();
                forceUpdate();
                setIsFetchingUser(false);
            });
    };

    const signUpCall = async ({ email, password }: AuthCredentials) => {
        setIsFetchingUser(true);
        await dispatch(signupByEmail({ email, password }))
            .unwrap()
            .then((data) => {
                onSuccess?.();
                forceUpdate();
                setIsFetchingUser(false);
            });
    };

    const signOutCall = async () => {
        setIsFetchingUser(true);

        await dispatch(logoutUser())
            .unwrap()
            .then((data) => {
                // onSuccess?.();
                // forceUpdate?.();
                setIsFetchingUser(false);
            });
    };

    return { isFetchingUser, signUpCall, signInCall, signOutCall };
};