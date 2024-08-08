<template>
  <div class="navigation">
    <button class="navigation__button-menu" @click="showPanel=!showPanel">
      <svg v-if="!showPanel" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
        <path d="M4 6H20M4 12H20M4 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <nav class="navigation-panel" :class="{'show-panel': showPanel}">
      <ul class="navigation-list">
        <li class="navigation-list__item" v-for="(link, i) in getRoutes" :key="i + 'sss'">
          <router-link @click="showPanel=!showPanel" activeClass="active-page" class="navigation-list__link" :to="{name: link.linkName}">{{$t(link.name)}}</router-link>
        </li>
      </ul>
    </nav>
    <user-info/>
  </div>
</template>

<script setup lang="ts">
//imports
import {useStore} from '@/stores/store'
import UserInfo from "@/components/user-info.vue";
import {computed, ref} from "vue";
import type {ILink} from "@/interface/interfaces";
import {useLoginStore} from "@/stores/login";
const store = useStore()
const loginStore = useLoginStore()

//values
const showPanel = ref<boolean>(false)

//methods

//computed
const getRoutes = computed((): ILink[] => {
  let links: ILink[] = store.$state.links
  if(!loginStore.getPermissionAccess('can_view_user')) {
    links = links.filter(el=> el.name !== 'users')
  }
  return links
})
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";

.navigation {
  @include flex-center;

  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: var(--bgc-dark);

  &__button-menu {
    display: none;
  }

}

.navigation-list {
  @include flex-stroke-center;

  &__item {
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
  &__link {
    @include fonts(16px, 500);
    color: var(--color-white);
  }
}

.active-page {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .navigation {
    padding-left: 50px;
    justify-content: flex-start;
  }
}
@media (max-width: 768px) {
  .navigation-panel {
    transition: .2s linear;
    transform: translateY(-100%);
    background-color: var(--bgc-dark);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 200px;
  }
  .navigation-list {
    flex-direction: column;
    align-items: flex-start;
    padding: 50px;
    &__item {
      margin-top: 20px;
    }
    &__link {
      @include fonts(16px, 500);
      color: var(--color-white);
    }
  }
  .navigation {
    &__button-menu {
      position: relative;
      z-index: 10;
      display: block;
      width: max-content;
      height: max-content;

      svg {
        height: 25px;
        width: 25px;
        path {
          stroke: var(--color-white)
        }
      }
    }
  }
}

.show-panel {
  transform: translateY(0);
}

</style>