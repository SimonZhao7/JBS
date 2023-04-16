<template>
    <div class="flex min-height-full items-center justify-center flex-col h-full bg-gradient-to-r from-indigo-500 to-blue-500 space-y-4">
        <div class=" flex bg-white shadow-2xl p-16 rounded-[20px] overflow-none items-center justify-center">
            <img src="../assets/drivingcar.gif" alt="CarImage" class="hidden sm:block rounded-xl pr-14">
            <div class = "space-y-4 items-center justify-center max-w-2xl">
                <h1 class="font-bold text-5xl text-indigo-500"> Create Account </h1>
                <input class = "w-full h-16 border-indigo-200 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-200 focus:border-indigo-500 text-lg font-medium" type = "text" placeholder="First Name" v-model="firstname"/>
                <input class = "w-full h-16 border-indigo-200 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-200 focus:border-indigo-500 text-lg font-medium" type = "text" placeholder="Last Name" v-model="lastname"/>
                <input class = "w-full h-16 border-indigo-200 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-200 focus:border-indigo-500 text-lg font-medium" type = "text" placeholder="Username" v-model="username"/>
                <input class = "w-full h-16 border-indigo-200 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-200 focus:border-indigo-500 text-lg font-medium" type = "text" placeholder="(123)-456-7890" v-model="contact"/>
                <button class = "text-2xl w-full h-10 font-medium text-indigo-500 border-indigo-300 border-2 rounded-md transition-all duration-250 outline-none px-4 hover:bg-gradient-to-r from-indigo-500 to-blue-500 hover:text-white" @click="addUserInfo"> Submit </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { db, auth } from '../../firebase'
import { async } from "@firebase/util";
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
const firstname = ref("");
const lastname = ref("");
const contact = ref("");
const username = ref("");

function addUserInfo () {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userData = {
                firstname: firstname.value,
                lastname: lastname.value,
                Email: user.email,
                Username: username.value,
                Contact: contact.value,
                profilePictureURL: user.photoURL
            };
            const userUID = user.uid;
            
            await setDoc(doc(db, "userInfo", userUID), userData);
        }
    });
    router.push({ path: '/' })
}

// await setDoc(doc(db, "userInfo", user.uid), userData);

</script>