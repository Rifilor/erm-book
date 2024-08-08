<template>
  <div class="wrap-page">
    <user-edit-form v-if="userEdit" :edit="true" v-model="userEdit" @save="save" />
    <transition name="modal-fade">
      <modal-info v-if="editModal" @close="closeSaveModal" title="notifications" text="user_edit"></modal-info>
    </transition>
  </div>
</template>

<script setup lang="ts">
//imports
import UserEditForm from "@/components/users/user-edit-form.vue";
import {IUser} from "@/interface/interfaces";
import {onMounted, ref} from "vue";
import {useMockStore} from "@/stores/mockSrore";
import ModalInfo from "@/components/modal/modal-info.vue";
import {useRoute, useRouter} from "vue-router";
const mockStore = useMockStore()
const router = useRouter()
const route = useRoute()

//value
const userEdit = ref<IUser | null>(null);
const editModal = ref<boolean>(false)


//methods
const save = async (): Promise<void> => {
  if(userEdit.value) {
    let res: boolean = await mockStore.editUserById(JSON.parse(JSON.stringify(userEdit.value)))
    if(res) {
      editModal.value = true
    }
  }
}
const closeSaveModal = (): void => {
  editModal.value = false
  router.push({name: 'users'})
}

//hook
onMounted(async ()=> {
  userEdit.value = await mockStore.getUserById(''+route.params.id)
})


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