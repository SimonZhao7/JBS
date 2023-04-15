<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { Loader } from '@googlemaps/js-api-loader'
    import Input from './Input.vue'

    const googleAPI = ref()
    const search = ref('')
    const showResults = ref(false);
    const predictions = ref([])

    onMounted(async () => {
        const loader = new Loader({ apiKey: import.meta.env.VITE_MAPS_API_KEY, version: 'weekly', libraries: ['places'] })
        await loader.load()
    })
    
    watch(search, async () => {
        console.log('changed')
        const { AutocompleteService } = await google.maps.importLibrary("places")
        const service = new AutocompleteService()
        service.getPlacePredictions({ input: search.value }, (results) => {
            predictions.value = results
        })
    })
</script>

<template>
    <div class="relative">
        <Input type="text" :value="search" @change="(val) => search = val" placeHolder="Enter an address..."/>
            <div class="absolute z-10 w-full mt-2 rounded-md overflow-hidden shadow-lg">
                <h1 class="bg-white px-4 py-2 hover:bg-gray-200 w-full"  v-for="prediction in predictions">{{ prediction.description }}</h1>
            </div>
    </div>
   
</template>