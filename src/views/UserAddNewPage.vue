<template>
  <div class="wrap-page">
    <user-edit-form :edit="false" v-model="userEdit" @save="create" />
    <transition name="modal-fade">
      <modal-info v-if="createModal" @close="closeSaveModal" title="notifications" text="user_add"></modal-info>
    </transition>
  </div>
</template>

<script setup lang="ts">
//imports
import UserEditForm from "@/components/users/user-edit-form.vue";
import {IUser} from "@/interface/interfaces";
import {ref} from "vue";
import {useMockStore} from "@/stores/mockSrore";
import ModalInfo from "@/components/modal/modal-info.vue";
import {useRouter} from "vue-router";
const mockStore = useMockStore()
const router = useRouter()

//value
const userEdit = ref<IUser>({
  id: Date.now(),
  username: '',
  email: '',
  role: 'user',
  password: '',
  avatar_url: '',
  created_at: new Date(),
});
const createModal = ref<boolean>(false)


//methods
const create = async (): Promise<void> => {
  if(userEdit.value) {
    let res: boolean = await mockStore.addNewUser(userEdit.value)
    if(res) {
      createModal.value = true
    }
  }
}
const closeSaveModal = (): void => {
  createModal.value = false
  router.push({name: 'users'})
}


</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.wrap-page {
  @include flex-direction-column-center;
}

@media (max-width: 560px) {
  .wrap-page {
    justify-content: flex-start;
  }
}
</style>