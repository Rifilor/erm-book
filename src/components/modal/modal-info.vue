<template>
  <modal-slots @close="emit('close')">
    <div class="content">
      <h3 class="content__title">{{ $tm(title) ? $t(title) : '' }}</h3>
      <p class="content__text">{{$tm(text) ? $t(text) : ''}}</p>
    </div>
  </modal-slots>
</template>

<script setup lang="ts">
//imports
import ModalSlots from "@/components/modal/modal-slots.vue";

//props
const props = defineProps<{
  title: string,
  text: string,
}>()

//emits
const emit = defineEmits(['close'])
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";

.content {
  &__title {
    @include fonts(20px, 600);
  }
  &__text {
    margin-top: 15px;
    @include fonts(16px);
  }
}
</style>