<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="user-form__group">
      <label for="username" class="user-form__label">Username:</label>
      <input
          type="text"
          id="username"
          v-model="userForm.username"
          class="user-form__input"
          required
      />
    </div>

    <div class="user-form__group">
      <label for="email" class="user-form__label">Email:</label>
      <input
          type="email"
          id="email"
          v-model="userForm.email"
          class="user-form__input"
          required
      />
    </div>

    <div class="user-form__group">
      <label for="role" class="user-form__label">Role:</label>
      <select
          id="role"
          v-model="userForm.role"
          class="user-form__select"
          required
      >
        <option value="admin">Admin</option>
        <option value="mentor">Mentor</option>
        <option value="user">User</option>
      </select>
    </div>

    <div class="user-form__group">
      <label for="password" class="user-form__label">Password:</label>
      <input
          type="password"
          id="password"
          v-model="userForm.password"
          class="user-form__input"
          required
      />
    </div>

    <div class="user-form__group">
      <label for="avatar_url" class="user-form__label">Avatar URL:</label>
      <input
          type="url"
          id="avatar_url"
          v-model="userForm.avatar_url"
          class="user-form__input"
      />
    </div>

    <button type="submit" class="user-form__submit button-main">Submit</button>
  </form>
</template>

<script setup lang="ts">
//imports
import {onMounted, ref} from "vue";
import type {IUser} from "@/interface/interfaces";

//props
const props = defineProps<{
  edit: boolean
}>()

//emits
const emit = defineEmits(['save'])

//values
const userForm = ref<IUser>({
  id: Date.now(),
  username: '',
  email: '',
  role: 'user',
  password: '',
  avatar_url: '',
  created_at: new Date(),
});
const userModel = defineModel<IUser>()

//methods
const handleSubmit = (): void => {
  if(userModel.value) {
    userModel.value = JSON.parse(JSON.stringify(userForm.value))
    emit('save')
  }
}

//hook
onMounted(()=> {
  if(props.edit && userModel.value) {
    userForm.value = JSON.parse(JSON.stringify(userModel.value))
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.user-form {
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
  .user-form {
    width: 100%;
  }
}
</style>