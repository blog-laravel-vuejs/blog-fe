<template>
    <div>
        <div id="big">
            <div class="bigContainer">
                <div class="modal fade" id="addArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content custom-modal-width">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><strong><i
                                            class="fa-solid fa-user-plus"></i>
                                        Add Article</strong></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="text-danger"><i
                                            class="fa-regular fa-circle-xmark"></i></span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="addArticle()">
                                    <div class="input-form">
                                        <input required id="inputPassword" type="text" v-model="article.title">
                                        <div class="underline"></div><label><i class="fa-solid fa-signature"></i>
                                            Title</label>
                                    </div>
                                    <div class="underline input-form"><label><i class="fa-solid fa-image"></i> Image
                                            cover article</label></div>
                                    <div class="containerPreview">
                                        <div class="innerPreview">
                                            <div
                                                :class="{ 'minPreview': true, 'havePreview': previewImageSrc != null, 'noPreview': previewImageSrc == null }">
                                                <input class="inputFilePreview" type="file" @change="previewImage"
                                                    accept="image/*" ref="fileInput" />
                                                <span class="iconCloundPreview" v-if="previewImageSrc == null"><i
                                                        class="fa-solid fa-cloud-arrow-up"></i></span>
                                                <div v-if="previewImageSrc" class="boxPreview">
                                                    <img class="preview" :src="previewImageSrc" alt="Preview" />
                                                    <img src="@/assets/error.png" @click="removeFile"
                                                        class="closePreview" alt="Remove">
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <br>
                                    <div class="form-select" aria-label="Default select example">
                                        <label><i class="fa-solid fa-list"></i> Category</label>
                                        <select v-model="article.id_category" class="form-control">
                                            <!-- <option value="0" selected >Select category</option> -->
                                            <option v-for="category in this.categories" :key="category.id" 
                                                :value="category.id">{{category.name}}</option>
                                        </select>
                                    </div>
                                    <br>
                                    <div class="contents">
                                        <label><i class="fa-solid fa-signature"></i>
                                            Content</label>
                                        <div></div>
                                        <div id="content">
                                            <quill-editor v-model:value="state.content" :options="state.editorOption"
                                                :disabled="state.disabled" />
                                        </div>
                                    </div>
                                    <hr>
                                    <button type="submit" class="mt-4 btn-pers" id="login_button"><i
                                            class="fa-solid fa-user-plus"></i> Add</button>
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
import { reactive } from "vue";
import useEventBus from '@/composables/useEventBus';
import UserRequest from '@/restful/UserRequest';

const { emitEvent } = useEventBus();

export default {
    name: "AddArticle",
    props: {

    },
    setup() {
        const state = reactive({
            content: "<p></p>",
            _content: "",
            editorOption: {
                placeholder: "Content",
                modules: {

                },
            },
            disabled: false,
        });
        return {
            state,
        }
    },
    data() {
        return {
            id_article: null,
            article: {
                title: null,
                thumbnail: null,
                content: null,
                id_user:null,
                id_category: null,
            },
            categories: [], 
        }
    },
    mounted() {
        document.title = "Blog App - New";
        this.getCategories();
        console.log(this.categories)
    },
    components: {
    },
    computed: {
       
    },
    methods: {
        getCategories: async function () {
            const { data } = await UserRequest.get('category/', true);
            this.categories = data;
            console.log(this.categories);
        },
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImageSrc = e.target.result;
                    this.article.thumbnail = file;
                };
                reader.readAsDataURL(file);
            } else this.removeFile();
        },
        removeFile: function () {
            this.previewImageSrc = null;
            this.article.thumbnail = null;
            this.$refs.fileInput.value = '';
        },
        addArticle: async function () {
            try {
                this.article.content = this.state.content;
                const $formData = new FormData();
                $formData.append('title', this.article.title);
                $formData.append('content', this.article.content);
                $formData.append('id_category', this.article.id_category);
                $formData.append('thumbnail', this.article.thumbnail);

                const { messages } = await UserRequest.post('article/add',$formData, true);
                emitEvent('eventSuccess', messages[0]);
                for (let key in this.errors) this.errors[key] = null;
                var closePW = window.document.getElementById('addArticle');
                closePW.click();
                this.resetData();
                emitEvent('eventRegetArticles', '');
            }
            catch (error) {
                if (error.data) emitEvent('eventError', error.data[0]);
                if (error.messages) emitEvent('eventError', error.messages[0]);
                // if (error.errors) this.errors = error.errors;
                // else for (let key in this.errors) this.errors[key] = null;
                // if (error.messages) emitEvent('eventError', error.messages[0]);
            }

        },
        
        resetData: function () {
            this.$refs.fileInput.value = '';
            this.previewImageSrc = null;
            this.article.thumbnail = null;
            this.article = {
                title: '',
                content: null,
                id_category: 0,

            }
        },
    },
    watch: {

    },
}
</script>

<style scoped>
.custom-modal-width {
    width: 55vw;
    max-width: none;
}
#content{
    height: 350px;
}

.modal.fade.show {
    padding-left: 0px;
}

.modal-content {
    margin: 80px auto;
    border-radius: 10px;
}

.bigContainer .input-form {
    height: 50px;
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
</style>
