<template>
    <div>
       <section class="bg-white text-black py-12 px-6 md:px-12 flex flex-col md:flex-row items-start gap-12">
  <!-- Text Area -->
  <div class="md:w-1/2">
    <div class="flex items-center gap-3 mb-4">
      <h2 class="text-5xl font-bold">About</h2>
    </div>
    <hr class="border-t-2 border-black/40 mb-6" />
    <p class="font-sans text-lg mt-4">
      Based in Toronto, Ontario, The Spicy Ethiopian is your trusted source for authentic Ethiopian spices online in Canada. We specialize in premium, organic spice blends like Berbere, Mitmita, and Shiro powder, crafted with traditional recipes and delivered fresh to your door.
    </p>
    <p class="font-sans text-lg mt-4">
      Our online shop makes it easy for Canadians to experience the bold, rich flavors of Ethiopian cuisine — whether you're in Toronto, Ottawa, Vancouver, or anywhere across Canada. Every product is carefully sourced and hand-packed to preserve freshness, flavor, and authenticity.
    </p>
  </div>

  <!-- Grouped Image -->
  <div class="md:w-1/2 flex justify-center items-start">
    <img :src="packageGroup" alt="Product collage" class="w-full max-w-md object-contain" />
  </div>
</section>


      <section class="bg-[#282828] text-white py-12 px-6 md:px-12 flex flex-col md:flex-row gap-10">
  <!-- Image Area -->
  <div class="w-full md:w-1/2 grid grid-cols-2 gap-4">
    <!-- Left column: 2 stacked images -->
    <div class="flex flex-col gap-4">
      <img
        :src="gelila3"
        alt="Team with Gelila"
        class="rounded-lg shadow-lg object-cover w-full h-full"
      />
      <img
        :src="gelila2"
        alt="Gelila Pouring Coffee"
        class="rounded-lg shadow-lg object-cover w-full h-full"
      />
    </div>

    <!-- Right column: 1 large image -->
    <div class="flex items-center">
      <img
        :src="gelila1"
        alt="Gelila Serving Food"
        class="rounded-lg shadow-lg object-cover w-full h-full"
      />
    </div>
  </div>

        <!-- Text Area -->
        <div class="w-full flex flex-col justify-center md:w-1/2 px-12">
          <h2 class="text-5xl font-bold border-b-2 border-[#A3A3A3] pb-3">
             Gelila Belete
          </h2>
          <h3 class="text-white text-lg font-sans font-bold mt-3 mb-3">The Owner of The Spicy Ethiopian</h3>
          <p class="font-sans text-lg mt-4">
            The Spicy Ethiopian started as a food truck in Toronto, where Gelila’s passion for authentic Ethiopian food quickly gained a loyal following. Now, she brings her signature flavors to a full-service Ethiopian restaurant, serving up traditional dishes that capture the essence of Ethiopian culture.
          </p>
          <p class="font-sans text-lg mt-4">
            Whether you’re looking for a casual dining experience, catering for an event, or Ethiopian food delivery, Gelila and her team are here to bring you the best Ethiopian food in Toronto.
          </p>
        </div>
</section>

    </div>
  

      
</template>


<script>
import packageGroup from "@/assets/img/packageGroup.png";
import gelila1 from "@/assets/img/gelila1.png";
import gelila2 from "@/assets/img/gelila2.png";
import gelila3 from "@/assets/img/gelila3.png";

export default {
    data () {
        return {
            packageGroup,
            gelila1,
            gelila2,
            gelila3,
        }
    }
}

</script>