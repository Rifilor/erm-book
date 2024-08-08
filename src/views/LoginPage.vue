<template>
  <div class="login-page wrap-page">
    <img class="login-page__logo" src="../assets/image/logo.svg" alt="">
    <h3 class="login-page__logo-title">Books Site</h3>
    <form class="login-form" @submit.prevent="login">
      <div class="block-input">
        <label class="block-input__label" for="email">{{$t('email')}}:</label>
        <input
            class="block-input__input input-dark"
            type="email"
            id="email"
            v-model="email"
            @input="validateEmail"
            required
        />
        <span v-if="emailError" class="block-input__error">{{ $t('error_email') }}</span>
      </div>

      <div class="block-input">
        <label class="block-input__label" for="password">{{$t('password')}}:</label>
        <input
            class="block-input__input input-dark"
            type="password"
            id="password"
            v-model="password"
            required
        />
      </div>


      <button class="button-main" type="submit">{{$t('login')}}</button>
    </form>

    <transition name="modal-fade">
      <modal-info v-if="errorModal" @close="errorModal = false" title="error_text" text="error_wrong"></modal-info>
    </transition>
  </div>
</template>

<script lang="ts" setup>
//imports
import {onMounted, ref} from 'vue';
import {useLoginStore} from '@/stores/login'
import {useStore} from "@/stores/store";
import {useRouter} from "vue-router";
import ModalInfo from "@/components/modal/modal-info.vue";
const loginStore = useLoginStore()
const router = useRouter()
const store = useStore()

//values
const email = ref<string>('');
const password = ref<string>('');
const errorModal = ref<boolean>(false)

//methods
const emailError = ref<boolean>(false);

const validateEmail = (): void => {
  if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = true;
  } else {
    emailError.value = false;
  }
};

const login = async (): Promise<void> => {
  validateEmail();

  if (!emailError.value && password.value) {
    const res: boolean = await loginStore.actionLogin({email: email.value, password: password.value})
    console.log('login', res)
    if(res) {
      router.push({name: 'books'})
      setTimeout(()=> {
        store.setTransitionName('page')
      }, 100)
    } else {
      errorModal.value = true
      email.value = ''
      password.value = ''
    }
  }
};

//hook
onMounted(()=> {
  store.setTransitionName('login')
})
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.login-page {
  @include flex-direction-column-center;

  background-color: var(--bgc-dark);
  justify-content: center;

  &__logo {
    width: 200px;
    margin-bottom: 20px;
  }
  &__logo-title {
    @include fonts(32px, 700);

    margin-bottom: 50px;
    color: var(--color-blue)
  }
}

.login-form {
  @include flex-direction-column-center;

  width: 300px;
}

.block-input {
  width: 100%;
  position: relative;

  &__label {
    @include fonts(14px);

    color: var(--color-white)
  }
  &__input {
    margin-top: 4px;
  }
  &__error {
    @include fonts(12px);

    width: 100%;
    color: var(--color-red);
    position: absolute;
    bottom: -2px;
    left: 0;
    transform: translateY(100%);
  }

  &:nth-child(2) {
    margin-top: 20px;
  }
}

.button-main {
  margin-top: 50px;
}


@media (max-width: 1024px) {
  .login-page {
    justify-content: flex-start;
  }
}
</style>


