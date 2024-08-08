<template>
  <div class="book">
    <button class="book__button-edit" v-on:click="clickEdit" v-if="loginStore.getPermissionAccess('can_edit_book')">
      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 21H12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="book__button-delete" v-on:click="emit('delete')" v-if="loginStore.getPermissionAccess('can_remove_book')">
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
    <div class="book__click-zone" @click="clickItem"></div>
    <img class="book__img" :src="getPathImg" alt="book-image">
    <h3 class="book__title" :title="book.title">{{book.title}}</h3>
    <p class="book__author" :title="book.author"><span>{{$t('author')}}:</span> {{book.author}}</p>
    <p class="book__publication-date" :title="getDatePublication"><span>{{$t('publication_date')}}:</span> {{getDatePublication}}</p>
    <p class="book_pages" :title="''+book.pages"><span>{{$t('pages')}}:</span> {{book.pages}}</p>
    <p class="book__description" :title="book.summary">{{book.summary}}</p>
  </div>
</template>

<script setup lang="ts">
//imports
import moment from 'moment'
import type {IBook} from "@/interface/interfaces";
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useLoginStore} from "@/stores/login";
const router = useRouter()
const loginStore = useLoginStore()
//props
const props = defineProps<{
  book: IBook
}>()

//emits
const emit = defineEmits(['delete'])

//methods
const clickItem = (): void => {
  router.push({name: 'Book Details', params: {id: props.book.id}})
}
const clickEdit = (): void => {
  router.push({name: 'Book Edit', params: {id: props.book.id}})
}

//computed
const getPathImg = computed((): string=> {
  return props.book.coverImageUrl ? props.book.coverImageUrl : 'https://m.media-amazon.com/images/I/81QPHl7zgbL._AC_UF1000,1000_QL80_.jpg'
})
const getDatePublication = computed((): string => {
  return moment(props.book.publicationDate).format('DD.MM.YYYY')
})

</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";

.book {
  border: 1px solid var(--color-border);
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  transition: .1s linear;

  &__button-edit, &__button-delete {
    display: none;
    position: absolute;
    z-index: 10;
    top: 15px;
    right: 15px;
    padding: 10px;
    border-radius: 50px;
    background-color: var(--color-card-hover);

    svg {
      width: 25px;
      height: 25px;
    }

    transition: .1s linear;

    &:hover {
      background-color: var(--bgc-dark);
      svg {
        path {
          stroke: var(--color-white);
        }
      }
    }

    &:active {
      background-color: var(--bgc-dark);
    }
  }

  &__button-delete {
    top: 70px;
    &:hover {
      background-color: var(--bgc-dark);
      svg {
        path {
          fill: var(--color-white);
        }
      }
    }
  }

  &__click-zone {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__img {
    width: 100%;
    //height: 300px;
    height: 18.75vw;

    @media (max-width:1024px) {
      height: 200px;
    }
    @media (max-width:768px) {
      height: 45vw;
    }
  }

  &__title {
    @include fonts(16px, 700);
    @include overflow-text;
  }

  p {
    margin-top: 3px;
    @include fonts(14px);

    span {
      font-weight: 600;
    }
  }

  p:not(&__description) {
    @include overflow-text;
  }

  &__description {
    @include overflow-description;
  }

  &:hover {
    background-color: var(--color-card-hover);
    border-color: var(--color-main);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5);
    transform: scale(1.02);

    .book__button-edit {
      @include flex-center;
    }
    .book__button-delete {
      @include flex-center;
    }
  }
}

@media (max-width: 1024px) {
  .book {
    &__button-edit {
      display: none !important;
    }
    &__button-delete {
      display: none !important;
    }
  }
}
</style>
