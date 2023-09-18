import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrC4yBWV3bfcn1r9C5MSwWijcP0djoHR8",
  authDomain: "chat-app-ed894.firebaseapp.com",
  projectId: "chat-app-ed894",
  storageBucket: "chat-app-ed894.appspot.com",
  messagingSenderId: "782610013344",
  appId: "1:782610013344:web:2c5dde6ea75e935afdbdc5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const SignUpAccount = async (email, password, username, file) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const storageRef = ref(storage, `profile_picture/${username}`);
    await uploadBytesResumable(storageRef, file);

    const downloadUrl = await getDownloadURL(storageRef);

    await setDoc(doc(db, "Users", user.uid), {
      Username: username,
      Email: email,
      ProfileImage: downloadUrl,
    });
    await updateProfile(user, {
      displayName: username,
      photoURL: downloadUrl,
    });
    await setDoc(doc(db, "UserChat", user.uid), {});
  } catch (error) {
    console.error("Error creating user:", error);
    return error.message;
  }
};

const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error Log In user:", error);
    return error.message;
  }
};

const searchUsers = async (username) => {
  let user = null;
  try {
    const q = query(collection(db, "Users"), where("Username", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user = doc;
    });

    return user;
  } catch (error) {
    return error;
  }
};

const searchChat = async (combinedID, currentUser, user) => {
  try {
    const result = await getDoc(doc(db, "Chat", combinedID));

    if (!result.exists()) {
      await setDoc(doc(db, "Chat", combinedID), { message: [] });

      await updateDoc(doc(db, "UserChat", currentUser.uid), {
        [combinedID + ".userInfo"]: {
          uid: user.id,
          displayName: user.data().Username,
          photoURL: user.data().ProfileImage,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "UserChat", user.id), {
        [combinedID + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedID + ".date"]: serverTimestamp(),
      });
    }
  } catch (error) {
    return error;
  }
};

export {
  app,
  auth,
  SignUpAccount,
  logIn,
  searchUsers,
  searchChat,
  db,
  storage,
};
