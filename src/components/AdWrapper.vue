<script setup lang="ts">
import ImageChangeFileInput from "@/components/ImageChangeFileInput.vue";
import TextEditable from "@/components/TextEditable.vue";
import icons from "@/utils/icons";

const props = defineProps({
  switchLeft: {
    type: Boolean,
    default: false,
  },
  switchRight: {
    type: Boolean,
    default: false,
  },
})

</script>
<template>
  <section class="sm:justify-items-center ad-grid gap-6 lg:p-24">
    <div
      :class="[switchLeft && 'switch-left', switchRight && 'switch-right']"
      class="area-l p-4 sm:p-8"
    >
      <div class="flex py-8 sm:p-0 flex-col gap-6 rounded-lg">
        <slot name="left" />
      </div>
    </div>
    <div
      :class="[switchLeft && 'switch-left', switchRight && 'switch-right']"
      class="area-r w-full p-2 sm:p-8 sm:max-w-[37rem] sm:max-h-[40rem]"
    >
      <slot name="right" />
    </div>
  </section>
</template>

<style scoped>
.ad-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  grid-template-areas:
    "l"
    "r";
}

.area-l {
  grid-area: l;
}

.area-r {
  grid-area: r;
}

.switch-left.area-l {
  grid-area: r;
}

.switch-left.area-r {
  grid-area: l;
}

.switch-right.area-l {
  grid-area: r;
}

.switch-right.area-r {
  grid-area: l;
}

@media (width >= 640px) {
  .ad-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: max-content;
    grid-template-areas: "l r";
  }

  .area-r {
    grid-area: r;
  }

  .area-l {
    grid-area: l;
  }

  .switch-left.area-l {
    grid-area: l;
  }

  .switch-left.area-r {
    grid-area: r;
  }

  .switch-right.area-l {
    grid-area: r;
  }

  .switch-right.area-r {
    grid-area: l;
  }
}
</style>
