<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
import { async } from '@firebase/util';
import {db, auth} from '../../firebase'
import {ref, onMounted} from 'vue'
import {getDoc, doc} from 'firebase/firestore'
const r = ref({});
const loading = ref(true);
const o = onMounted(async()=>{
  const docRef = doc(db, "trips", "iHyJigGVBB34u1wrslg9");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', docSnap.data());
    r.value=docSnap.data();
}
loading.value = false;
});
</script>

<template>
  <main>
    <div v-if="!loading" class="TopGreeting">
      <h1>JBS Rideshare<sup>©</sup></h1>
    </div>
    <h2>View Available Trips</h2>
    <div class="horizontalLine"></div>

    <div class="trips">
      <div class="tripTitle">
        {{r.title}}
      </div> <br>
      <p>Spaces left: {{r.capacity}}</p>
      <!-- <p>Departure Time: {{new Date(r.leaveDate.seconds).toLocaleString()}}</p> -->
    </div>
  </main>
  <!-- <TheWelcome /> -->
</template>
