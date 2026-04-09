<script setup lang="ts">
import InputLayout from "~/components/new_form_elements/NewInputLayout.vue";
import { useApiMutation } from "~/composables/useApiMutation";
import InputParent from "~/components/new_form_builder/InputParent.vue";
import { getAddressAutocomplete } from "~/features/public/api/addressApi";
import icons from "~/utils/icons";
import { useWindowSize } from "~/composables/useWindowSize";
import { ref, onMounted, computed, watch } from "vue";
// @ts-ignore
import { OnClickOutside } from "@vueuse/components";

const windowSize = useWindowSize();
const isMobile = computed(() => windowSize.value.width < 768);
const showMobileOverlay = ref(false);
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

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

const req = useApiMutation();

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
      `address_autocomplete_${query}`,
      3600,
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

function openMobileSearch() {
  showMobileOverlay.value = true;
  openDropdown.value = true;
}

function closeMobileSearch() {
  showMobileOverlay.value = false;
  openDropdown.value = false;
}

// Ensure overlay input is focused when opened
const mobileInputRef = ref<HTMLInputElement | null>(null);
watch(showMobileOverlay, (val) => {
  if (val) {
    setTimeout(() => {
      mobileInputRef.value?.focus();
    }, 100);
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
        <!-- Desktop View -->
        <OnClickOutside
          v-if="isMounted && !isMobile"
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

        <!-- Mobile View (Trigger) -->
        <div
          v-else-if="isMounted && isMobile"
          @click="openMobileSearch"
          class="flex-1 w-full flex items-center cursor-pointer min-h-[44px]"
        >
          <span
            class="text-sm flex-1 truncate"
            :class="search ? 'text-black' : 'text-gray-400'"
          >
            {{ search || attributes?.placeholder || "Select Address" }}
          </span>
          <div
            class="h-full ml-auto w-8 flex items-center justify-center text-gray-500"
          >
            <i v-html="icons.search" />
          </div>
        </div>

        <!-- Mobile Search Overlay -->
        <Teleport to="body">
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-full"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-full"
          >
            <div
              v-if="isMobile && showMobileOverlay"
              class="fixed inset-0 z-100 bg-white flex flex-col"
            >
              <!-- Header -->
              <div
                class="flex items-center p-4 border-b border-gray-100 gap-3 bg-white sticky top-0"
              >
                <button
                  @click="closeMobileSearch"
                  class="p-2 -ml-2 rounded-full hover:bg-gray-50"
                >
                  <i class="w-5 h-5 block" v-html="icons.leftArrow" />
                </button>
                <div
                  class="flex-1 bg-gray-100 rounded-lg flex items-center px-3 py-1"
                >
                  <i class="text-gray-400 w-4 h-4 mr-2" v-html="icons.search" />
                  <input
                    ref="mobileInputRef"
                    @input="getAddresses"
                    :value="search"
                    class="flex-1 bg-transparent py-2 text-sm outline-none"
                    :placeholder="
                      attributes?.placeholder || 'Search address...'
                    "
                    autocomplete="off"
                  />
                  <button
                    v-if="search"
                    @click="
                      search = '';
                      getAddresses({ target: { value: '' } });
                    "
                    class="p-1"
                  >
                    <i
                      class="text-gray-400 w-4 h-4"
                      v-html="icons.close || '✕'"
                    />
                  </button>
                </div>
              </div>

              <!-- Results -->
              <div class="flex-1 overflow-y-auto">
                <div
                  v-if="req.pending.value"
                  class="p-8 flex justify-center items-center"
                >
                  <i
                    class="animate-spin text-primary text-3xl"
                    v-html="icons.spinner"
                  />
                </div>

                <template v-else>
                  <div
                    v-if="!search && recentSearches.length > 0"
                    class="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider"
                  >
                    Recent Searches
                  </div>
                  <div
                    v-for="(address, idx) in displayAddresses"
                    :key="idx"
                    @click="
                      select(address);
                      closeMobileSearch();
                    "
                    class="px-4 py-4 flex items-start gap-4 active:bg-gray-50 border-b border-gray-50"
                  >
                    <div
                      class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0"
                    >
                      <i class="text-gray-400" v-html="icons.location" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900 truncate">
                        {{
                          address.displayName || address.address?.streetAddress
                        }}
                      </p>
                      <p
                        v-if="address.address?.city"
                        class="text-xs text-gray-500 truncate"
                      >
                        {{ address.address?.city }},
                        {{ address.address?.province }}
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="!displayAddresses.length && search"
                    class="p-12 text-center"
                  >
                    <div
                      class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <i
                        class="text-gray-300 transform scale-150"
                        v-html="icons.location"
                      />
                    </div>
                    <p class="text-gray-900 font-medium">No addresses found</p>
                    <p class="text-sm text-gray-500 mt-1">
                      Try searching for a different street or city
                    </p>
                  </div>
                </template>
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </InputLayout>
  </InputParent>
</template>
