<template>
    <div>
        <div id="big">
            <div class="bigContainer">
                <div class="modal fade" id="modal-view-detail-article" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content custom-modal-width">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-blog"></i>
                                    Detail Article</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="text-danger"><i
                                            class="fa-regular fa-circle-xmark"></i></span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form @submit.prevent="detailArticle()">
                                    <div id="auth">
                                        <div class="auth-info">
                                            <strong> <img :src="article.avatar_user" alt="">
                                                {{ article.name_user }} </strong>
                                        </div>
                                        <div class="created-time">
                                            <p> <i class="fa-solid fa-clock"></i> Đã đăng vào lúc:
                                                {{ formatDate(article.created_at) }} </p>
                                        </div>
                                    </div>
                                    <br>
                                    <div id="article">
                                        <h1 id="title"><strong>{{ article.title }}</strong></h1>
                                        <div class="vueq">

                                            <quill-editor v-model:value="state.content" :options="state.editorOption"
                                                :disabled="state.disabled" />
                                        </div>
                                        <br>
                                        <p>Search number : {{ article.search_number_article }}</p>
                                        <p>Is Article accept ?  {{ this.article.is_accept ? "Yes" :"No" }}</p>
                                    </div>
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script scoped>

// // import BaseRequest from '@/core/BaseRequest';
import useEventBus from '@/composables/useEventBus'
const { emitEvent, onEvent } = useEventBus();

// import router from './../router/routes'
import { reactive } from "vue";

export default {
    name: "DetailArticle",
    data() {
        return {
            article: {
                id: null,
                id_user: null,
                auth: '',
                title: '',
                content: '',
                search_number: null,
                thumbnail: '',
                is_accept: null
            },
            user: null,
           
        }
    },
    setup() {
        const state = reactive({
            content: "<p></p>",
            _content: "",
            editorOption: {
                placeholder: "",
                modules: {
                    toolbar: false, 
                    // 
                },
                theme: "snow",
            },
            disabled: true,
        });
        return {
            state,
        };
    },
    computed() {

    },
    mounted() {
        emitEvent('eventTitleHeader', 'Detail Article');
       
        onEvent('selectArticle', (article) => {
            this.article = article;
            this.state.content = this.article.content;
             console.log(this.article);
        });
    },
    methods: {
        formatDate: function (date) {
            const formattedDate = new Date(date);

            const day = formattedDate.getDate();
            const month = formattedDate.getMonth() + 1;
            const year = formattedDate.getFullYear();

            const formattedDateString = `${day}/${month}/${year}`;

            return formattedDateString;
        },
    }
}
</script>

<style scoped>
/* #big{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
} */
#article{
    padding: 10px;
    width: 100%;
}

.custom-modal-width {
    width: 55vw;
    max-width: none;
}

#content {
    height: 350px;
}

.modal.fade.show {
    padding-left: 0px;
}

.modal-content {
    margin: 80px auto;
    border-radius: 10px;
}
#auth {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.auth-info {
    display: flex;
    align-items: center;
}
.created-time {
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.auth-info img {
    width: 32px;
    /* Đặt kích thước cụ thể cho ảnh để tránh chiếm quá nhiều không gian */
    height: 32px;
    /* Khoảng cách giữa ảnh và tên người dùng */
    margin-right: 10px;
    border-radius: 50%;
    /* Tùy chọn: Làm cho ảnh tròn nếu là ảnh đại diện */
}

.auth-info strong {
    font-weight: bold;
    display: flex;
    align-items: center;
    color: blue;
}
.created-time p {
    margin: 0;
    /* Xóa khoảng cách mặc định của <p> */
}

h1 > strong{
    font-size: 25px;
    margin-bottom: 20px;
}

.contents {
    width: 100%;
}

</style>