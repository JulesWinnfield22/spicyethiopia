<template>
  <div class="deals-container">
    <div class="left-section">
      <h1 class="text-4xl font-bold mb-5">Deals of The Month</h1>
      <p class="text-lg mb-5 font-sans">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        sollicitudin aliquam sem, scelerisque dui ultrices sollicitudin.
      </p>
      <button class="explore-button font-sans cursor-pointer">Explore</button>
    </div>
    <div class="carousel-section">
      <swiper
        :modules="[Pagination]"
        :slides-per-view="2.5"
        :space-between="10"
        :pagination="{ clickable: true }"
        @slideChange="onSlideChange"
        class="swiper-container"
      >
        <swiper-slide v-for="(spice, index) in spices" :key="index">
          <div :style="getImageCardStyle(index)">
            <img :src="spice.image" :alt="spice.name" :style="carouselImageStyle(index)" />
            <div v-if="index === currentIndex" class="overlay font-sans  border border-amber-50">
              <p>{{ spice.deal }}</p>
              <span class="discount font-sans">{{ spice.discount }}</span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import spiceOne from '@/assets/img/spiceOne.png';
import spiceTwo from '@/assets/img/spiceTwo.png';
import spiceThree from '@/assets/img/spiceThree.png';
import spiceFour from '@/assets/img/spiceFour.png';
import spiceFive from '@/assets/img/spiceFive.png';
import spiceSix from '@/assets/img/spiceSix.png';

export default {
  name: 'DealsSection',
  components: { Swiper, SwiperSlide },
  setup() {
    return { Pagination };
  },
  data() {
    return {
      currentIndex: 0,
      spices: [
        { image: spiceOne, name: 'Spice One', deal: '01 - Spring Sale', discount: '30% OFF' },
        { image: spiceTwo, name: 'Spice Two', deal: '02 - Limited Offer', discount: '20% OFF' },
        { image: spiceThree, name: 'Spice Three', deal: '03 - Buy 1 Get 1', discount: '50% OFF' },
        { image: spiceFour, name: 'Spice Four', deal: '04 - Exclusive Deal', discount: '15% OFF' },
        { image: spiceFive, name: 'Spice Five', deal: '05 - Hot Sale', discount: '25% OFF' },
        { image: spiceSix, name: 'Spice Six', deal: '06 - Mega Discount', discount: '40% OFF' },
      ],
    };
  },
  methods: {
    onSlideChange(swiper) {
      this.currentIndex = swiper.activeIndex;
    },
    getImageCardStyle(index) {
      const isActive = index === this.currentIndex;
      const isNext = index === (this.currentIndex + 1) % this.spices.length;
      const isThirdNext = index === (this.currentIndex + 2) % this.spices.length;

      return {
        position: 'relative',
        width: isActive ? '400px' : isNext ? '370px' : '300px',
        height: isActive ? '580px' : isNext || isThirdNext ? '480px' : '300px',
        marginLeft: isNext || isThirdNext ? '10px' : '0', 
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      };
    },
    carouselImageStyle() {
      return {
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        objectFit: 'cover',
      };
    },
  },
};
</script>

<style scoped>
.deals-container {
  display: flex;
  justify-content: space-between;
  padding: 40px;
  padding-right: 0px;
  background-color: #f2f5f6;
}

.left-section {
  flex: 1;
  padding-right: 60px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.explore-button {
  margin-top: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  width: 150px; 
  align-self: flex-start; 
  cursor: pointer;
}

.carousel-section {
  flex: 2;
  overflow: hidden;
}

.overlay {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 24px;
  border-radius: 10px;
}

.discount {
  font-size: 32px;
  font-weight: semibold;
}

.swiper-container {
  width: 100%;
  height: 600px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  background: #f2f5f6;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: #484848;
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #484848;
  opacity: 1;
  position: relative;
}

:deep(.swiper-pagination-bullet-active)::after {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  width: 20px;
  height: 20px;
  border: 2px solid #484848;
  border-radius: 50%;
}

/* Responsive styles */
@media (max-width: 768px) {
  .deals-container {
    flex-direction: column;
    padding: 20px;
  }
  
  .left-section {
    padding-right: 0;
    padding-left: 0;
    margin-bottom: 20px;
  }

  .explore-button {
    width: 100%;
  }

  .swiper-container {
    height: 400px;
  }

  .discount {
    font-size: 24px; 
  }
}

@media (max-width: 480px) {
  .discount {
    font-size: 20px; 
  }

  .overlay {
    padding: 16px; 
  }
}
</style>