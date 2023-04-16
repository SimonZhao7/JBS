<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore"; 
import { db } from '../firebase'


// isSignedIn to make sure "LogIn" button goes away if currently logged in
const router = useRouter()
const auth = getAuth();

function googleSignin() {
  const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then(async (result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const docRef = doc(db, 'userInfo', user.uid);
    const docCurr = await getDoc(docRef);
    if (docCurr.exists()) {
      router.push({ path: '/' })
    }
    else{
      router.push({ path: '/info' })
    }
  }).catch((error) => {
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
  });
}

function redirectAddTrips() {
  onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, 'userInfo', user.uid)
          const docCurr = await getDoc(docRef);
          if (docCurr.exists()){
            router.push({ path: '/trips/add' })
          }
          else{
            googleSignin()
          }
        }
        else{
          googleSignin()
        }
    });
}

</script>

<template>
  <header>
    <nav class="shadow-md h-20 w-full py-3 text-md bg-white rounded-b-[20px] fixed md:px-10 sm: px-10">
      <div class="flex items-center justify-between max-w-7xl mx-auto w-full h-full text-lg space-x-8">
        <div class="flex space-x-8">
          <div class="hover:text-gray-500 cursor-pointer ">
            <RouterLink to="/"> Home </RouterLink>
          </div>
            <div @click="googleSignin" class="hover:text-gray-500 cursor-pointer">Login</div>
        </div>
        <button class="shw-btn border-0 rounded-full w-12 h-12 bg-white text-3xl flex items-center justify-center hover:scale-110 transition-all duration-150 text-gray-600" @click="redirectAddTrips" >+</button>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<style>
  .shw-btn {
      box-shadow: -3px -3px 10px 0 white , 2px 2px 10px 0 rgba(0, 0, 0, 0.2);
  }
</style>