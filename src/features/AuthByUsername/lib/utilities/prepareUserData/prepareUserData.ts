import { User as FirebaseUser } from '@firebase/auth';
import { User } from '@/entities/User';
import { getInitialUserData } from '../getInitialUserData/getInitialUserData';
import { SignupCredentials } from '../../../model/services/signupByEmailThunk/signupByEmailThunk';

export const prepareUserData = (
    firebaseUser: FirebaseUser,
    signUpData?: SignupCredentials,
): User => {
    if (signUpData) {
        const { username, lastname, firstname, email } = signUpData;
        return {
            id: firebaseUser.uid,
            username,
            lastname,
            firstname,
            email,
            avatar: '',
            age: '',
            city: '',
            ...getInitialUserData(),
        };
    }
    const { uid, photoURL, email, displayName } = firebaseUser;
    const [firstname = '', lastname = ''] = displayName?.split(' ') || [];
    return {
        id: uid,
        username: email || '',
        lastname,
        firstname,
        email: email || '',
        avatar: photoURL || '',
        age: '',
        city: '',
        ...getInitialUserData(),
    };
};