<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// isSignedIn to make sure "LogIn" button goes away if currently logged in
const isSignedIn = ref(false)

function googleSignin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
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
        <RouterLink to="/signin"> Login </RouterLink>
        <button @click="googleSignin"> Login/Sign-up </button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>