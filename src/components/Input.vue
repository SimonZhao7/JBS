<script setup>
    const emit = defineEmits(['change', 'focus'])
    const props = defineProps({
        value: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        placeHolder: {
            type: String,
            default: '',
        },
        labelText: {
            type: String,
            default: '',
        },
    })
</script>

<template>
    <div>
        <label v-if="labelText.length > 0" class="mb-2">
            {{ labelText }}
        </label>
        <input class="w-full h-10 border-gray-300 border-2 rounded-md transition-all duration-150 outline-none px-4 hover:border-gray-600 focus:border-gray-600" :type="type" :value="value" @input="(e) => emit('change', e.target.value)" @focus="(e) => emit('focus', e)" :placeholder="placeHolder"/>
    </div>
</template>