<template>
  <h1> Create an Account </h1>
  <p><input type = "text" placeholder="First Name" v-model="firstname"/></p>
  <p><input type = "text" placeholder="Last Name" v-model="lastname"/></p>
  <p><input type = "text" placeholder="Username" v-model="username"/></p>
  <p><input type = "text" placeholder="Contact" v-model="contact"/></p>
  <button @click="addUserInfo"> Submit </button>
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
const user = auth.currentUser;

function addUserInfo () {
    const userData = {
    firstname: firstname.value,
    lastname: lastname.value,
    Username: username.value,
    Contact: contact.value
};
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userUID = user.uid;
            await setDoc(doc(db, "userInfo", userUID), userData);
        }
    });
    router.push({ path: '/signedin' })
}

// await setDoc(doc(db, "userInfo", user.uid), userData);

</script>