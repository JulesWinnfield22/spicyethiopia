<script setup lang="ts">
definePageMeta({ title: "Contact Us" });
useSeoMeta({
  title: "Contact Us | The Spicy Ethiopian",
  description:
    "Get in touch with The Spicy Ethiopian. Send us your questions, suggestions, or reviews. We value your feedback and are here to help.",
  ogTitle: "Contact Us | The Spicy Ethiopian",
  ogDescription:
    "Have questions about our Ethiopian spices? Send us a message — we'd love to hear from you.",
});
import Button from "~/components/Button.vue";
import Form from "~/components/new_form_builder/Form.vue";
import { Input, Textarea } from "~/components/new_form_elements";
import { sendMessage } from "~/features/public/api/contactApi";
import { useApiMutation } from "~/composables/useApiMutation";
import { toasted } from "~/utils/utils";

const { send, pending } = useApiMutation();

function handleSendMessage({ values, reset }: any) {
  send(
    () =>
      sendMessage({
        fullName: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        message: values.message,
      }),
    (res: any) => {
      toasted(
        res.success,
        "Message sent successfully!",
        res.error || "Failed to send message",
      );
      if (res.success && reset) reset();
    },
  );
}
</script>
<template>
  <div class="overflow-x-hidden">
    <section
      class="bg-black __contact_bg text-white text-center relative overflow-hidden"
    >
      <div
        class="bg-black/60 w-full h-full min-h-[400px] md:min-h-[664px] flex flex-col items-center justify-center gap-6 px-4 md:px-8 py-16"
      >
        <h1
          class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-dm-serif font-semibold md:max-w-[15ch] leading-tight"
        >
          We value your reviews and message
        </h1>
        <p
          class="description-size mx-auto border-t-2 border-white pt-3 max-w-[60ch]"
        >
          Your thoughts help us grow — feel free to reach out
          <br class="hidden md:block" />
          with questions, suggestions, or reviews.
        </p>
        <!-- <div class="mt-4 flex justify-center gap-6">
          <Button type="primary"> Call us Instead </Button>
        </div> -->
      </div>
    </section>

    <section
      class="mx-auto container py-12 px-4 md:px-12 gap-6 grid md:grid-cols-2"
    >
      <div
        class="bg-gray min-h-[20rem] rounded-lg flex items-center justify-center"
      ></div>
      <div class="grid gap-4">
        <div>
          <h2 class="text-2xl md:text-4xl font-bold font-dm-serif">
            Send us a Message
          </h2>
          <p class="text-base text-gray-600">
            Send review please, it will help us to be better!
          </p>
        </div>
        <Form v-slot="{ submit }" id="message" class="grid gap-4">
          <Input
            name="email"
            label="Email"
            :attributes="{
              placeholder: 'example@gmail.com',
            }"
            validation="required|email"
          />
          <Input
            name="fullname"
            label="Full Name"
            :attributes="{
              placeholder: 'Full Name',
            }"
            validation="required|alpha|minmax-2,50"
          />
          <Input
            name="phoneNumber"
            label="Phone Number"
            :attributes="{
              placeholder: 'Enter Your Phone Number',
            }"
            validation="required|phone"
          />
          <Textarea
            name="message"
            label="Message"
            :attributes="{
              placeholder: 'Write Your Message',
            }"
            validation="required|minmax-10,300"
          />
          <div class="">
            <Button
              @click.prevent="submit(handleSendMessage)"
              :pending="pending"
              class="bg-black text-white w-full font-semibold font-sans py-5 cursor-pointer rounded-md flex items-center justify-center transition duration-300 shadow-lg"
            >
              Send Message
            </Button>
          </div>
        </Form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.__contact_bg {
  background-image: url("../assets/img/contact.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
}

@media (max-width: 768px) {
  .__contact_bg {
    aspect-ratio: 4 / 3;
  }
}
</style>
