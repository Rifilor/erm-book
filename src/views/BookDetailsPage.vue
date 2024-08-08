<template>
  <div class="wrap-page book-page" v-if="book">
    <button class="book-page__button-edit" v-on:click="clickEdit" v-if="loginStore.getPermissionAccess('can_edit_book')">
      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 21H12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="book-page__button-delete" v-on:click="clickDelete" v-if="loginStore.getPermissionAccess('can_remove_book')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 290 290" xml:space="preserve">
      <g id="XMLID_24_">
        <g id="XMLID_29_">
          <path d="M265,60h-30h-15V15c0-8.284-6.716-15-15-15H85c-8.284,0-15,6.716-15,15v45H55H25c-8.284,0-15,6.716-15,15s6.716,15,15,15    h5.215H40h210h9.166H265c8.284,0,15-6.716,15-15S273.284,60,265,60z M190,60h-15h-60h-15V30h90V60z"/>
        </g>
        <g id="XMLID_86_">
          <path d="M40,275c0,8.284,6.716,15,15,15h180c8.284,0,15-6.716,15-15V120H40V275z"/>
        </g>
      </g>
      </svg>
    </button>
    <img class="book-page__img" :src="getPathImg" alt="img-book">
    <div class="detail">
      <h1 class="detail__title" :title="book.title">{{book.title}}</h1>
      <p class="detail__author" :title="book.author"><span>{{$t('author')}}:</span> {{book.author}}</p>
      <p class="detail__author" :title="book.genre"><span>{{$t('genre')}}:</span> {{book.genre}}</p>
      <p class="detail__author" :title="book.language"><span>{{$t('language')}}:</span> {{book.language}}</p>
      <p class="detail__publication-date" :title="getDatePublication"><span>{{$t('publication_date')}}:</span> {{getDatePublication}}</p>
      <p class="detail_pages" :title="''+book.pages"><span>{{$t('pages')}}:</span> {{book.pages}}</p>
      <p class="detail__description" :title="book.summary">{{book.summary}}</p>
    </div>
    <transition name="modal-fade">
      <modal-delete v-if="deleteBookId" @close="deleteBookId = null" @delete="deleteBookAccept" title="delete_book" text="are_your_sure_delete_book"></modal-delete>
    </transition>
  </div>
  <div class="wrap-page" v-else>
    <h1>Not Found</h1>
  </div>
</template>

<script setup lang="ts">
//imports
import {onMounted, ref, computed, Ref} from "vue";
import type {IBook} from "@/interface/interfaces";
import {useRoute, useRouter} from "vue-router";
import {useMockStore} from "@/stores/mockSrore";
import moment from "moment/moment";
import {useLoginStore} from "@/stores/login";
import ModalDelete from "@/components/modal/modal-delete.vue";
const mockStore = useMockStore()
const route = useRoute()
const router = useRouter()
const loginStore = useLoginStore()

//values
const book: Ref<IBook | null> = ref(null)
const deleteBookId = ref<number | null>(null)

//methods
const clickEdit = (): void => {
  router.push({name: 'Book Edit', params: {id: route.params.id}})
}
const clickDelete = (): void => {
  deleteBookId.value = Number(route.params.id) as number
}
const deleteBookAccept = (): void => {
  if(Number.isInteger(deleteBookId.value)) {
    mockStore.deleteBookById(Number(deleteBookId.value))
  }
  deleteBookId.value = null
  router.push({name: 'books'})
}


//computed
const getPathImg = computed((): string=> {
  return book.value && book.value.coverImageUrl ? book.value.coverImageUrl : 'https://m.media-amazon.com/images/I/81QPHl7zgbL._AC_UF1000,1000_QL80_.jpg'
})
const getDatePublication = computed((): string => {
  if(book.value) {
    return moment(book.value.publicationDate).format('DD.MM.YYYY')
  }
  return ''
})

//hook
onMounted(async ()=> {
  book.value = await mockStore.getBookById(''+route.params.id)
})

</script>


<style scoped lang="scss">
@import "@/assets/style/mixins";

.book-page {
  display: flex;
  &__img {
    width: 25%;
    height: max-content;
  }
  &__button-edit {
    position: absolute;
    top: 70px;
    right: 80px;
  }
  &__button-delete {
    position: absolute;
    top: 70px;
    right: 20px;
  }

  &__button-edit, &__button-delete {
    padding: 10px;
    border-radius: 40px;
    background-color: var(--color-gray);
    opacity: 0.6;
    svg {
      width: 25px;
      height: 25px;
    }
    transition: .1s linear;
    &:hover {
      opacity: 1;
    }
  }
}

.detail {
  width: 70%;
  padding-left: 50px;

  &__title {
    @include fonts(32px, 600)
  }
  p {
    margin-top: 15px;
    @include fonts(16px);
    span {
      font-weight: 600;
    }
  }
}

@media (max-width: 768px) {
  .book-page {
    flex-direction: column;
    justify-content: flex-start;
    &__img {
      height: 270px;
      width: 200px;
    }
  }
  .detail {
    padding-left: 0;
    margin-top: 15px;
  }

}
</style>