<template>
  <form @submit.prevent="handleSubmit" class="book-form">
    <div class="book-form__group">
      <label for="title" class="book-form__label">{{$t('name_book')}}:</label>
      <input type="text" id="title" v-model="bookForm.title" class="book-form__input" required />
    </div>

    <div class="book-form__group">
      <label for="author" class="book-form__label">{{$t('author')}}:</label>
      <input type="text" id="author" v-model="bookForm.author" class="book-form__input" required />
    </div>

    <div class="book-form__group">
      <label for="publicationDate" class="book-form__label">{{$t('publication_date')}}:</label>
      <input type="date" id="publicationDate" v-model="publicationDate" class="book-form__input" required />
    </div>

    <div class="book-form__group">
      <label for="genre" class="book-form__label">{{$t('genre')}}:</label>
      <input type="text" id="genre" v-model="bookForm.genre" class="book-form__input" />
    </div>

    <div class="book-form__group">
      <label for="pages" class="book-form__label">{{$t('pages')}}:</label>
      <input type="number" id="pages" v-model.number="bookForm.pages" class="book-form__input" required />
    </div>

    <div class="book-form__group">
      <label for="language" class="book-form__label">{{$t('language')}}:</label>
      <input type="text" id="language" v-model="bookForm.language" class="book-form__input" required />
    </div>

    <div class="book-form__group">
      <label for="coverImageUrl" class="book-form__label">{{$t('url_book')}}:</label>
      <input type="text" id="coverImageUrl" v-model="bookForm.coverImageUrl" class="book-form__input" />
    </div>

    <div class="book-form__group">
      <label for="summary" class="book-form__label">{{$t('description')}}:</label>
      <textarea id="summary" v-model="bookForm.summary" class="book-form__textarea"></textarea>
    </div>

    <button type="submit" class="book-form__submit button-main">{{$t(edit ? 'save' : 'create')}}</button>
  </form>
</template>

<script setup lang="ts">
//imports
import {onMounted, Ref, ref} from "vue";
import type {IBook} from "@/interface/interfaces";
import moment from 'moment'

//props
const props = defineProps<{
  edit: boolean
}>()

//emits
const emit = defineEmits(['save'])

//values
const bookForm: Ref<IBook> = ref({
  id: Date.now(),
  title: "",
  author: "",
  publicationDate: null,
  genre: "",
  pages: 0,
  language: "",
  coverImageUrl: "",
  summary: "",
});
const bookModel = defineModel<IBook>()
const publicationDate = ref<string>('')

//methods
const handleSubmit = () => {
  if(bookModel.value) {
    bookForm.value.publicationDate = new Date(publicationDate.value)
    bookModel.value = JSON.parse(JSON.stringify(bookForm.value))
    emit('save')
  }
};

//hook
onMounted(()=> {
  if(props.edit && bookModel.value) {
    bookForm.value = JSON.parse(JSON.stringify(bookModel.value))
    console.log( bookForm.value)
    if(bookModel.value) {
      publicationDate.value = moment(''+bookModel.value.publicationDate).format('YYYY-MM-DD')
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.book-form {
  @include flex-direction-column-center;
  width: 500px;

  &__group {
    width: 100%;
    &:not(:first-child) {
      margin-top: 12px;
    }
  }

  &__label {
    @include fonts(14px, 600)
  }

  &__input, &__textarea {
    margin-top: 5px;
  }

  &__submit {
    width: 200px;
    margin-top: 20px;
  }
}

@media (max-width: 560px) {
  .book-form {
    width: 100%;
  }
}
</style>
