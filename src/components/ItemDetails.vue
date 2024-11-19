<template>
    <div class="mt-4 border-t border-gray-200 pt-4 pb-4 px-3">
      <h4 class="font-semibold text-lg mb-3">Your Wardrobe</h4>
      <div class="flex space-x-3 overflow-x-auto ">
        <div
          v-for="wardrobeItem in item.wardrobeItems"
          :key="wardrobeItem.id"
          class="flex-shrink-0 w-32"
        >
          <div class="relative">
            <img
              :src="wardrobeItem.image"
              :alt="wardrobeItem.name"
              class="w-52 h-64 object-cover rounded-md"
            />
            <div class="absolute top-1 right-1 bg-white px-2 py-1 rounded-lg shadow text-green-600 text-sm font-medium">
              {{ wardrobeItem.matchScore }}%
            </div>
          </div>
          <p class="mt-2 text-sm text-center font-medium">{{ wardrobeItem.name }}</p>
        </div>
      </div>
  
      <div class="mt-6">
        <h4 class="font-semibold text-lg mb-2">Product Details</h4>
        <div class="text-sm space-y-1">
          <p class="flex justify-between"><span class="font-medium">Brand:</span> {{ item.brand }}</p>
          <p class="flex justify-between"><span class="font-medium">Material:</span> 100% Cotton</p>
          <p class="flex justify-between"><span class="font-medium">Color:</span> Light Blue</p>
          <p class="flex justify-between"><span class="font-medium">Fit:</span> Regular Fit</p>
          <p class="flex justify-between"><span class="font-medium">Care:</span> Machine wash cold</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  </script>
  