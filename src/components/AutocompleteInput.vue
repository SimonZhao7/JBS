<script setup>
    import { onMounted, ref, watch } from 'vue';
    import { Loader } from '@googlemaps/js-api-loader'
    import Input from './Input.vue'

    const emit = defineEmits(['changeAddress'])

    const search = ref('')
    const searchDiv = ref(null)
    const showResults = ref(false);
    const predictions = ref([])

    defineProps({
        labelText: {
            type: String,
            default: '',
        }
    })

    onMounted(async () => {
        const loader = new Loader({ apiKey: import.meta.env.VITE_MAPS_API_KEY, version: 'weekly', libraries: ['places'] })
        await loader.load()

        window.addEventListener('click', (e) => {
            if (!searchDiv.value?.contains(e.target)) {
                showResults.value = false
            }   
        })
    })

    async function handlePredictionClick(placeId) {
        const { PlacesService } = await google.maps.importLibrary("places")
        const service = new PlacesService(document.createElement('div'))
        service.getDetails({ placeId }, (result) => {
            search.value = result.formatted_address
            showResults.value = false
            predictions.value = []
            emit('changeAddress', { lat: result.geometry.location.lat(), lng: result.geometry.location.lng(), placeId })
        })
    }
    
    watch(search, async () => {
        const { AutocompleteService } = await google.maps.importLibrary("places")
        const service = new AutocompleteService()
        service.getPlacePredictions({ input: search.value }, (results) => {
            predictions.value = results
        })
    })

    watch(showResults, () => {
        if (showResults.value) {
            search.value = ''
        }
    })
</script>

<template>
    <div class="relative" ref="searchDiv">
        <label v-if="labelText.length > 0">{{ labelText }}</label>
        <Input 
            type="text" 
            :value="search" 
            @change="(val) => search = val" 
            @focus="(_) => { 
                showResults = true
                predictions = []
            }" 
            placeHolder="Enter an address..."
        />
        <div class="absolute z-10 w-full mt-2 rounded-md overflow-hidden shadow-lg" v-if="showResults">
            <h1 class="bg-white px-4 py-2 hover:bg-gray-200 w-full"  v-for="prediction in predictions" @click="() => handlePredictionClick(prediction.place_id)">{{ prediction.description }}</h1>
        </div>
    </div>
   
</template>