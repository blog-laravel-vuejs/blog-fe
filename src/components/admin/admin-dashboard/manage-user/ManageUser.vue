<template>
    <div id="main">
        <div class="pr-1">
            <div class="input-group ">
                <button content="Add Account User" v-tippy data-toggle="modal" data-target="#addUser"
                    type="button" class="btn btn-success"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <AddUser></AddUser>
    </div>
</template>
<script>

import AddUser from '@/components/admin/admin-dashboard/manage-user/AddUser.vue';
import useEventBus from '@/composables/useEventBus'
const { emitEvent } = useEventBus();



export default {
    name: "ManageUser",
    setup() {
        document.title = "Manager Account User| Blog"
    },
    components: {
        AddUser,
    },
    mounted() {
        emitEvent('eventTitleHeader', 'Manage Account');

    }
}
</script>
<style scoped>
   
</style>
