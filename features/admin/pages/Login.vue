<script setup lang="ts">
import { ref } from "vue";
import loginPhoto from "~/assets/img/login.png";
import login2 from "~/assets/img/login2.png";
import Form from "~/components/new_form_builder/Form.vue";
import Input from "~/components/new_form_elements/Input.vue";
import InputPassword from "~/components/new_form_elements/InputPassword.vue";
import Button from "~/components/Button.vue";
import { useApiMutation } from "~/composables/useApiMutation";
import { login } from "../api/authApi";
import { toasted } from "~/utils/utils";
import { useAuth } from "../store/authStore";
import { useRouter } from "vue-router";

const showPassword = ref(false);
const rememberMe = ref(false);

const auth = useAuth();
const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const req = useApiMutation();
const handleLogin = ({ values }: any) => {
  if (req.pending.value) return;

  req.send(
    () => login(values),
    (res) => {
      if (res.success) {
        auth.setAuth(res.data);
        router.push("/admin/orders");
      }
      toasted(res.success, "Successfully Logged In", res.error);
    },
  );
};
</script>
<template>
  <div class="grid grid-cols-3 h-full box-border">
    <!-- Left Side Image -->
    <div
      class="col-span-2 max-h-full max-w-full bg-cover bg-center"
      :style="{ backgroundImage: `url(${loginPhoto})` }"
    ></div>

    <!-- Right Side Form -->
    <div class="flex flex-col p-8 items-center">
      <div class="w-full max-w-md space-y-8">
        <!-- Logo -->
        <div class="flex justify-center">
          <img :src="login2" alt="Spice Bottle" class="h-56" />
        </div>

        <!-- Welcome Text -->
        <div>
          <h2 class="font-dm-serif text-xl mb-5">Nice to see you again</h2>
          <p class="text-sm text-gray-600 font-sans">
            Oversee your spice inventory and ensure timely follow-ups regarding
            your Authentic Ethiopian Spices.
          </p>
        </div>
        <Form v-slot="{ submit }" id="login-form" class="grid gap-4">
          <Input
            name="email"
            type="text"
            :attributes="{
              placeholder: 'Email or phone number',
            }"
            validation="required|email"
            label="Email"
          />
          <InputPassword
            name="password"
            label="Password"
            :attributes="{
              placeholder: 'Password',
            }"
            validation="required|minmax-6,12"
          />
          <div
            class="flex items-center justify-between text-sm text-gray-600 mb-8"
          >
            <div class="flex items-center space-x-2">
              <button
                type="button"
                @click.prevent="rememberMe = !rememberMe"
                :class="[
                  'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none',
                  rememberMe
                    ? 'bg-black'
                    : 'bg-[#F2F2F2] border-[0.5px] border-[#E5E5E5]',
                ]"
              >
                <span
                  :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200',
                    rememberMe ? 'translate-x-6' : 'translate-x-1',
                  ]"
                ></span>
              </button>
              <span class="text-black">Remember me</span>
            </div>
            <a href="#" class="hover:underline text-black">Forgot password?</a>
          </div>
          <Button
            :pending="req.pending.value"
            @click.prevent="submit(handleLogin)"
            size="md"
            type="secondary"
          >
            Login
          </Button>
          <p class="text-center text-sm text-[#666666] mt-28 font-sans">
            Designed and Developed by
            <a href="#" class="underline hover:text-black">Encoverse</a>
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>
<style scoped lang="ts"></style>
