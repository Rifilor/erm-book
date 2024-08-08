<template>
  <div class="user">
    <div class="user__id">{{user.id}}</div>
    <div class="user__avatar">
      <div class="user__avatar-wrap">
        <img :src="getAvatar" alt="">
      </div>
    </div>
    <div class="user__username">
      {{user.username}}
    </div>
    <div class="user__email">
      {{user.email}}
    </div>
    <div class="user__role">
      {{$t(user.role)}}
    </div>
    <div class="user__created">
      {{getDate}}
    </div>
    <div class="user__edit">
      <button @click="clickEdit">
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 21H12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="user__delete">
      <button v-if="user.role !== 'admin' || (user.role == 'admin' && countAdmin > 1)" @click="emit('delete')">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" viewBox="0 0 290 290" xml:space="preserve">
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
    </div>
  </div>
</template>

<script setup lang="ts">
//imports
import type {IUser} from "@/interface/interfaces";
import {computed} from "vue";
import moment from "moment";
import {useRouter} from "vue-router";
const router = useRouter()

//props
const props = defineProps<{
  user: IUser,
  countAdmin: number,
}>()

//emits
const emit = defineEmits(['delete'])

//methods
const clickEdit = (): void => {
  router.push({name: 'Edit user', params: {id: props.user.id}})
}

//computed
const getDate = computed(()=> {
  return moment(props.user.created_at).format('DD.MM.YYYY')
})
const getAvatar = computed(()=> {
  return props.user.avatar_url ? props.user.avatar_url : 'https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg'
})


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

  height: 32px;

  &>* {
    @include fonts(14px, 500);
    @include flex-stroke-center;
    @include overflow-text;
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
  &__edit, &__delete {
    @include flex-center;
    button {
      opacity: 0.6;
      transition: .1s linear;
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