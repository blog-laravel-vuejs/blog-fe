<template>
    <div class="account_setting">
        <form class="col-12" @submit.prevent="updateProfile">
            <div class="row">
                <div class="colorTitle"><i class="fa-solid fa-pen-to-square"></i>Admin Account Setting</div>
            </div>
            <div class="contact-info">
                <div class="col-1"></div>
                <div class="col-5">
                    <div class="row colorTitle bigTitle"><span><i class="fa-solid fa-mobile-screen-button"></i>
                            CONTACT
                            INFORMATION</span></div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label><i class="fa-solid fa-signature"></i> Full Name</label><input required
                                v-model="admin.name" placeholder="Full Name" type="text" class="form-control">
                            <span v-if="errors.name" class="text-danger">{{ errors.name[0] }}</span>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label><i class="fa-solid fa-envelope"></i> Email</label><input v-model="admin.email"
                                placeholder="Email" disabled type="email" class="form-control">
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-12">
                            <label><i class="fa-solid fa-user-check"></i> Role</label>
                            <input class="form-control" disabled v-model="admin.role" placeholder="Role" type="text">
                        </div>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-5">
                    <!-- <div class="row colorTitle bigTitle"><span><i class="fa-solid fa-mobile-screen-button"></i> CONTACT
                            INFORMATION</span></div> -->
                    <div class="avatarUser">
                        <div class="innerAvatar">
                            <label><i class="fa-solid fa-wand-magic-sparkles"></i> Avatar</label>
                            <div class="minAvatar">
                                <input class="input-file" type="file" @change="previewImage" accept="image/*"
                                    ref="fileInput" />
                                <span class="iconClound" v-if="previewImageSrc == null"><i
                                        class="fa-solid fa-cloud-arrow-up"></i></span>
                                <div v-if="previewImageSrc" class="box-preview">
                                    <img class="preview" :src="previewImageSrc" alt="Preview" />
                                    <img src="@/assets/error.png" @click="removeFile" class="close" alt="Remove">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <br><br>
                <button type="submit" class="mt-4 btn-pers" id="login_button"><i class="fa-solid fa-floppy-disk"></i>
                    Save</button>
            </div>
        </form>
        <br>
        <hr>

        <br>
    </div>
</template>

<script>
import AdminRequest from '@/restful/AdminRequest';
import useEventBus from '@/composables/useEventBus'

const { emitEvent } = useEventBus();


export default {
    name: "AdminAccountSetting",
    data() {
        return {
            // config:config,
            admin: {
                id: null,
                email: null,
                name: null,
                role: 'admin',
                avatar: null,
                email_verified_at: null,
                created_at: null,
                updated_at: null,
                expires_in: null,
                token_type: null,
                access_token: null,
            },
            previewImageSrc: null,
            updateImage: false,
            errors: {
                name: null,
                address: null,
                date_of_birth: null,
                phone: null,
                gender: null,
            }
        }
    },
    setup() {
        document.title = "Account Setting | Blog Admin";
    },
    async mounted() {
        this.admin = JSON.parse(localStorage.getItem('admin'));
        this.previewImageSrc =this.admin.avatar;
        emitEvent('eventTitleHeader', 'Account Setting');
    },
    components: {
        // ChangePassword,
    },
    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImageSrc = e.target.result;
                    this.admin.avatar = file;
                    this.updateImage = true;
                };
                reader.readAsDataURL(file);
            } else this.removeFile();
        },
        removeFile: function () {
            this.previewImageSrc = null;
            this.admin.avatar = null;
            this.$refs.fileInput.value = '';
            this.updateImage = false;
        },
        updateProfile: async function () { // (1)
            try {
                const formData = new FormData();
                var fields = ['name'];
                if (this.updateImage) formData.append('avatar', this.admin.avatar);
                for (var field of fields) formData.append(field, this.admin[field]);
                const { data, messages } = await AdminRequest.post('admin/update', formData, true);
                this.admin.name = data.name;
                this.admin.avatar = data.avatar;
                this.previewImageSrc = this.admin.avatar;
                this.updateImage = false;

                localStorage.setItem('admin', JSON.stringify(this.admin));
                emitEvent('eventSuccess', messages[0]);
                emitEvent('updateProfileadmin', JSON.stringify(this.admin));
            } catch (error) {
                if (error.errors) {
                    this.errors = error.errors;
                } else {
                    for (let key in this.errors) {
                        this.errors[key] = null;
                    }
                }
                if (error.messages) error.messages.forEach(message => { emitEvent('eventError', message); });

            }
        }

    },
}

</script>
<style scoped>
.account_setting {
    font-weight: bold;
}

.account_setting input {
    color: #0085FF;
    font-weight: bold;
}

.account_setting label {
    color: var(--user-color);
    margin-bottom: 1px;
}

.colorTitle {
    color: gray;
}

.contact-info {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    padding: 0 15px
}

.bigTitle {
    margin-top: 10px;
    margin-bottom: 10px;
}

.groupCheckbox {
    border: 1px solid #ced4da;
    padding: 4px;
    padding-left: 10px;
    border-radius: 0.25rem;
    display: flex;
    align-content: center;
    align-items: center;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.605);
}

.avatarUser {
    display: flex;
    align-items: center;
    align-content: center;
    height: 100%;
}

.innerAvatar {
    height: 50%;
}

.minAvatar {
    background-color: #e9ecef;
    position: relative;
    text-align: center;
    width: 170px;
    height: 170px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
}

.minAvatar .preview {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 6px;
    cursor: default;
}

.minAvatar:hover {
    transition: all 0.5s ease;
    background: #E8F5E9;
}

.input-file {
    opacity: 0;
    top: 0px;
    left: 0px;
    position: absolute;
    cursor: pointer;
    width: 150px;
    height: 150px;
}

.box-preview {
    position: relative;
}

.iconClound {
    cursor: pointer;
    font-size: 60px;
    color: var(--user-color);
}

.close {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
}

@media screen and (min-width: 1201px) {

    .col-5,
    .col-2 {
        padding-right: 30px;
    }
}

@media screen and (min-width: 993px) and (max-width: 1200px) {
    .minAvatar {
        width: 150px;
        height: 150px;
    }

    .minAvatar .preview {
        width: 130px;
        height: 130px;
    }

    .col-5,
    .col-2 {
        padding-right: 2%;
    }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
    .innerContent>div {
        padding: 8px 11px;
        font-size: 15px;
    }

    .minAvatar {
        width: 110px;
        height: 110px;
    }

    .minAvatar .preview {
        width: 100px;
        height: 100px;
    }

    .contact-info .col-12 {
        padding-right: 20px;
        padding-left: 3px;
    }

    .col-5,
    .col-2 {
        padding-right: 2%;
        padding-left: 1%;
        font-size: 14px;
    }

    .form-control,
    .groupCheckbox,
    .input-group-text {
        font-size: 13px !important;
    }
    .btn-pers {
        font-size: 11px;
    }
}

@media screen and (min-width: 577px) and (max-width: 768px) {
    .contact-info{
        flex-direction: column;
    }

    .innerContent>div {
        padding: 8px 11px;
        font-size: 13px;
    }

    .minAvatar {
        width: 150px;
        height: 150px;
    }

    .minAvatar .preview {
        width: 130px;
        height: 130px;
    }

    .contact-info .col-12 {
        padding-right: 20px;
        padding-left: 3px;
    }

    .col-5,
    .col-2 {
        padding: 0 5%;
        font-size: 13px;
        max-width: 100% !important;
    }

    .col-2{
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .form-control,
    .groupCheckbox,
    .input-group-text {
        font-size: 13px !important;
    }

    .btn-pers {
        font-size: 11px;
    }
}

@media screen and (min-width: 375px) and (max-width: 576px) {
    .contact-info{
        flex-direction: column;
    }

    .innerContent>div {
        padding: 8px 11px;
        font-size: 12px;
    }

    .minAvatar {
        width: 150px;
        height: 150px;
    }

    .minAvatar .preview {
        width: 130px;
        height: 130px;
    }

    .contact-info .col-12 {
        padding-right: 20px;
        padding-left: 3px;
    }

    .col-5,
    .col-2 {
        padding: 0 5%;
        font-size: 13px;
        max-width: 100% !important;
    }

    .col-2{
        display: flex;
        justify-content: center;
        margin-top: 25px;
    }

    .form-control,
    .groupCheckbox,
    .input-group-text {
        font-size: 12px !important;
    }

    .btn-pers{
        font-size: 11px;
    }
}
</style>