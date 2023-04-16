<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { Loader } from '@googlemaps/js-api-loader';
    // Components
    import JoinTripModal from '../components/JoinTripModal.vue';
    // Firebase 
    import { collection, doc, query, where, onSnapshot } from '@firebase/firestore';
    import { db } from '../../firebase';

    const trip = ref({})
    const loading = ref(true)
    const showModal = ref(false)
    const route = useRoute()
    const { id } = route.params

    onMounted(async () => {
        loading.value = true

        onSnapshot(doc(db, 'trips', id), (res) => {
            trip.value = { id, ...res.data() }

            onSnapshot(query(collection(db, 'routes'), where('tripId', '==', trip.value.id)), (res) => {
                loadMap(res.docs)
            })
            loading.value = false
        })
    })

    async function loadMap(docs) {
        const loader = new Loader({ apiKey: import.meta.env.VITE_MAPS_API_KEY, version: 'weekly', libraries: ['places'] })
        await loader.load()
        const { Map } = await google.maps.importLibrary("maps")
        const { DirectionsService, DirectionsRenderer, TravelMode } = await google.maps.importLibrary("routes")

        const directionService = new DirectionsService()
        // Need to add waypoints
        const map = new Map(document.getElementById('map'), {
            mapTypeControl: false,
            fullscreenControl: false,
        })
        const points =  docs.map((doc) => {
            const { location } = doc.data()
            return { location, stopover: true }
        });
        const directionResult = await directionService.route({ 
            origin: trip.value.meetup, 
            waypoints: points,
            destination: trip.value.destination,
            travelMode: TravelMode.DRIVING,
            optimizeWaypoints: true,
        })
    
        const renderer = new DirectionsRenderer({ directions: directionResult })
        renderer.setMap(map)
    }
</script>
<template>
    <JoinTripModal :show="showModal" :tripId="id" @close="() => showModal = false" />
    <main class="mx-auto w-full flex min-h-full p-14 bg-gradient-to-r from-indigo-500 to-blue-500 -btn pt-32">
        <div v-if="!loading" class="flex-1 flex bg-white hadow-2xl p-8 rounded-[20px] overflow-none"> 
            <div class="flex-1 flex p-14 pr-0 h-full flex-col justify-between">
                <div>
                    <h1 class="text-6xl">{{ trip.title }}</h1>
                    <br />
                    <br />
                    <h3 class="text-xl">Departure: {{ new Date(trip.leaveDate.seconds * 1000).toLocaleString() }}</h3>
                </div>
               <div class="flex items-center">
                    <div class="flex-1">
                        <h3 class="text-xl">Capacity: {{ trip.capacity }}</h3>
                        <br />
                        <h3 class="text-xl">Price: ${{ trip.price }}</h3>
                    </div>
                    <div class="flex-1 pr-8">
                        <button class="w-full gra-btn h-16 rounded-full text-xl hover:scale-105 transition-all" @click="() => showModal = true">
                            Join Trip
                        </button>
                    </div>
               </div>
            </div>
            <div class="flex-1 rounded-[15px]" id="map">
            </div>
        </div>
        <div v-else class="self-center justify-self-center flex-1 flex items-center justify-center h-full">
            <div class="border-white border-t-black border-8  w-20 h-20 animate-spin rounded-full">
                &nbsp;
            </div>
        </div>
    </main>
</template>
