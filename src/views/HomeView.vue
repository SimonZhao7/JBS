<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
import { async } from '@firebase/util';
import {db, auth} from '../../firebase';
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'
import {collection, query, where, getDocs, orderBy, onSnapshot, QuerySnapshot} from 'firebase/firestore';

const r = ref([]);
const loading = ref(true);
const router = useRouter()

const o = onMounted( async()=> {
  const q = query(collection(db, "trips"), where("leaveDate", ">", new Date()));
  loading.value = true;
  const docSnap = await getDocs(q);
  console.log(docSnap)
  if (docSnap.docs.empty) {
    console.log('No Trips Available!');
  } 
  
  else {
    onSnapshot(q, (querySnapshot)=>{
      r.value = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      console.log(r.value)
      loading.value = false;
    })
  }
});

</script>

<template>
  <main>
    <div v-if="!loading">
      <h2>Available Trips</h2>
      <div class="horizontalLine"></div>

      <div class="loopItems">
        <div v-for="trip in r">
          <div class="trips" @click="() => router.push(`/trips/${trip.id}`)" style="cursor: pointer;"> 
            <div class="tripTitle">
              {{trip.title}}
            </div>
            <br>
            <p>Spaces left: {{trip.capacity}} seats</p>
            <p>Departure Time: {{ new Date(trip.leaveDate.seconds * 1000).toDateString() }}  
              ({{ new Date(trip.leaveDate.seconds * 1000).toLocaleTimeString() }})</p>
            <p>Cost: ${{trip.price}}</p>
          </div>
        </div>
      </div>
    </div>
    <TheWelcome />
  </main>
  <!-- <TheWelcome /> -->
</template>
