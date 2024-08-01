<template>
    <div id="update-category">
        <div class="modal fade" ref="changeRoleRef" id="changeRole" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="ChangeRole()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"><i class="fa-brands fa-critical-role"></i> Change
                                    Role for <strong>{{ member.name }}</strong></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="groupCheckbox">
                                <div class="form-check form-check-inline">
                                    <input required v-model="member.role" class="form-check-input" type="radio"
                                        name="inlineRadioOptions" id="admin" value="admin">
                                    <label style="color: #0085FF;" class="form-check-label"
                                        for="inlineRadio1">Admin</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input required v-model="member.role" class="form-check-input" type="radio"
                                        name="inlineRadioOptions" id="superadmin" value="superadmin">
                                    <label style="color: #0085FF;" class="form-check-label" for="inlineRadio2">Super
                                        Admin</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success">Update Role</button>
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
    name: 'ChangeRole',
    data() {
        return {
            member: {
                id: null,
                role: "",   
            },
            errors: {
                role: null,
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
        ChangeRole: async function () {
            try {
                const { messages } = await AdminRequest.post(`admin/change-role/${this.member.id}`, this.member, true);
                emitEvent('eventRegetMembers', '');
                emitEvent('eventSuccess', messages[0]);
                this.$refs.changeRoleRef.click(); // C1
                
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

<style scoped>
/* css for preview image */
.containerPreview {
    /* display: flex; */
    align-items: center;
    align-content: center;
    height: 100%;
}

.innerPreview {
    display: flex;
    justify-content: center;
}

.minPreview {
    background-color: #e9ecef;
    position: relative;
    text-align: center;
    /* width: 170px; */
    /* width: 100%; */
    /* height: 170px; */
    max-height: 200px;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
}

.noPreview {
    width: 100%;
}

.havePreview {
    /* width: fit-content; */
    width: 100%;
}

.minPreview .preview {
    /* width: 150px; */
    width: 100%;
    /* height: 150px; */
    max-height: 180px;
    object-fit: cover;
    border-radius: 6px;
    cursor: default;
}

.minPreview:hover {
    transition: all 0.5s ease;
    background: #E8F5E9;
}

.inputFilePreview {
    opacity: 0;
    top: 0px;
    left: 0px;
    position: absolute;
    cursor: pointer;
    /* width: 150px; */
    width: 100%;
    height: 100%;
    /* height: 150px; */
}

.boxPreview {
    position: relative;
}

.iconCloundPreview {
    cursor: pointer;
    font-size: 60px;
    color: var(--user-color);
}

.closePreview {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
}

/* css for preview image */
</style>


<!-- <template>
    <div>
        <div id="big">
            <div class="bigContainer">
                <div class="modal fade" id="changeRole" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><strong><i
                                            class="fa-solid fa-user-pen"></i>
                                        Update Account Member</strong></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="text-danger"><i
                                            class="fa-regular fa-circle-xmark"></i></span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <form @submit.prevent="changeRole()">
                                    <div class="input-form">
                                        <input required disabled id="inputPassword" type="text" v-model="member.name">
                                        <div class="underline"></div><label><i class="fa-solid fa-signature"></i> Full
                                            Name</label>
                                    </div>
                                    <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}<br></span>
                                    <br>
                                    <div class="input-form">
                                        <input disabled required id="inputPassword" type="text" v-model="member.email">
                                        <div class="underline"></div><label><i class="fa-solid fa-envelope"></i>
                                            Email</label>
                                    </div>
                                    <span v-if="errors.email" class="text-danger">{{ errors.email[0] }}<br></span>
                                    <br>
                                    <label><i class="fa-solid fa-venus-mars"></i> Role</label>
                                    <div class="groupCheckbox">
                                        <div class="form-check form-check-inline">
                                            <input required v-model="member.role" class="form-check-input" type="radio"
                                                name="inlineRadioOptions" id="admin" value="admin">
                                            <label style="color: #0085FF;" class="form-check-label"
                                                for="inlineRadio1">Admin</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input required v-model="member.role" class="form-check-input" type="radio"
                                                name="inlineRadioOptions" id="superadmin" value="superadmin">
                                            <label style="color: #0085FF;" class="form-check-label"
                                                for="inlineRadio2">Super Admin</label>
                                        </div>
                                    </div>
                                    <span v-if="errors.gender" class="text-danger">{{ errors.gender[0] }}</span>
                                    <br>
                                    <button type="submit" class="mt-4 btn-pers" id="login_button"><i
                                            class="fa-solid fa-floppy-disk"></i> Update </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useEventBus from '@/composables/useEventBus'
import AdminRequest from '@/restful/AdminRequest';
const { emitEvent } = useEventBus();

export default {
    name: "ChangeRole",

    props: {
        memberSelected: Object
    },

    setup() {
    },

    data() {
        return {
            member: {
                name: null,
                email: null,
                role: null,
            },
            errors: {
                name: null,
                email: null,
                role: null,
            }
        }
    },

    mounted() {
        if (this.memberSelected) {
            this.member.name = this.memberSelected.name;
            this.member.email = this.memberSelected.email;
            this.member.role = this.memberSelected.role;
        }
    },

    components: {
    },

    computed: {
    },

    methods: {
        changeRole: async function () {
            try {
                const { messages } = await AdminRequest.post('admin/change-role/' + this.memberSelected.id, this.member, true);
                emitEvent('eventSuccess', messages[0]);
                for (let key in this.errors) this.errors[key] = null;
                var closePW = window.document.getElementById('changeRole');
                closePW.click();
                emitEvent('changeRoleSuccess', this.member); // 
            }
            catch (error) {
                if (error.errors) this.errors = error.errors;
                else for (let key in this.errors) this.errors[key] = null;
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
    },
    watch: {
        memberSelected: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.member = Object.assign({}, newVal);
                }
            },
        },
    },
}
</script>

<style scoped>
.modal.fade.show {
    padding-left: 0px;
}

.modal-content {
    margin-top: 100px;
    border-radius: 10px;
}

.bigContainer .input-form {
    height: 40px;
    width: 100%;
    position: relative;
}

.bigContainer .input-form input {
    height: 100%;
    width: 100%;
    border: none;
    font-size: 17px;
    border-bottom: 2px solid silver;
    outline: none !important;
}

.input-form input:focus~label,
.input-form input:valid~label {
    transform: translateY(-20px);
    font-size: 15px;
    color: var(--user-color);
}

.input-form .underline.fix2:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background: var(--user-color);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
}

.bigContainer .input-form label {
    position: absolute;
    bottom: 0px;
    left: 0;
    color: grey;
    pointer-events: none;
    transition: all 0.3s ease;
}

.input-form .underline {
    position: absolute;
    height: 2px;
    width: 100%;
    bottom: 0;
}

.input-form .underline:before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background: var(--user-color);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
}

.input-form input:focus~.underline:before,
.input-form input:valid~.underline:before {
    transform: scaleX(1);
}

@import url('https://fonts.googleapis.com/css2?family=Reem+Kufi+Ink');

#big {
    display: flex;
    position: relative;
}

.btn-pers {
    position: relative;
    left: 50%;
    padding: 1em 2.5em;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 700;
    color: #000;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    transform: translateX(-50%);
}

.btn-pers:hover {
    background-color: var(--user-color);
    box-shadow: 0px 15px 20px #80ffb5;
    color: #fff;
    transform: translate(-50%, -7px);
}

.btn-pers:active {
    transform: translate(-50%, -1px);
}

#inputPassword {
    padding-right: 26px;
}
</style> -->
