<template>
  <div class="modal">
    <div class="modal__filter" @click="emit('close')"></div>
    <div class="modal__content">
      <div class="modal__button-close" @click="emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <g>
              <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512     512,452.922 315.076,256   "/>
            </g>
          </g>
          </svg>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
//imports

//emits
const emit = defineEmits(['close'])

</script>


<style scoped lang="scss">
@import "@/assets/style/mixins";
.modal {
  @include flex-center;

  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 50;

  &__filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.3);
  }

  &__content {
    position: relative;
    background-color: var(--color-white);
    min-width: 300px;
    padding: 20px;
    border-radius: 8px;
  }

  &__button-close {
    @include flex-center;

    svg {
      width: 15px;
      height: 15px;
    }

    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    opacity: 0.6;
    transition: .1s linear;

    &:hover {
      opacity: 1;
    }
  }
}
</style>