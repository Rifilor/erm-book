<template>
  <div class="wrap-page">
    <div class="user-block" v-if="user">
      <div class="user-block__wrap-avatar">
        <img :src="getPathAvatar" alt="">
      </div>
      <p class="user-block__title">{{$t('username')}}</p>
      <p class="user-block__text">{{user.username}}</p>
      <p class="user-block__title">{{$t('email')}}</p>
      <p class="user-block__text">{{user.email}}</p>
      <p class="user-block__title">{{$t('role')}}</p>
      <p class="user-block__text">{{user.role ? $t(user.role.name) : ''}}</p>
      <p class="user-block__title">{{$t('date_created')}}</p>
      <p class="user-block__text">{{getDate}}</p>
    </div>
    <div class="settings-other">
      <p class="settings-other__title">{{$t('language')}}</p>

      <button class="button-gray settings-other__button" :class="{'active': locale == 'en'}" @click="changeLocale('en')">{{$t('english')}}</button>
      <button class="button-gray settings-other__button" :class="{'active': locale == 'ua'}" @click="changeLocale('ua')">{{$t('ukraine')}}</button>
      <button class="button-red settings-other__logout" @click="loginStore.logout(router)">{{$t('logout')}}</button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {useLoginStore} from "@/stores/login";
import {useRouter} from "vue-router";
import type {IUserLogin} from "@/interface/interfaces";
import moment from "moment/moment";
import {computed} from "vue";
const { locale } = useI18n();
const loginStore = useLoginStore()
const router = useRouter()
const user: IUserLogin | null = loginStore.getUserData

//methods
const changeLocale = (newLocale: string) => {
  locale.value = newLocale;
  localStorage.setItem('language', locale.value)
};

//computed
const getDate = computed(()=> {
  return moment(user.created_at).format('DD.MM.YYYY')
})
const getPathAvatar = computed(()=> {
  return user && user.avatar_url ? user.avatar_url : 'https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg'
})
</script>

<style scoped lang="scss">
@import '@/assets/style/mixins';

.wrap-page {
  display: flex;
}

.user-block {
  width: 50%;

  &__wrap-avatar {
    @include flex-center;

    width: 500px;
    height: 500px;
    border-radius: 600px;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
  &__title {
    margin-top: 10px;
    @include fonts(14px, 600)
  }
  &__text {
    margin-top: 2px;
    @include fonts(16px)
  }
}

.settings-other {
  width: 50%;
  &__title {
    @include fonts(14px, 600)
  }
  .active {
    color: var(--color-dark);
  }
  &__button {
    &:nth-child(2) {
      margin-top: 15px;
    }
    &:nth-child(3) {
      margin-top: 7px;
    }
    display: block;
  }
  &__logout {
    @include fonts(16px, 600);
    position: absolute;
    top: 70px;
    right: 50px;
  }
}

@media (max-width: 1024px) {
  .user-block {
    &__wrap-avatar {
      width: 200px;
      height: 200px;
    }
  }
  .settings-other {
    &__button {
      &:nth-child(2) {
        margin-top: 30px;
      }
      &:nth-child(3) {
        margin-top: 20px;
      }
    }
  }
}

@media (max-width: 768px) {
  .wrap-page {
    flex-direction: column;
    justify-content: flex-start;
  }
  .user-block {
    width: 100%;
  }
  .settings-other {
    width: 100%;
    margin-top: 30px;
    &__button {
      &:nth-child(2) {
        margin-top: 20px;
      }
      &:nth-child(3) {
        margin-top: 15px;
      }
    }
  }
}

@media (max-width: 425px) {
  .settings-other {
    @include flex-direction-column-center
  }
  .user-block {
    @include flex-direction-column-center
  }
}
</style>