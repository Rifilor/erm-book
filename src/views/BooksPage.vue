<template>
  <div class="wrap-page book-page">
    <div class="panel-additional">
      <input type="text" class="search panel-additional__search" @change="saveFilters" v-model="searchBooks" :placeholder="$t('search')">
     <div class="wrap-small-screen" :class="{'show-filter': showFilter}">
       <p class="panel-additional__text">{{$t('pages_from')}}: </p>
       <input class="panel-additional__input-number" type="text" @change="saveFilters" v-model="pagesFrom" @input="pagesFrom = Number((''+pagesFrom).replace(/[^\d]/g,''))">
       <p class="panel-additional__text">{{$t('to')}}: </p>
       <input class="panel-additional__input-number" type="text" @change="saveFilters" v-model="pagesTo" @input="pagesTo = Number((''+pagesTo).replace(/[^\d]/g,''))">
       <p class="panel-additional__text">{{$t('publication_date_from')}}: </p>
       <input class="panel-additional__date" type="date" @change="saveFilters" v-model="publicationDateFrom">
       <p class="panel-additional__text">{{$t('to')}}: </p>
       <input class="panel-additional__date" type="date" @change="saveFilters" v-model="publicationDateTo">
       <p class="wrap-small-screen__text-modal">{{$t('filter')}}</p>
       <button class="wrap-small-screen__button-close" @click="showFilter = false">
         <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <g>
              <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512     512,452.922 315.076,256   "/>
            </g>
          </g>
          </svg>
       </button>
     </div>
      <button class="panel-additional__filter-small-screen button-gray" @click="showFilter = true">
        Filter
        <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z" fill="#000000"/>
        </svg>
      </button>

      <button class="panel-additional__clear button-red" @click="clearFilter">{{$t('clear')}}</button>
      <router-link :to="{name: 'Add new book'}" class="panel-additional__button-add button-main">{{$t('add_new_book')}}</router-link>
    </div>
    <books-list @delete="(id)=> {deleteBookId = id}" class="book-page__list"></books-list>
    <transition name="modal-fade">
      <modal-delete v-if="deleteBookId" @close="deleteBookId = null" @delete="deleteBookAccept" title="delete_book" text="are_your_sure_delete_book"></modal-delete>
    </transition>
  </div>
</template>

<script setup lang="ts">
//imports
import BooksList from "@/components/books/books-list.vue";
import {useMockStore} from "@/stores/mockSrore";
import {storeToRefs} from "pinia";
import ModalDelete from "@/components/modal/modal-delete.vue";
import {onMounted, ref} from "vue";
import type {IFormSaveBook} from "@/interface/interfaces";
const mockStore = useMockStore()

//values
const {searchBooks, pagesFrom, pagesTo, publicationDateFrom, publicationDateTo} = storeToRefs(mockStore)
const deleteBookId = ref<number | null>(null)
const showFilter = ref<boolean>(false)


//methods
const clearFilter = (): void => {
  searchBooks.value = ''
  pagesFrom.value = ''
  pagesTo.value = ''
  publicationDateFrom.value = null
  publicationDateTo.value = null
  saveFilters()
}
const deleteBookAccept = (): void => {
  if(Number.isInteger(deleteBookId.value)) {
    mockStore.deleteBookById(Number(deleteBookId.value))
  }
  deleteBookId.value = null
}
const saveFilters = (): void => {
  const formSave: IFormSaveBook = {
    searchBooks: searchBooks.value,
    pagesFrom: pagesFrom.value,
    pagesTo: pagesTo.value,
    publicationDateFrom: publicationDateFrom.value,
    publicationDateTo: publicationDateTo.value,
  }

  localStorage.setItem('filterBooks', JSON.stringify(formSave))
}

//hook
onMounted(()=> {
  if(localStorage.getItem('filterBooks')) {
    const formFilter: IFormSaveBook = JSON.parse(''+localStorage.getItem('filterBooks'))
    if(formFilter) {
      searchBooks.value = formFilter.searchBooks
      pagesFrom.value = formFilter.pagesFrom
      pagesTo.value = formFilter.pagesTo
      publicationDateFrom.value = formFilter.publicationDateFrom
      publicationDateTo.value = formFilter.publicationDateTo
    }
  }
})

</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";

.wrap-page {
  background-color: #ffffff;
}

.book-page {
  &__list {
    margin-top: 20px;
  }
}

.wrap-small-screen {
  @include flex-stroke-center;

  &__text-modal, &__button-close {
    display: none;
  }
}


.panel-additional {
  @include flex-stroke-center;
  flex-wrap: wrap;

  &__search {
    width: 250px;

  }
  &__text {
    margin-left: 10px;
    margin-right: 5px;
    @include fonts(13px, 600)
  }
  &__input-number {
    background-color: transparent;
    width: 50px;
  }
  &__date {
    width: 130px;
  }
  &__clear {
    margin-left: 15px;
  }
  &__button-add {
    margin-left: auto;
    width: 150px;
  }
  &__filter-small-screen {
    display: none;
  }
}

@media (max-width: 1220px) {
  .panel-additional {
    &__search {
      width: 150px;
    }
    &__date {
      width: 100px;
    }
    &__button-add {
      width: 120px;
    }
  }
}

@media (max-width: 1024px) {
  .wrap-small-screen {
    //display: none;
    transition: .3s linear;
    transform: translateX(-100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--color-white);
    padding: 60px 20px 20px 20px;
    border-right: 1px solid var(--color-border);

    width: 350px;
    height: 100%;
    &>* {
      width: 100%;
      margin-left: 0;
    }

    &__text-modal {
      position: absolute;
      display: block;
      top: 20px;
      @include fonts(18px, 600);
    }
    &__button-close {
      opacity: 0.6;
      position: absolute;
      top: 20px;
      right: 20px;
      display: block;
      width: max-content;
      height: max-content;
      svg {
        width: 20px;
        height: 20px;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  .panel-additional {
    &__text {
      margin-bottom: 5px;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
    &__filter-small-screen {
      margin-left: 10px;
      @include flex-center;

      svg {
        margin-left: 5px;
        width: 20px;
        height: 20px;
      }
    }
  }
}

.show-filter {
  transform: translateX(0);
}

@media (max-width: 500px) {
  .panel-additional {
    position: relative;
    padding-bottom: 30px;

    &__filter-small-screen {
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 0;
    }

    &__clear {
      position: absolute;
      bottom: 1px;
      left: 70px;
    }
    &__search {
      width: 50%;
    }
  }
  .wrap-small-screen {
    width: 100%;
  }
}

</style>