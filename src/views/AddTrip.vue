<script setup>
    import { ref } from 'vue';
    // Components
    import Input from '../components/Input.vue'
    import AutocompleteInput from '../components/AutocompleteInput.vue';
    // Firebase
    import { addDoc, collection, Timestamp } from '@firebase/firestore';
    import { onAuthStateChanged } from '@firebase/auth';
    import { auth, db } from '../../firebase';

    const title = ref('')
    const dateString = ref('')
    const timeString = ref('')
    const meetPlaceId = ref('')
    const meetLatLng = ref({})
    const destPlaceId = ref('')
    const destLatLng = ref({})
    const price = ref(0)
    const capacity = ref(1)

    async function handleSubmit() {
        onAuthStateChanged(auth, async (user) => {
            const date = new Date(`${dateString.value}T${timeString.value}:00`)
            
            const data = {
                userId: user.uid,
                riders: [],
                title: title.value,
                leaveDate: Timestamp.fromDate(date),
                meetup: meetLatLng.value,
                meetupId: meetPlaceId.value,
                destination: destLatLng.value,
                destinationId: destPlaceId.value,
                capacity: parseInt(capacity.value),
                price: parseInt(price.value),
            }

            await addDoc(collection(db, 'trips'), data)
        })
    }

</script>

<template>
    <main class="max-w-2xl mx-auto">
        <h1 class="text-center text-4xl">Add Trip</h1>
        <form class="space-y-4">
            <Input :value="title" labelText="Title" @change="(val) => title = val" placeHolder="Enter a title..." />
            <Input :value="dateString" :type="'date'" @change="(val) => dateString = val" labelText="Trip Date" />
            <Input :value="timeString" type="time" @change="(val) => timeString = val" labelText="Trip Time" />
            <AutocompleteInput 
                labelText="Meetup Address" 
                @changeAddress="({ placeId, lat, lng }) => {
                    meetPlaceId = placeId
                    meetLatLng = { lat, lng }
                }"
            />
            <AutocompleteInput
                labelText="Destination"
                @changeAddress="({ placeId, lat, lng }) => {
                    destPlaceId = placeId
                    destLatLng = { lat, lng }
                }"
            />
            <Input :value="price" labelText="Price" @change="(val) => price = val" type="number" />
            <Input :value="capacity" labelText="Passenger Capacity" @change="(val) => capacity = val" type="number" />
            <div class="flex justify-center">
                <button @click.prevent="handleSubmit" class="w-1/2 px-4 py-2 border-2 border-gray-300 rounded-md hover:border-gray-600 hover:scale-105 transition-all">Post Trip</button>
            </div>
        </form>
    </main>
</template>