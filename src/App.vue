<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const router = useRouter()

function googleSignin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then(async (_) => {
    router.push({ path: '/info' })
  }).catch((_) => {});
}

</script>

<template>
  <header>
    <nav class="shadow-md h-20 w-full py-3 text-md bg-white rounded-b-[20px] fixed">
      <div class="flex items-center justify-between max-w-7xl mx-auto w-full h-full text-lg space-x-8">
        <div class="flex space-x-8">
          <div class="hover:text-gray-500">
            <RouterLink to="/"> Home </RouterLink>
          </div>
          <div @click="googleSignin" class="hover:text-gray-500">
            Login
          </div>
        </div>
        
        <button class="shw-btn border-0 rounded-full w-12 h-12 bg-white text-3xl flex items-center justify-center hover:scale-110 transition-all duration-150 text-gray-600">+</button>
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