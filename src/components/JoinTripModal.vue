<script setup>
    import { ref } from 'vue';
    // Firebase
    import { addDoc, collection } from '@firebase/firestore';
    // Components
    import AutocompleteInput from '../components/AutocompleteInput.vue';
    import { onAuthStateChanged } from '@firebase/auth';
    import { auth, db } from '../../firebase';

    const props = defineProps({
        show: {
            type: Boolean,
            required: true,
        },
        tripId: {
            type: String,
            required: true,
        }
    })

    const emit = defineEmits(['close'])
    const modalRef = ref(null)
    const routeLatLng = ref({})
    const routeId = ref({})

    function joinTrip() {
        onAuthStateChanged(auth, async (user) => {
            await addDoc(collection(db, 'routes'), {
                userId: user.uid,
                tripId: props.tripId,
                location: routeLatLng.value,
                locationId: routeId.value,
                status: 'ACCEPTED', // change to PENDING
            })
            emit('close')
        })
    }
</script>

<template>
    <div v-if="show" class="flex items-center justify-center absolute w-full h-full bg-black bg-opacity-60 z-20">
        <div ref="modalRef" class="max-w-2xl w-full bg-white p-14 rounded-lg">
            <h1 class="text-3xl mb-10">Join Trip</h1>
            <AutocompleteInput 
                labelText="Address"
                @changeAddress="({ lat, lng, placeId }) => {
                    routeLatLng = { lat, lng }
                    routeId = placeId
                }" 
            />
            <div class="mt-4 flex gap-5 ">
                <button class="gra-btn flex-1 py-2 rounded-full hover:scale-105 transition-all" @click="() => emit('close')">Close</button>
                <button class="gra-btn flex-1 py-2 rounded-full hover:scale-105 transition-all" @click="joinTrip">Join</button>
            </div>  
        </div>
    </div>
</template>