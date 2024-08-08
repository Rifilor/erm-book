<template>
  <div v-if="mockStore.filteredBooks.length">
    <transition-group class="books-list" name="fade" tag="div">
      <books-list-item
          v-for="book in mockStore.filteredBooks"
          :key="book.id"
          :book="book"
          @delete="emit('delete', book.id)"
      ></books-list-item>
    </transition-group>
  </div>
  <div class="" v-else>
    {{$t('list_is_empty')}}
  </div>

</template>

<script setup lang="ts">
//imports
import BooksListItem from "@/components/books/books-list-item.vue";
import {useMockStore} from "@/stores/mockSrore";
const mockStore = useMockStore()

//emits
const emit = defineEmits(['delete'])

//value

//methods

</script>


<style scoped lang="scss">
  .books-list {
    display: flex;
    flex-wrap: wrap;
    @media (min-width: 1025px) {
      &>* {
        width: calc((100% - 100px) / 6);
      }
      &>*:not(:nth-child(6n+6)) {
        margin-right: 20px;
      }
      &>*:not(:nth-child(-n+6)) {
        margin-top: 20px;
      }
    }

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }
  .fade-enter-active {
    opacity: 0;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave-to {
    opacity: 0;
  }

  @media (min-width: 769px ) and (max-width: 1024px) {
    .books-list {
      &>* {
        width: calc((100% - 80px) / 4);
      }
      &>*:not(:nth-child(4n+4)) {
        margin-right: 20px;
      }
      &>*:not(:nth-child(-n+4)) {
        margin-top: 20px;
      }
    }

  }
  @media (max-width: 768px) {
    .books-list {
      &>* {
        width: calc((100% - 20px) / 2);
      }
      &>*:not(:nth-child(2n+2)) {
        margin-right: 20px;
      }
      &>*:not(:nth-child(-n+2)) {
        margin-top: 20px;
      }
    }
  }
</style>