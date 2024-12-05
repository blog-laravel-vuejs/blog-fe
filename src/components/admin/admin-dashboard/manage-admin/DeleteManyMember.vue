<template>
    <div>
        <div class="modal fade" ref="deleteManyMemberRef" id="deleteManyMember" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-triangle-exclamation"></i>
                            Warning</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fa-regular fa-circle-xmark"></i></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning" role="alert">
                            <p>Warning: These people will be moved to <strong style="color:red">Deleted </strong>
                                from the system !</p>
                            <div v-for="(member, index) in members" :key="index">
                                <li class="mb-2" v-if="selectedMembers.includes(member.id)">
                                    <p>{{ index + 1 }}. Name : <strong>{{ member.name }}</strong></p>
                                    <div class="pl-8">
                                        <p>Email : <strong>{{ member.email}}</strong></p>
                                        <p>Role : <strong>{{ member.role }}</strong></p>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" ref="closeButton"
                            id="close">Close</button>
                        <button type="button"
                            :class="{ 'btn': true, 'btn-outline-danger': false, 'btn-outline-success': true }"
                            @click="deleteManyMember">
                            <i :class="{ 'fa-solid': true, 'fa-trash': false, 'fa-trash-arrow-up': true }"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import useEventBus from '@/composables/useEventBus';
import AdminRequest from '@/restful/AdminRequest';

const { emitEvent } = useEventBus();

export default {
    name: "DeleteManyMember",
    props: {
        selectedMembers: Array,
        members: Object,
    },
    methods: {
        deleteManyMember: async function () {
            const selectedManagarsArray = Object.values(this.selectedMembers);
            var data = {
                ids_member: selectedManagarsArray,
            }
            try {
                const { messages } = await AdminRequest.post('admin/delete-many-member', data, true);
                
                emitEvent('eventRegetMembers', '');

                emitEvent('eventSuccess', messages[0]);
                this.$refs.deleteManyMemberRef.click(); // C1
                // const closeButton = this.$refs.closeButton;
                // closeButton.click();
            }
            catch (error) {
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
    }
}
</script>

<style scoped>
.modal-header .close {
    outline: none;
}

.modal-dialog {
    max-width: 650px;
}

@media screen and (min-width: 993px) and (max-width: 1200px) {
    .modal-dialog {
        max-width: 400px;
        margin: 10px auto;
        font-size: 12px;
    }

    .modal-header {
        padding: auto;
    }

    .modal-header .close {
        font-size: 20px;
    }

    .btn {
        font-size: 13px;
    }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
    .modal-dialog {
        max-width: 350px;
        margin: 10px auto;
        font-size: 11px;
        ;
    }

    .modal-header {
        padding: auto;
    }

    .modal-header .close {
        font-size: 18px;
    }

    .btn {
        font-size: 12px;
    }

    .modal-body {
        padding: 14px 14px 0 14px;
    }
}

@media screen and (min-width: 577px) and (max-width: 768px) {
    .modal-dialog {
        max-width: 310px;
        margin: 10px auto;
        font-size: 10px;
    }

    .modal-header {
        padding: auto;
    }

    .modal-header .close {
        font-size: 11px;
    }

    .btn {
        font-size: 10px;
    }

    .modal-body {
        padding: 14px 14px 0 14px;
    }

    .alert {
        padding: 8px;
    }
}

@media screen and (min-width: 425px) and (max-width: 575px) {
    .modal-dialog {
        max-width: 260px;
        margin: 10px auto;
        font-size: 8px;
        ;
    }

    .modal-header,
    .modal-footer {
        padding: 5px 5px;
    }

    .modal-header .close {
        font-size: 11px;
    }

    .btn {
        font-size: 8px;
    }

    .modal-body {
        padding: 12px 12px 0 12px;
    }

    .alert {
        padding: 8px;
    }

    .pl-8 {
        padding-left: 8px;
    }
}

@media screen and (min-width: 375px) and (max-width: 424px) {
    .modal-dialog {
        max-width: 240px;
        margin: 10px auto;
        font-size: 9px;
        ;
    }

    .modal-header,
    .modal-footer {
        padding: 5px 5px;
    }

    .modal-header .close {
        font-size: 9px;
    }

    .btn {
        font-size: 7px;
    }

    .modal-body {
        padding: 11px 11px 0 11px;
    }

    .alert {
        padding: 6px 10px;
    }

    .pl-8 {
        padding-left: 6px;
    }
}
</style>