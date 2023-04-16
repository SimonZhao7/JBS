<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { Loader } from '@googlemaps/js-api-loader';
    // Firebase 
    import { collection, getDoc, doc } from '@firebase/firestore';
    import { db } from '../../firebase';
    
    const trip = ref({})
    const loading = ref(true)
    const route = useRoute()

    onMounted(async () => {
        loading.value = true
        const { id } = route.params

        const res = await getDoc(doc(collection(db, 'trips'), id))
        trip.value = { id, ...res.data() }
        loading.value = false
        loadMap()
    })

    async function loadMap() {
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
        const directionResult = await directionService.route({ 
            origin: trip.value.meetup, 
            destination: trip.value.destination,
            travelMode: TravelMode.DRIVING,
            optimizeWaypoints: true,
        })
    
        const renderer = new DirectionsRenderer({ directions: directionResult })
        renderer.setMap(map)
    }
</script>
<template>
    <main class="mx-auto w-full flex min-h-full p-14 bg-gradient-to-r from-indigo-500 to-blue-500 pt-32">
        <div v-if="!loading" class="flex-1 flex bg-white hadow-2xl p-8 rounded-[20px] overflow-none"> 
            <div class="flex-1 p-14 pr-0">
                <h1 class="text-4xl">{{ trip.title }}</h1>
                <br />
                <br />
                <h3 class="text-xl">Departure: {{ new Date(trip.leaveDate.seconds * 1000).toLocaleString() }}</h3>
                <br />
                <h3 class="text-xl">Capacity: {{ trip.capacity }}</h3>
                <br />
                <h3 class="text-xl">Capacity: ${{ trip.price }}</h3>
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
