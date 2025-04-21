<template>
    <div class="overflow-x-hidden">
        <section class="bg-black text-white py-16 text-center">
      <div class="container mx-auto px-8">
        <h1 class="text-2xl md:text-7xl font-semibold leading-tight font-serif ">
          We value your reviews and messages.
        </h1>
        <p class="mt-4 font-sans max-w-3xl mx-auto text-base md:text-xl border-t-2 border-white pt-3">
          Your thoughts help us grow — feel free to reach out <br/> with questions, suggestions, or reviews.
        </p>
        <div class="mt-8 flex justify-center gap-6">
          <button
            class="bg-white text-black font-semibold font-sans px-6 py-3 cursor-pointer rounded-full flex items-center gap-2 transition duration-300 hover:bg-gray-100"
          >
            Call us Instead
          </button>
          
        </div>
      </div>
    </section>
    <section
        class="bg-white text-black py-12 px-4 md:px-12 flex flex-col md:flex-row items-center"
      >
      <!-- Map Ares -->
        <div className="w-full md:w-1/2 md:px-6 mt-4 md:mt-0">
            <div className="bg-gray-200 w-full h-[350px] md:w-[623px] md:h-[647px] rounded-lg flex items-center justify-center">
              
            </div>
          </div>

        <!-- Message Area -->
        <div class="md:w-1/2 px-2 md:px-12 mt-3">
          <h2 class="text-2xl md:text-4xl font-bold">
            Send us a Message
          </h2>
          <p class="font-sans text-lg font-medium">
            Send review please, it will help us to be better!
          </p>
          <div class="space-y-2 font-sans">
            <div class="mt-4">
              <p class="mb-2 text-black">Email</p>
              <input type="text" placeholder="Example@gmail.com" class="w-full h-[52px] border-2 border-black px-4 py-2 rounded-md" />
            </div>
            <div class="">
              <p class="mb-2 text-black">Full name</p>
              <input type="text" placeholder="Enter full name" class="w-full h-[52px] border-2 border-black px-4 py-2 rounded-md" />
            </div>
            <div>
              <p class="mb-2 text-black">Phone number</p>
              <input type="text" placeholder="Enter Enter phone number" class="w-full h-[52px] border-2 border-black px-4 py-2 rounded-md" />
            </div>
            <div>
  <p class="mb-2 text-black">Message</p>
  <textarea 
    placeholder="Enter your message" 
    class="w-full h-[140px] border-2 border-black px-4 py-2 rounded-md resize-none align-top"
  ></textarea>
</div>
            <div class="mt-8 flex items-center justify-center gap-6">
          <button
            class="bg-black text-white w-full font-semibold font-sans  py-5 cursor-pointer rounded-md flex items-center justify-center transition duration-300 hover:bg-black/70"
          >
            Send Message
          </button>
          
        </div> 
          </div>
        </div>
      </section>
    </div>
</template>

<script lang="ts">



</script>