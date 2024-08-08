<template>
  <div class="wrap-page" v-if="bookEdit">
    <book-edit-form :edit="false" v-model="bookEdit" @save="create"></book-edit-form>
    <transition name="modal-fade">
      <modal-info v-if="createModal" @close="closeSaveModal" title="notifications" text="book_add"></modal-info>
    </transition>
  </div>
</template>

<script setup lang="ts">
//imports
import BookEditForm from "@/components/books/book-edit-form.vue";
import type {IBook} from "@/interface/interfaces";
import {ref} from "vue";
import {useMockStore} from "@/stores/mockSrore";
import {useRouter} from "vue-router";
import ModalInfo from "@/components/modal/modal-info.vue";
const mockStore = useMockStore()
const router = useRouter()

//values
const bookEdit = ref<IBook>({
  id: Date.now(),
  title: "",
  author: "",
  publicationDate: null,
  genre: "",
  pages: 0,
  language: "",
  coverImageUrl: "",
  summary: "",
})
const createModal = ref<boolean>(false)

//methods
const create = async (): Promise<void> => {
  if(bookEdit.value) {
    let res: boolean = await mockStore.addNewBook(bookEdit.value)
    if(res) {
      createModal.value = true
    }
  }
}
const closeSaveModal = () => {
  createModal.value = false
  router.push({name: 'books'})
}

//hook
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