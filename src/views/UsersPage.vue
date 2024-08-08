<template>
  <div class="wrap-page user-page">
    <div class="panel-additional">
      <input type="text" class="search panel-additional__search" @change="saveFilters" v-model="searchUser" :placeholder="$t('search')">
      <p class="panel-additional__text">{{$t('role')}}: </p>
      <select class="panel-additional__select" v-model="selectedRole" @change="saveFilters">
        <option v-for="role in mockStore.$state.roles" :key="role.id" :value="role.name">
          {{ $t(role.name) }}
        </option>
      </select>
      <button class="panel-additional__clear button-red" @click="clearFilter">{{$t('clear')}}</button>
      <router-link :to="{name: 'Add new user'}" class="panel-additional__button-add button-main">{{$t('add_new_user')}}</router-link>
    </div>
    <users-list @delete="clickDelete" class="user-page__list"></users-list>
    <transition name="modal-fade">
      <modal-delete v-if="deleteUserId" @close="deleteUserId = null" @delete="deleteUserAccept" title="delete_user" text="are_your_sure_delete_user"></modal-delete>
    </transition>
  </div>
</template>

<script setup lang="ts">
//imports
import {storeToRefs} from "pinia";
import {useMockStore} from "@/stores/mockSrore";
import UsersList from "@/components/users/users-list.vue";
import ModalDelete from "@/components/modal/modal-delete.vue";
import {onMounted, ref} from "vue";
import type {IFormSaveUserFilter} from "@/interface/interfaces";
const mockStore = useMockStore()

//value
const {searchUser, selectedRole} = storeToRefs(mockStore)
const deleteUserId = ref<number | null>(null)

//methods
const deleteUserAccept = (): void => {
  if(deleteUserId.value) {
    mockStore.deleteUserById(deleteUserId.value)
  }
  deleteUserId.value = null
}
const clickDelete = (id: number): void => {
  deleteUserId.value = id;
}
const clearFilter = (): void => {
  searchUser.value = ''
  selectedRole.value = ''
  saveFilters()
}
const saveFilters = (): void => {
  const formSave: IFormSaveUserFilter = {
    searchUser: searchUser.value,
    selectedRole: selectedRole.value,
  }
  localStorage.setItem('filterUsers', JSON.stringify(formSave))
}

//hook
onMounted(()=> {
  if(localStorage.getItem('filterUsers')) {
    const formFilter: IFormSaveUserFilter = JSON.parse(''+localStorage.getItem('filterUsers'))
    if(formFilter) {
      searchUser.value = formFilter.searchUser
      selectedRole.value = formFilter.selectedRole
    }
  }
})

</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";

.panel-additional {
  @include flex-stroke-center;

  &__search {
    width: 250px;
  }
  &__text {
    margin-left: 10px;
    margin-right: 5px;
    @include fonts(13px, 600)
  }
  &__select {
    width: 200px;
  }
  &__clear {
    margin-left: 15px;
  }
  &__button-add {
    margin-left: auto;
    width: 150px;
  }
}

.user-page {
  &__list {
    margin-top: 20px;
  }
}

@media (max-width: 1024px) {
  .panel-additional {
    &__search {
      width: 150px;
    }
    &__select {
      width: 100px;
    }
    &__button-add {
      width: 120px;
    }

  }
}
@media (max-width: 540px) {
  .panel-additional {
    position: relative;
    padding-bottom: 50px;
    &__search {
      width: 50%;
    }
    &__text {
      position: absolute;
      left: 0;
      bottom: 5px;
      margin: 0;
    }
    &__select {
      width: calc(50% - 40px);
      position: absolute;
      left: 40px;
      bottom: 0;
    }
    &__clear {
      position: absolute;
      bottom: 5px;
      left: calc(50% + 5px);
    }
  }
}


</style>