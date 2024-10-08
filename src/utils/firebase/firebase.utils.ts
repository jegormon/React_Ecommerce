import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	NextOrObserver,
	User,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from 'firebase/firestore';

import { Category } from '../../store/categories/categories.types';

const firebaseConfig = {
	apiKey: 'AIzaSyBDJL9YrNn44dkVnfnhyGtaf5UvubtdDUU',
	authDomain: 'react-ecommerce-db-7fc82.firebaseapp.com',
	projectId: 'react-ecommerce-db-7fc82',
	storageBucket: 'react-ecommerce-db-7fc82.appspot.com',
	messagingSenderId: '1006531188608',
	appId: '1:1006531188608:web:98865e8e60a66322af5365',
	measurementId: 'G-GRDG504990',
};

// Initializing firebase and analytic apps
const firebaseApp = initializeApp(firebaseConfig);

// Initializing provider for google authenticator
// For other providers add new
const googleProvider = new GoogleAuthProvider();

// Configuration for google-auth-provider behaviour
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

// Initializing auth instance that communicates with Firebase
export const auth = getAuth();

// Method for popup login method. Is used
// directly in the relevant component.
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

// Method for popup login method, recieves dedicated provider
// and set auth instance. When using redirect use useEffect
// on mount with getRedirectResult.
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

// Initiating firestore instance
export const db = getFirestore();

export type ObjectToAdd = {
	title: string;
};

// Writing shop data to Database
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

// Retriving data from firebase
export const getCategoriesAndDocument = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

// Method that will create a user data from recieved
// Google Auth data
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInfo = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	// check is parameter is passed
	if (!userAuth) return;

	// Here we retrieve the documents from inside the DB
	const userDocRef = doc(db, 'users', userAuth.uid);

	// Fetch the data related to the document
	const userSnapshot = await getDoc(userDocRef);

	// Checks if the user already in DB, if not
	// creates new user in the DB
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			// Writing user data into doc
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log('Error occurred', error);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

// Inface layer function that creates a user
export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

// Interface for login
export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

// Interface layer function that logs out the user
export const signOutUser = async () => await signOut(auth);

// Observer listener for tracking authentication
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
	onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
