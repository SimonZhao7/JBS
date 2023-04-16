<script setup>
    import { useRoute } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import { collection, doc, query, where, getDoc, getDocs, setDoc, updateDoc } from '@firebase/firestore';
    import { Loader } from '@googlemaps/js-api-loader';
    import { db } from '../../firebase';


    const route = useRoute()   
    const { id } = route.params
    const userRoute = ref({})
    const trip = ref({})
    const user = ref({})
    const loading = ref(true)

    onMounted(async () => {
        const routeRes = await getDoc(doc(db, 'routes', id));
        userRoute.value = { id, ...routeRes.data() }

        const tripRes = await getDoc(doc(db, 'trips', userRoute.value.tripId))
        trip.value = tripRes.data()      
        
        const userRes = await getDoc(doc(db, 'userInfo', userRoute.value.userId))
        user.value = userRes.data()
        loading.value = false

        const routesRes = await getDocs(query(collection(db, 'routes'), where('tripId', '==', tripRes.id), where('status', '==', 'ACCEPTED')))
        loadMap([...routesRes.docs, routeRes ])  
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

    async function updateStatus(value) {
        await updateDoc(doc(db, 'routes', id), {
            status: value,
        })
        
    }
</script>

<template>
    <main class="flex w-full h-full items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500 p-10 pt-32">
        <div v-if="!loading" class="bg-white p-16 rounded-xl flex-1 h-full flex gap-10">
            <div class="flex-1">
                <div class="flex space-x-8 items-center">
                    <img :src="user.profilePictureURL" class="rounded-full"/>
                    <h1 class="text-6xl">{{ user.Username }}</h1>
                </div>
                <div class = "py-40 text-3xl text-blue-500">
                    {{user.Username}} requested a drop off
                </div>
                <div class="flex gap-10">
                    <button class="gra-btn px-4 py-2 rounded-full flex-1" @click="() => updateStatus('ACCEPTED')">
                        Accept
                    </button>
                    <button class="gra-btn px-4 py-2 rounded-full flex-1" @click="() => updateStatus('REJECTED')">
                        Decline
                    </button>
                </div>
            </div>
            <div id="map" class="flex-1 rounded-[14px] ring-2 ring-blue-400">
            </div>
        </div>
        <div v-else>
            <div class="border-white border-t-black border-8  w-20 h-20 animate-spin rounded-full">
                &nbsp;
            </div>
        </div>
    </main>
  
</template>