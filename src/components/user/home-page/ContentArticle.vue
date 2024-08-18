<template>
    <div class="container">
        <div class="row">
            <div class="middle">
                <div class="content">
                    <div id="auth">
                        <div class="auth-info">
                            <strong> <img
                                    :src="this.article.avatar_user ? this.article.avatar_user : require('@/assets/avatar.jpg')"
                                    alt="">
                                {{ this.article.name_user }} </strong>
                        </div>
                        <div class="created-time">
                            <p> <i class="fa-solid fa-clock"></i> Đã đăng vào lúc:
                                {{ formatDate(this.article.created_at) }} </p>
                        </div>
                    </div>
                    <br>
                    <div id="article">
                        <h1 id="title"><strong>{{ this.article.title }}</strong></h1>
                        <div class="vueq">
                            <quill-editor v-model:value="this.article.content" :options="state.editorOption"
                                :disabled="state.disabled" />
                        </div>
                        <br>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <a href="#" @click="goToPreviousArticle" class="btn btn-success" :disabled="!hasPrevious">
                                <i class="fa-solid fa-angle-left"></i> Previous</a>
                        </div>
                        <div class="col-8"></div>
                        <div class="col-2">
                            <a href="#" @click="goToNextArticle" class="btn btn-success">Next <i
                                    class="fa-solid fa-angle-right" :disabled="!hasNext"></i></a>
                        </div>
                    </div>
                </div>
                <!-- Footer -->
                <footer class="bg-body-tertiary text-center text-lg-start">
                    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
                        © 2024 Blog Laravel Vuejs
                    </div>
                </footer>
            </div>

        </div>
    </div>
</template>

<script>
import { reactive } from "vue";
import useEventBus from '@/composables/useEventBus'
import UserRequest from '@/restful/UserRequest';
const { emitEvent,onEvent } = useEventBus();

export default {
    name: "ContentArticle",
    data() {
        return {
            article: {
            },
            oldId: null,
            articles: [],
        }
    },
    props:{
    },
    created() {
        this.getArticle();
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
    computed: {
        currentIndex() {
            return this.articles.findIndex((article) => article.id_article === this.article.id_article);
        },
        hasPrevious() {
            return this.currentIndex > 0;
        },
        hasNext() {
            return this.currentIndex < this.articles.length - 1;
            // return this.currentIndex < this.articlesLength - 1;
        }
    },
    mounted() { 
        this.checkAndGetArticle,
            onEvent('articleUpdated', (articles) => {
                this.articles = articles;
            });
    },
    components: {

    },
    methods: {
        goToPreviousArticle() {
            if (this.hasPrevious) {
                const previousArticle = this.articles[this.currentIndex - 1];
                this.navigateToArticle(previousArticle);
            }
        },
        goToNextArticle() {
            if (this.hasNext) {
                const nextArticle = this.articles[this.currentIndex + 1];
                this.navigateToArticle(nextArticle);
            }
        },
        navigateToArticle(article) {
            this.$router.push({ name: "ContentArticle", params: { id: article.id_article } });
        },
        checkAndGetArticle(){
            if(this.oldId !== this.$route.params.id){
                this.getArticle();
                this.oldId = this.$route.params.id;
            }
        },
        formatDate: function (date) {
            const formattedDate = new Date(date);

            const day = formattedDate.getDate();
            const month = formattedDate.getMonth() + 1;
            const year = formattedDate.getFullYear();

            const formattedDateString = `${day}/${month}/${year}`;

            return formattedDateString;
        },
        getArticle: async function() {
            try {
                console.log(this.$route.params.id);
                this.article.id = this.$route.params.id;
                const { data } = await UserRequest.get(`article/${this.article.id}`);
                this.article = data;
            }
            catch (error) {
                if (error.messages) emitEvent('eventError', error.messages[0]);
                this.isLoading = false;
            }
        }
    },
    watch: {
        '$route.params.id': {
            handler: 'checkAndGetArticle',
            immediate: true
        },
    }
}

</script>
<style>
.article-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left: 20px;
    cursor: pointer;
}

.category-name {
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    margin-left: 80px;
}

.nav-item {
    color: black;
    font: bold;
}

.middle {
    height: 90vh;
}

.content {
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ccc;
}

.user-container {
    display: flex;
    align-items: center;
    margin-right: 50px;
    /* Align items (image and text) vertically centered */
}

#avatar_sidebar {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 50%;
}

.user-container strong {
    font-size: 16px;
    color: blue;
    white-space: nowrap;

}

.menu-logo {
    width: 30px;
    margin: 0 10px 0 10px;
    cursor: pointer;
}

/* .nav-left{
    float: left;
    width: 30%;
    height: 300px;
    /* only for demonstration, should be removed */
/* background: #ccc;
} */
.nav-left {
    height: 90vh;
    background: #ccc;
}

.nav-left ul {
    list-style-type: none;
    /* Loại bỏ các dấu bullet */
    padding: 0;
    margin: 0;
    background: #ccc;
}

.nav-left li {
    margin-bottom: 10px;
    /* Khoảng cách giữa các mục */
}

.nav-left a.nav-item {
    display: block;
    /* Đảm bảo mỗi mục sẽ chiếm toàn bộ chiều ngang và xuống dòng */
    text-decoration: none;
    /* Loại bỏ gạch chân */
    padding: 8px 16px;
    /* Khoảng đệm xung quanh văn bản */
    color: #333;
    /* Màu chữ */
}

.nav-left a.nav-item:hover {
    background-color: green
        /* Hiệu ứng khi hover */
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
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
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

h1>strong {
    font-size: 25px;
    margin-bottom: 20px;
}
</style>