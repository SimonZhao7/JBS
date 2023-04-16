<script setup>
    import { onAuthStateChanged } from '@firebase/auth';
    import { ref, onMounted } from 'vue';
    import { auth, db } from '../../firebase';
    import { getDocs, query, collection, where } from 'firebase/firestore'

    const emit = defineEmits(['close'])
    const routes = ref([])
    const loading = ref(true)

    onMounted(() => {
        loading.value = true
        onAuthStateChanged(auth, async (user) => {
            const trips = await getDocs(query(collection(db, 'trips'), where('userId', '==', user.uid)))
            let routesList = []
            trips.docs.forEach(async (trip) => {
                console.log(trip.id)
                const routesRes = await getDocs(query(collection(db, 'routes'), where('tripId', '==', trip.id), where('status', '==', 'PENDING')))
                console.log(routesRes)
                routesRes.docs.forEach((route) => {
                    routesList.push({ id: route.id, ...route.data() })
                })
            })
            routes.value = routesList
            console.log(routes)
        })
        loading.value = false
    })

</script>

<template>
    <div class = "shadow-md h-2/3 w-2/3 py-3 text-md bg-white rounded-[40px] fixed md:px-10 sm: px-10">
      <button @click="() => emit('close')">Close</button>
    </div>
</template>