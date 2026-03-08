<script setup lang="ts">
import InputLayout from "~/components/new_form_elements/NewInputLayout.vue";
import { useApiRequest } from "~/composables/useApiRequest";
import InputParent from "~/components/new_form_builder/InputParent.vue";
import { getAddressAutocomplete } from "~/features/public/api/addressApi";
import icons from "~/utils/icons";
import { ref, onMounted, computed } from "vue";
// @ts-ignore
import { OnClickOutside } from "@vueuse/components";

const props = defineProps({
  modelValue: {
    required: false,
  },
  value: {
    type: String,
  },
  attributes: {
    type: Object,
  },
});
const emit = defineEmits(["update:modelValue", "select"]);

const req = useApiRequest();

const search = ref(props.modelValue || props.value || "");
const addresses = ref<any[]>([]);
const openDropdown = ref(false);
const recentSearches = ref<any[]>([]);

const displayAddresses = computed(() => {
  return search.value && addresses.value.length > 0
    ? addresses.value
    : recentSearches.value;
});

let controller: AbortController | null = null;
let timeout: any;

function getAddresses(ev: any) {
  const query = ev.target.value;
  search.value = query;
  emit("update:modelValue", query);

  if (!query) {
    addresses.value = [];
    if (recentSearches.value.length > 0) openDropdown.value = true;
    else openDropdown.value = false;
    return;
  }

  openDropdown.value = true;

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (controller) controller.abort();
    controller = new AbortController();

    req.send(
      () =>
        getAddressAutocomplete(query, {
          signal: controller?.signal,
        }),
      (res) => {
        if (res.success && Array.isArray(res.data)) {
          addresses.value = res.data;
          openDropdown.value = true;
        }
      },
      true,
      false,
      { enabled: true, key: `address_autocomplete_${query}`, ttl: 3600 },
    );
  }, 300);
}

function handleFocus() {
  if (search.value && addresses.value.length > 0) {
    openDropdown.value = true;
  } else if (!search.value && recentSearches.value.length > 0) {
    openDropdown.value = true;
  }
}

function select(address: any) {
  const displayValue =
    address.displayName || address.address?.streetAddress || "Selected Address";
  search.value = displayValue;
  emit("update:modelValue", displayValue);

  emit("select", {
    streetAddress: address.address?.streetAddress,
    city: address.address?.city,
    province: address.address?.province,
    postalCode: address.address?.postalCode,
    country: address.address?.country,
    coordinates: address.coordinates,
  });

  // Save to recent searches
  const existingIndex = recentSearches.value.findIndex(
    (a) => (a.displayName || a.address?.streetAddress) === displayValue,
  );
  if (existingIndex > -1) {
    recentSearches.value.splice(existingIndex, 1);
  }
  recentSearches.value.unshift(address);
  if (recentSearches.value.length > 5) recentSearches.value.pop();
  localStorage.setItem(
    "recent_address_searches",
    JSON.stringify(recentSearches.value),
  );

  openDropdown.value = false;
}

onMounted(() => {
  search.value = props.modelValue || props.value || "";
  try {
    const cached = localStorage.getItem("recent_address_searches");
    if (cached) {
      recentSearches.value = JSON.parse(cached);
    }
  } catch (e) {
    console.error("Failed to parse recent searches", e);
  }
});
</script>

<template>
  <InputParent
    name="address"
    :attributes="attributes"
    v-model="search"
    v-slot="{ setRef, error }"
  >
    <InputLayout v-bind="$attrs" class="!overflow-visible" :error="error">
      <div
        class="relative focus:border-0 w-full flex h-full !overflow-visible"
        :ref="setRef"
      >
        <OnClickOutside
          class="flex-1 w-full !overflow-visible"
          @trigger="openDropdown = false"
        >
          <div class="flex h-full w-full">
            <input
              @input="getAddresses"
              @focus="handleFocus"
              :value="search"
              class="flex-1 bg-transparent w-full text-sm outline-none placeholder:opacity-60"
              :placeholder="attributes?.placeholder"
              name="streetAddress"
              autocomplete="off"
            />
            <div
              @click="openDropdown = !openDropdown"
              class="cursor-pointer h-full ml-auto w-8 flex items-center justify-center text-gray-500"
            >
              <i v-if="!req.pending.value" v-html="icons.down" />
              <i v-else class="animate-spin" v-html="icons.spinner" />
            </div>
          </div>
          <div
            v-if="openDropdown"
            class="absolute top-[calc(100%+8px)] z-20 overflow-y-scroll rounded-lg border border-gray-200 bg-white w-full left-0 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]"
          >
            <div
              v-if="req.pending.value"
              class="p-4 bg-white grid place-items-center"
            >
              <i
                class="animate-spin text-gray-400 text-xl"
                v-html="icons.spinner"
              />
            </div>

            <template v-else>
              <div
                v-if="!search && recentSearches.length > 0"
                class="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-100"
              >
                Recent Searches
              </div>
              <p
                tabindex="0"
                v-for="(address, idx) in displayAddresses"
                :key="idx"
                @click="select(address)"
                class="p-3 bg-white cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-0 text-sm transition-colors"
              >
                {{
                  address.displayName ||
                  address.address?.streetAddress ||
                  JSON.stringify(address)
                }}
              </p>
              <div
                v-if="!displayAddresses.length && search"
                class="p-4 bg-white grid place-items-center"
              >
                <p class="text-sm text-center italic text-gray-500">
                  No addresses found for "{{ search }}"
                </p>
              </div>
            </template>
          </div>
        </OnClickOutside>
      </div>
    </InputLayout>
  </InputParent>
</template>
