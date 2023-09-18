"use client";
import { createContext, useReducer, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentUser, setCurrentuser] = useState(null);
  const INITIAL_STATE = {
    chatID: "null",
    user: {},
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentuser(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const docSnap = await getDoc(doc(db, "UserChat", currentUser.uid));

          if (docSnap.exists()) {
            const data = docSnap.data();
            const a = Object.entries(data)?.sort(
              (a, b) => b[1].date - a[1].date
            );

            dispatch({ type: "CHANGE_USER", payload: a[0][1].userInfo });
          } else {
            console.log("Document does not exist.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser]);

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatID:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, currentUser }}>
      {children}
    </ChatContext.Provider>
  );
};
