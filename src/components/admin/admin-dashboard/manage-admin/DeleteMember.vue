<template>
    <div id="delelte-category">
        <div class="modal fade" ref="deleteMemberRef" id="deleteMember" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <form @submit.prevent="deleteMember()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"><i
                                    class="fa-solid fa-triangle-exclamation"></i>Delete Member</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-warning" role="alert">
                                Warning: Member with name is <Strong style="color:red">{{ member.name }}</Strong>
                                will be deleted!
                            </div>
                            <img :src="member.avatar" alt="">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import useEventBus from '@/composables/useEventBus';
import AdminRequest from '@/restful/AdminRequest';

const { emitEvent, onEvent } = useEventBus();

export default {
    name: 'DeleteMember',
    data() {
        return {
            member: {
                id: null,
                name: '',
                avatar: null,
            },
        }
    },
    props: {
    },

    mounted() {
        onEvent('eventSelectMember', (memberSelected) => {
            console.log(memberSelected);
            this.member = Object.assign({}, memberSelected);//Truyen value
        });
    },

    methods: {

        deleteMember: async function () {
            try {
                const { data, messages } = await AdminRequest.post(`admin/delete-member/${this.member.id}`, null, true);
                console.log(data);
                emitEvent('eventRegetMembers', '');
                emitEvent('eventSuccess', messages[0]);

                this.$refs.deleteMemberRef.click(); // C1
               
            }
            catch (error) {
                if (error.data) emitEvent('eventError', error.data[0]);
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },

    },

    setup() {

    },
    beforeCreate() {

    },
    created() {

    },
    beforeMount() {

    },

    beforeUpdate() {

    },
    updated() {

    },
    beforeUnmount() {

    },
    unmounted() {

    }
}
</script>

<style></style>