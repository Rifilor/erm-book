<template>
  <modal-slots @close="emit('close')">
    <div class="content">
      <h3 class="content__title">{{ $tm(title) ? $t(title) : '' }}</h3>
      <p class="content__text">{{$tm(text) ? $t(text) : ''}}</p>

      <div class="content__bottom">
        <button class="button-gray" @click="emit('close')">{{$t('cancel')}}</button>
        <button class="button-main" @click="emit('delete')">{{$t('delete')}}</button>
      </div>
    </div>
  </modal-slots>
</template>

<script setup lang="ts">
//imports

//props
import ModalSlots from "@/components/modal/modal-slots.vue";

const props = defineProps<{
  title: string,
  text: string,
}>()

//emits
const emit = defineEmits(['close', 'delete'])
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
  &__bottom {
    @include flex-stroke-center;

    margin-top: 15px;
    .button-gray {
      margin-left: auto;
      margin-right: 20px;
    }
  }
}
</style>