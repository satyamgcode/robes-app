<template>
    <div class="flex flex-col h-screen max-w-md mx-auto bg-gray-50 relative">
    <div class="bg-yellow-400 p-4">
      <div class="flex items-center justify-between mb-3">
        <button class="p-1" @click="selectedItem = null">
          <Menu class="w-6 h-6" />
        </button>
        <h1 class="text-lg font-semibold">Robes</h1>
        <div class="w-6"></div>
      </div>
      <div class="bg-white rounded-lg flex items-center px-4 py-2">
        <Search class="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search robes..."
          class="ml-2 w-full outline-none"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto px-4 pb-20">
      <div class="space-y-4 py-4">
        <div
          v-for="item in clothes"
          :key="item.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div class="relative">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-[32rem] object-cover"
            />
            <div class="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow">
              <span class="text-sm font-semibold text-green-600">
                {{ getAverageMatchScore(item.wardrobeItems) }}% Match
              </span>
            </div>

            <!-- Like/Dislike Buttons -->
            <div class="absolute bottom-4 left-4">
              <button
                @click="handleDislike(item.id)"
                class="p-3 rounded-full shadow bg-white text-blue-500"
              >
                <X class="w-8 h-8" />
              </button>
            </div>
            <div class="absolute bottom-4 right-4">
              <button
                @click="handleLike(item.id)"
                class="p-3 rounded-full shadow bg-white text-pink-500"
              >
                <Heart
                  :class="[
                    'w-8 h-8',
                    likedItems.has(item.id) ? 'fill-current' : '',
                  ]"
                />
              </button>
            </div>
          </div>

          <div class="p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-lg">{{ item.name }}</h3>
                <p class="text-gray-500 text-sm">{{ item.brand }}</p>
                <p class="text-gray-600 mt-1">{{ item.price }}</p>
              </div>
              <button
                @click="handleAddToCart(item.id)"
                class="p-2 rounded-full"
                :class="{
                  'bg-green-100 text-green-500': cartItems.has(item.id),
                  'bg-gray-100 text-green-500': !cartItems.has(item.id),
                }"
              >
                <ShoppingCart class="w-5 h-5" />
              </button>
            </div>

            <button
              class="w-full bg-yellow-400 text-black py-2 rounded-lg font-medium mt-4"
              @click="handleDetailsClick(item)"
            >
              {{ selectedItem?.id === item.id ? 'Hide Details' : 'View Details' }}
            </button>
          </div>

          <ItemDetails v-if="selectedItem?.id === item.id" :item="item" />
        </div>
      </div>
    </div>

    <!-- Floating Camera Button -->
    <div class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-20">
      <button class="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center">
        <Camera class="w-7 h-7 text-gray-500" />
      </button>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="max-w-md mx-auto flex justify-around items-center h-16">
        <button class="flex flex-col items-center text-gray-400">
          <LayoutGrid class="w-6 h-6" />
          <span class="text-xs mt-1">Wardrobe</span>
        </button>
        <button class="flex flex-col items-center text-yellow-400">
          <Shirt class="w-6 h-6" />
          <span class="text-xs mt-1">Robes</span>
        </button>
        <button class="flex flex-col items-center text-gray-400">
          <Heart class="w-6 h-6" />
          <span class="text-xs mt-1">Likes</span>
        </button>
        <button class="flex flex-col items-center text-gray-400">
          <ShoppingCart class="w-6 h-6" />
          <span class="text-xs mt-1">Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import image1 from '../assets/images/s1.jpg'
import image2 from '../assets/images/s2.jpg'
import image3 from '../assets/images/s3.jpg'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// const toast = useToast();

import {
  Heart,
  ShoppingCart,
  Search,
  X,
  Menu,
  Shirt,
  LayoutGrid,
  Camera,
} from "lucide-vue-next";

// Reactive state
const selectedItem = ref(null);
const likedItems = ref(new Set());
const dislikedItems = ref(new Set());
const cartItems = ref(new Set());

const handleLike = (id) => {
  if (likedItems.value.has(id)) {
    likedItems.value.delete(id);
    toast.warning(" Removed! Item removed from liked items.", { autoClose: 1000 , icon: '❌' , });
  } else {
    likedItems.value.add(id);
    toast.success(" Liked! Item added to liked items.", { autoClose: 1000 , icon : '❤️'  });
  }
};

const handleDislike = (id) => {
  if (dislikedItems.value.has(id)) {
    dislikedItems.value.delete(id);
    toast.warning(" Removed! Item removed from disliked items.", { autoClose: 1000 , icon: '❌'});
  } else {
    dislikedItems.value.add(id);
    toast.error("Disliked! Item added to disliked items.", { autoClose: 1000 , icon : '👎'  });
  }
};
''
const handleAddToCart = (id) => {
  if (cartItems.value.has(id)) {
    cartItems.value.delete(id);
    toast.warning(" Removed from Cart! Item removed from the cart.", { autoClose: 1000 , icon : '🛒'  });
  } else {
    cartItems.value.add(id);
    toast.success("Added to Cart! Item added to the cart.", { autoClose: 1000 , icon : '✅'  });
  }
};

const clothes = ref([
  {
    id: 1,
    name: "Striped Oxford Shirt",
    brand: "Ralph Lauren",
    price: "₹2,999",
    image: image1,
    wardrobeItems: [
      { id: "w1", name: "Black Cotton Shirt", matchScore: 92, image: "/api/placeholder/225/400" },
      { id: "w2", name: "Navy Blue Blazer", matchScore: 88, image: "/api/placeholder/225/400" },
      { id: "w3", name: "White Dress Shirt", matchScore: 85, image: "/api/placeholder/225/400" },
      { id: "w4", name: "Grey Sweater", matchScore: 82, image: "/api/placeholder/225/400" },
      { id: "w5", name: "Denim Jacket", matchScore: 80, image: "/api/placeholder/225/400" },
    ],
  },
  {
    id: 2,
    name: "Linen Button-Down",
    brand: "Zara",
    price: "₹3,499",
    image: image2,
    wardrobeItems: [
      { id: "w1", name: "Black Cotton Shirt", matchScore: 92, image: "/api/placeholder/225/400" },
      { id: "w2", name: "Navy Blue Blazer", matchScore: 88, image: "/api/placeholder/225/400" },
    ],
  },
  {
    id: 3,
    name: "Casual Denim Shirt",
    brand: "Levi's",
    price: "₹2,499",
    image: image3 ,
    wardrobeItems: [
      { id: "w1", name: "Black Cotton Shirt", matchScore: 92, image: "/api/placeholder/225/400" },
      { id: "w3", name: "White Dress Shirt", matchScore: 85, image: "/api/placeholder/225/400" },
    ],
  },
]);

// Methods
const getAverageMatchScore = (items) =>
  Math.round(items.reduce((acc, item) => acc + item.matchScore, 0) / items.length);

const handleDetailsClick = (item) => {
  selectedItem.value = selectedItem.value?.id === item.id ? null : item;
};
</script>

