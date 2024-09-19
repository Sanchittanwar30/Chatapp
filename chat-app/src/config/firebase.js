
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, setDoc,doc} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyDJmJsLBKimmkAPsjcWhEhqtnR9C9tfheo",
  authDomain: "chat-app-8808f.firebaseapp.com",
  projectId: "chat-app-8808f",
  storageBucket: "chat-app-8808f.appspot.com",
  messagingSenderId: "189264253597",
  appId: "1:189264253597:web:c8ada642543af47ab97a74",
  
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await setDoc(doc(db,"users",user.uid),{
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey , Here I am using Chat App",
      lastSeen:Date.now()

    })
    await setDoc(doc(db,"chats",user.uid),{
      chatData:[]
    })
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
  
}

const login = async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    
  }
}

export {signup,login}

