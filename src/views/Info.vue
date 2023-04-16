<template>
    <div class="flex items-center justify-center flex-col h-full bg-gradient-to-r from-indigo-500 to-blue-500 space-y-4">
        <h1 class="p-5 font-bold text-5xl text-white hover: text-blue"> Create an Account </h1>
        <div class = "space-y-4 max-w-2xl">
            <input class = "w-full h-10 border-gray-300 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-100 focus:border-gray-600 font-medium" type = "text" placeholder="First Name" v-model="firstname"/>
            <input class = "w-full h-10 border-gray-300 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-100 focus:border-gray-600 font-medium" type = "text" placeholder="Last Name" v-model="lastname"/>
            <input class = "w-full h-10 border-gray-300 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-100 focus:border-gray-600 font-medium" type = "text" placeholder="Username" v-model="username"/>
            <input class = "w-full h-10 border-gray-300 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-yellow-100 focus:border-gray-600 font-medium" type = "text" placeholder="Contact" v-model="contact"/>
            <button class = "text-2xl w-full h-10 font-medium text-white border-white-300 border-2 rounded-md transition-all duration-250 outline-none px-4 hover:border-yellow-200 focus:border-white-300" @click="addUserInfo"> Submit </button>
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