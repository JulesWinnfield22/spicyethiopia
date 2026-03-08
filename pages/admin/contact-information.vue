<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Form, Input, Textarea, Select } from "~/components/new_form_elements";
import {
  getContactInfo,
  updateContactInfo,
} from "~/features/admin/api/contactApi";
import { useApiRequest, removeCache } from "~/composables/useApiRequest";
import icons from "~/utils/icons";
import { toasted } from "~/utils/utils";
import Button from "~/components/Button.vue";

const CONTACT_INFO_CACHE_KEY = "admin_contact_info";
const { response, send, pending } = useApiRequest();
const updateReq = useApiRequest();

const form = ref({
  description: "",
  phone_number: [""],
  email: "",
  location: "",
  social_media: [] as { platform: string; url: string }[],
});

const socialPlatforms = [
  "Instagram",
  "Facebook",
  "Twitter (X)",
  "LinkedIn",
  "TikTok",
  "YouTube",
  "WhatsApp",
  "Telegram",
  "Pinterest",
  "Buttons",
];

onMounted(() => {
  fetchContactInfo();
});

async function fetchContactInfo() {
  send(
    getContactInfo,
    (res: any) => {
      if (res.success && res.data) {
        form.value = {
          description: res.data.description || "",
          phone_number: res.data.phone_number?.length
            ? res.data.phone_number
            : [""],
          email: res.data.email || "",
          location: res.data.location || "",
          social_media: res.data.social_media || [],
        };
      }
    },
    false,
    false,
    CONTACT_INFO_CACHE_KEY,
  );
}

function addPhone() {
  form.value.phone_number.push("");
}

function removePhone(index: number) {
  if (form.value.phone_number.length > 1) {
    form.value.phone_number.splice(index, 1);
  } else {
    form.value.phone_number[0] = "";
  }
}

function addSocial() {
  form.value.social_media.push({ platform: "", url: "" });
}

function removeSocial(index: number) {
  form.value.social_media.splice(index, 1);
}

async function handleSave() {
  updateReq.send(
    () => updateContactInfo(form.value),
    (res: any) => {
      if (res.success) {
        removeCache(CONTACT_INFO_CACHE_KEY);
      }
      toasted(
        res.success,
        "Contact information updated successfully",
        res.error,
      );
    },
  );
}
</script>

<template>
  <div class="max-w-3xl mx-auto w-full py-8">
    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div
        class="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30"
      >
        <div
          class="size-10 rounded-full bg-black text-white grid place-items-center"
        >
          <i v-html="icons.contact" class="size-5" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-gray-900">Contact Information</h1>
          <p class="text-xs text-gray-500">
            Manage how customers reach out and find your business
          </p>
        </div>
      </div>

      <div class="p-8">
        <Form id="contact-info-form" v-slot="{ submit }" class="space-y-8">
          <!-- Email Section -->
          <div class="space-y-2">
            <label
              class="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <i v-html="icons.mail" class="size-4 text-black" />
              Public Email Address
            </label>
            <Input
              v-model="form.email"
              name="email"
              placeholder="e.g. hello@spicyethiopian.com"
              validation="required|email"
            />
          </div>

          <!-- Description Section -->
          <div class="space-y-2">
            <label
              class="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <i v-html="icons.book" class="size-4 text-black" />
              Site Description
            </label>
            <Textarea
              v-model="form.description"
              name="description"
              placeholder="Briefly describe your business for customers..."
              validation="required|minmax-10,500"
            />
          </div>

          <!-- Location Section -->
          <div class="space-y-2">
            <label
              class="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <i v-html="icons.location" class="size-4 text-black" />
              Physical Location
            </label>
            <Input
              v-model="form.location"
              name="location"
              placeholder="e.g. 175 Queen St E, Toronto, ON"
              validation="required|minmax-5,50"
            />
          </div>

          <!-- Phone Section -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label
                class="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <i v-html="icons.support" class="size-4 text-black" />
                Phone Numbers
              </label>
              <button
                type="button"
                @click="addPhone"
                class="text-xs font-bold text-black hover:opacity-70 flex items-center gap-1 transition-all"
              >
                <span
                  class="size-5 rounded-full bg-black/5 grid place-items-center"
                  >+</span
                >
                Add Number
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="(phone, index) in form.phone_number"
                :key="index"
                class="flex gap-2 group animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div class="flex-1">
                  <Input
                    v-model="form.phone_number[index]"
                    :name="'phone_' + index"
                    placeholder="e.g. +1 (647) 000-0000"
                    validation="required"
                  />
                </div>
                <button
                  type="button"
                  @click="removePhone(index)"
                  class="size-11 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all font-bold"
                  title="Remove phone"
                >
                  <i v-html="icons.close" class="size-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Social Media Section -->
          <div class="space-y-4 pt-4 border-t border-gray-50">
            <div class="flex items-center justify-between">
              <label
                class="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <i v-html="icons.ig" class="size-4 text-black" />
                Social Media Links
              </label>
              <button
                type="button"
                @click="addSocial"
                class="text-xs font-bold text-black hover:opacity-70 flex items-center gap-1 transition-all"
              >
                <span
                  class="size-5 rounded-full bg-black/5 grid place-items-center"
                  >+</span
                >
                Add Platform
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="(social, index) in form.social_media"
                :key="index"
                class="flex flex-col md:flex-row gap-2 pb-3 border-b border-gray-50 last:border-0 group animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div class="flex-1 min-w-[150px]">
                  <Select
                    v-model="social.platform"
                    :name="'social_platform_' + index"
                    label="Platform"
                    :options="socialPlatforms"
                    :attributes="{ placeholder: 'Select' }"
                    validation="required"
                  />
                </div>
                <div class="flex-[3]">
                  <Input
                    v-model="social.url"
                    :name="'social_url_' + index"
                    label="URL"
                    placeholder="e.g. https://instagram.com/spicyethiopian"
                    validation="required"
                  />
                </div>
                <button
                  type="button"
                  @click="removeSocial(index)"
                  class="size-11 self-end md:mb-[3px] rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all font-bold"
                  title="Remove social link"
                >
                  <i v-html="icons.close" class="size-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-6 border-t border-gray-50 flex justify-end gap-3">
            <Button
              type="edge"
              size="md"
              @click="fetchContactInfo"
              :disabled="pending || updateReq.pending.value"
            >
              Discard Changes
            </Button>
            <Button
              type="secondary"
              size="md"
              @click.prevent="submit(handleSave)"
              :pending="updateReq.pending.value"
              :disabled="pending"
            >
              Save Information
            </Button>
          </div>
        </Form>
      </div>
    </div>

    <!-- Preview Note -->
    <div
      class="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100/50"
    >
      <div class="text-amber-600 pt-0.5">💡</div>
      <p class="text-xs text-amber-800 leading-relaxed font-medium">
        Note: Changes saved here will be immediately visible to customers on the
        <RouterLink to="/contact" class="underline font-bold"
          >Contact Page</RouterLink
        >
        and in the
        <RouterLink to="/" class="underline font-bold">Site Footer</RouterLink>.
      </p>
    </div>
  </div>
</template>
