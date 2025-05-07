<script setup lang="ts">
import Button from '@/components/Button.vue';
import Form from '@/components/new_form_builder/Form.vue';
import { Input, Textarea } from '@/components/new_form_elements';

function sendMessage() {

}
</script>
<template>
  <div class="overflow-x-hidden">
    <section class="bg-black __contact_bg text-white text-center">
      <div class="bg-black/60 grid place-items-center gap-6 mx-auto md:px-8 py-16">
        <h1 class="header-size font-dm-serif font-semibold md:max-w-[15ch] leading-tight">
          We value your reviews and message
        </h1>
        <p
          class="description-size mx-auto border-t-2 border-white pt-3"
        >
          Your thoughts help us grow — feel free to reach out <br />
          with questions, suggestions, or reviews.
        </p>
        <div class="mt-8 flex justify-center gap-6">
          <Button type="primary">
            Call us Instead
          </Button>
        </div>
      </div>
    </section>

    <section
      class="mx-auto container py-12 px-4 md:px-12 gap-6 grid md:grid-cols-2"
    >
      <div
        className="bg-gray min-h-[20rem] rounded-lg flex items-center justify-center"
      ></div>
      <div class="grid gap-4">
        <div>
          <h2 class="text-2xl md:text-4xl font-bold font-dm-serif">Send us a Message</h2>
          <p class="text-base">
            Send review please, it will help us to be better!
          </p>
        </div>
        <Form v-slot="{ submit }" id="message" class="grid gap-4" >
          <Input 
            name="email"
            label="Email"
            :attributes="{
              placeholder: 'example@gmail.com'
            }"
            validation="required|email"
          />
          <Input 
            name="fullname"
            label="Full Name"
            :attributes="{
              placeholder: 'Full Name'
            }"
            validation="required|alpha|mimax-2,15"
          />
          <Input 
            name="phone"
            label="Phone Number"
            :attributes="{
              placeholder: 'Enter Your Phone Number'
            }"
            validation="required|email"
          />
          <Textarea 
            name="message"
            label="Message"
            :attributes="{
              placeholder: 'Write Your Message'
            }"
            validation="required|minmax-10,100"
          />
          <div class="">
            <Button
              @click.prevent="submit(sendMessage)"
              class="bg-black text-white w-full font-semibold font-sans py-5 cursor-pointer rounded-md flex items-center justify-center transition duration-300 hover:bg-black/70"
            >
              Send Message
            </Button>
          </div>
        </Form>
      </div>
    </section>
  </div>
</template>

<style scoped >
  .__contact_bg {
    background-image: url('../assets/img/contact.jpg');
    background-size: cover;
  }
</style>