<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, getDoc , doc} from "firebase/firestore";
import { db, auth } from '../firebase'

const isSignedIn = ref(false)
const router = useRouter()

function googleSignin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then(async (result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    const docRef = doc(db, 'userInfo', user.uid)
    const docCurr = await getDoc(docRef)

    if (docCurr.exists()) {
      console.log('1')
      router.push({ path: '/' })
    }
    else{
      console.log('2')
      router.push({ path: '/info' })
    }

    // router.push({ path: '/info' })
  }).catch((error) => {
    console.log(error)
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
}

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"> Home </RouterLink>
        <button @click="googleSignin"> Login/Sign-up </button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>