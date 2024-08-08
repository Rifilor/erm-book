<template>
  <div class="wrap-page" v-if="bookEdit">
    <book-edit-form :edit="true" v-model="bookEdit" @save="save"></book-edit-form>
    <transition name="modal-fade">
      <modal-info v-if="saveModal" @close="closeSaveModal" title="notifications" text="book_change"></modal-info>
    </transition>
  </div>
</template>

<script setup lang="ts">
//imports
import BookEditForm from "@/components/books/book-edit-form.vue";
import type {IBook} from "@/interface/interfaces";
import {onMounted, ref} from "vue";
import {useMockStore} from "@/stores/mockSrore";
import {useRoute, useRouter, } from "vue-router";
import ModalInfo from "@/components/modal/modal-info.vue";
const mockStore = useMockStore()
const route = useRoute()
const router = useRouter()

//values
const bookEdit = ref<IBook | null>(null)
const saveModal = ref<boolean>(false)

//methods
const save = async (): Promise<void> => {
  if(bookEdit.value) {
    let res: boolean = await mockStore.editBook(bookEdit.value)
    if(res) {
      saveModal.value = true
    }
  }
}
const closeSaveModal = () => {
  saveModal.value = false
  router.push({name: 'books'})
}

//hook
onMounted(async ()=> {
  bookEdit.value = await mockStore.getBookById(''+route.params.id)
})
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.wrap-page {
  @include flex-direction-column-center;
}
@media (max-width: 560px) {
  .wrap-page {
    justify-content: flex-start;
  }
}
</style>