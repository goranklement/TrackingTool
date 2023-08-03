import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig"; // Assuming you have already imported your Firebase configuration.

// Custom hook to handle data from Firestore and local storage
const useFirestoreData = (key, initialValue) => {
  // Get the stored data from local storage or use the initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error loading data from local storage:", error);
      return initialValue;
    }
  });

  // Function to fetch data from Firestore and set the state
  const fetchDataFromFirestore = async () => {
    try {
      const docRef = doc(db, "tasks", key); // Assuming "tasks" is your Firestore collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const firestoreData = docSnap.data();
        setStoredValue(firestoreData.tasks);
      } else {
        // If the document doesn't exist in Firestore, set the initial value
        setStoredValue(initialValue);
      }
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
    }
  };

  useEffect(() => {
    // Fetch data from Firestore and set the state
    fetchDataFromFirestore();
  }, [key]);

  // Save the data to local storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useFirestoreData;
