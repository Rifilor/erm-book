<template>
  <div class="user" v-if="userData">
    <p class="user__username">{{userData.username}}</p>
    <p class="user__role">({{$t(userData.role.name)}})</p>
    <div class="user__wrap-avatar">
      <img class="user__avatar" :src="getAvatarUrl" alt="avatar">

    </div>
  </div>
</template>

<script setup lang="ts">
//imports
import {useLoginStore} from "@/stores/login";
import {computed} from "vue";
import type {IUserLogin} from "@/interface/interfaces";

const loginStore = useLoginStore()

//values
const userData: IUserLogin | null = loginStore.getUserData

//computed
const getAvatarUrl = computed((): string => {
  return userData && userData.avatar_url ? userData.avatar_url: 'https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg'
})

</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
  .user {
    position: absolute;
    right: 20px;
    @include flex-center;

    &__wrap-avatar {
      @include flex-center;

      border: 1px solid var(--color-border);
      width: 35px;
      height: 35px;
      border-radius: 50px;
      overflow: hidden;
      margin-left: 15px;
    }
    &__avatar {
      height: 100%;
    }

    &__username {
      @include fonts(16px, 500);
      @include overflow-text;
      max-width: 200px;

      color: var(--color-white)

    }
    &__role {
      @include fonts(16px, 400);

      color: var(--color-white);
      margin-left: 5px;
    }
  }

@media (max-width: 768px) {
  .user {
    &__username {
      max-width: 90px;
    }
  }
}
</style>