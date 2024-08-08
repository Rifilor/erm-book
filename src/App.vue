<template>
  <header>
    <transition name="slide-down">
      <navigation-panel v-if="showNavigation"></navigation-panel>
    </transition>
  </header>
    <main>
      <transition :name="store.$state.transitionName" mode="out-in">
        <router-view :key="route.path"  />
      </transition>
    </main>

</template>

<script setup lang="ts">
//imports
import NavigationPanel from "@/components/navigation-panel.vue";
import {computed, onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "@/stores/store";
import {storeToRefs} from "pinia";
import {useMockStore} from "@/stores/mockSrore";
import type {IFromSaveData} from "@/interface/interfaces";
import {useI18n} from "vue-i18n";
const route = useRoute()
const store = useStore()
const mockStore = useMockStore()
const { locale } = useI18n();

//values
const {books, users} = storeToRefs(mockStore)

//methods
const saveDataBeforeUnload = (): void => {
  const formSave: IFromSaveData = {
    books: books.value,
    users: users.value,
  }
  localStorage.setItem('saveData', JSON.stringify(formSave))
};

//computed
const showNavigation = computed((): boolean => {
  return route.name !== 'login'
})



//hook
onMounted(()=> {
  if(localStorage.getItem('saveData')) {
    const savedData = JSON.parse(''+localStorage.getItem('saveData')) as IFromSaveData
    books.value = savedData.books
    users.value = savedData.users
    console.log('savedData', savedData)

  }
  if(localStorage.getItem('language')) {
    locale.value = ''+localStorage.getItem('language')
  }
  window.addEventListener('beforeunload', saveDataBeforeUnload);
})
onUnmounted(()=> {
  window.removeEventListener('beforeunload', saveDataBeforeUnload);
})

</script>

<style scoped lang="scss">

.login-enter-active, .login-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.login-enter, .login-leave-to {
  opacity: 0;
  transform: scale(2);
}

.page-enter-active, .page-leave-active {
  transition: all 0.3s linear;
}

.page-enter-active {
  transform: translateY(100%);
}

.page-enter {
  transform: translateY(100%);
  //opacity: 1;
}

.page-leave-to {
  transform: translateY(-100%);
  //opacity: 0;
}

.page-enter-to {
  transform: translateY(0%);
  //opacity: 1;
}
</style>
