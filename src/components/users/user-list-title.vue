<template>
  <div class="user">
    <div class="user__id">#</div>
    <div class="user__avatar">
      {{$t('avatar')}}
    </div>
    <div class="user__username">
      {{$t('username')}}
    </div>
    <div class="user__email">
      {{$t('email')}}
    </div>
    <div class="user__role">
      {{$t('role')}}
    </div>
    <div class="user__created">
      {{$t('date_created')}}
    </div>
    <div class="user__edit">
    </div>
    <div class="user__delete">
    </div>
  </div>
</template>

<script setup lang="ts">
//imports

//props



</script>

<style scoped lang="scss">
@import '@/assets/style/mixins';

.user {
  display: grid;
  grid-template-columns: 30px 60px 1fr 1fr 1fr 1fr 50px 50px;
  grid-template-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    "id avatar username email role created edit delete";
  height: 40px;

  &>* {
    @include fonts(14px, 600);
    @include flex-stroke-center;
    padding: 5px;

  }

  &__id { grid-area: id; }

  &__username { grid-area: username; }

  &__email { grid-area: email; }

  &__role { grid-area: role; }

  &__avatar {
    grid-area: avatar;

  }
  &__avatar-wrap {
    @include flex-center;
    width: 25px;
    height: 25px;
    border-radius: 50px;
    overflow: hidden;
    img {
      height: 100%;
    }
  }

  &__created { grid-area: created; }
  &__edit {
    grid-area: edit;
  }
  &__delete {
    grid-area: delete;
  }
}

@media (max-width: 560px) {
  .user {
    grid-template-columns: 30px 1fr 1fr 50px 50px;
    grid-template-areas:
    "id  username  role  edit delete";

    &__email {
      display: none;
    }
    &__avatar {
      display: none;
    }
    &__created {
      display: none;
    }
  }

}



</style>