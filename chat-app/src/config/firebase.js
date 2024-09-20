
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {getFirestore, setDoc,doc, collection, query, where, getDocs} from "firebase/firestore";
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
      chatsData:[]
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

const logout=async()=>{
try {
  await signOut(auth)
} catch (error) {
  console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const resetPass = async (email)=>{
  if(!email){
    toast.error("Enter your email");
    return null;
  }
  try {
    const userRef = collection(db,'users');
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q);
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email);
      toast.success("Reset Email Sent")
    }
    else{
      toast.error("Email doesn't exist")
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message)
    
  }

}

export {signup,login,logout,auth,db,resetPass}

