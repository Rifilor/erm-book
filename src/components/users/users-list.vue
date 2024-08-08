<template>
  <div class="list" v-if="mockStore.filteredUsers.length">
    <user-list-title/>
    <transition-group name="fade" tag="div">
      <user-list-item
          :countAdmin="getCountAdmin"
          v-for="user in mockStore.filteredUsers"
          :key="user.id"
          :user="user"
          @delete="emit('delete', user.id)"
      />
    </transition-group>
  </div>
  <div class="" v-else>
    {{$t('list_is_empty')}}
  </div>
</template>

<script setup lang="ts">
//imports
import UserListItem from "@/components/users/user-list-item.vue";
import {useMockStore} from "@/stores/mockSrore";
import UserListTitle from "@/components/users/user-list-title.vue";
import {computed} from "vue";
const mockStore = useMockStore()

//emits
const emit = defineEmits(['delete'])

//computed
const getCountAdmin = computed((): number => {
  return mockStore.$state.users.filter(el=> el.role == 'admin').length
})
</script>

<style scoped lang="scss">
.list {
  background-color: var(--color-list);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-list-border);
  &>*:not(:last-child) {
    border-bottom: 1px solid var(--color-list-border);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>