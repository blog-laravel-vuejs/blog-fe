<template>
    <div class="container-fluid">
        <!-- Header -->
        <div class="menu">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#" @click="loadPage"><img src="@/assets/logo.png" alt="menu-logo"
                            class="menu-logo icon" style="" @click="compadmin"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li v-for="category in categories" :key="category.id" class="nav-item">
                                <a class="nav-link" aria-current="page" href="#" :value="category.id"
                                    @click="selectCategory(category)">
                                    <strong>{{ category.name }}</strong>
                                </a>
                            </li>
                        </ul>

                        <a class="nav-link btn btn-success mr-5" href="#" content="Add Article" v-tippy
                            data-toggle="modal" data-target="#addArticle">Add Article</a>
                        <form class="d-flex mr-5" role="search" @submit.prevent="searching">
                            <input v-model="search" class="form-control me-2" type="search" placeholder="Search"
                                aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <li class="nav-item dropdown ml-15">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <div class="user-container">
                                    <img id="avatar_sidebar"
                                        :src="user.avatar ? user.avatar : require('@/assets/avatar.jpg')"
                                        alt="Avatar User"><strong>{{ user.name }}</strong>
                                </div>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" @click="accountSetting">Account Setting</a></li>
                                <li><a class="dropdown-item" href="#">Personal Interface</a></li>
                                <li><a class="dropdown-item" href="#" @click="myArticle">My Article</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#" @click="logout"> <i class="bx bx-log-out"
                                            id="log_out"></i> Log out</a></li>
                            </ul>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
        <!-- Body -->
        <div class="row">
            <div class="col-2">
                <div class="nav-left">
                    <div><strong class="category-name" :value="category.id">{{ category.name }} </strong></div>
                    <li v-for="article in articles" :key="article.id_article" class="article-title"
                        :class="{ 'bg-success': article.id_article === selectedArticleId }"
                        @click="selectArticle(article.id_article)">
                        <router-link class="links" :to="{ name: 'ContentArticle', params: { id: article.id_article }}"
                            @click="sendArticles()">
                            {{ article.title }}
                        </router-link>
                    </li>
                </div>
            </div>
            <div class="middle col-8">
                <router-view></router-view>
            </div>

        </div>

        <!-- Footer -->
        <footer class="bg-body-tertiary text-center text-lg-start">
            <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
                © 2024 Blog Laravel Vuejs
            </div>
        </footer>
        <AddArticle></AddArticle>

    </div>
</template>

<script>
import _ from 'lodash';
import { reactive } from "vue";
// import Paginate from 'vuejs-paginate-next';
import UserRequest from '@/restful/UserRequest';
import useEventBus from '@/composables/useEventBus'
import AddArticle from '@/components/user/my-article/AddArticle.vue';

// import ContentArticle from '@/components/user/home-page/ContentArticle.vue';
const { emitEvent } = useEventBus();

export default {
    name: "HomePage",
    data() {
        return {
            total: 0,
            last_page: 1,
            paginateVisible: true,
            search: '',
            big_search: {
                perPage: 5,
                page: 1,
            },
            user: {
                name: '',
                avatar: '',  
            },
            categories: [],
            articles: [],
            isLoading: false,
            category: {
            },
            article: {
                id:null,
                id_user: null,
                auth: '',
                title: '',
                content: '',
                search_number: null,
                thumbnail: '',
                is_accept: null
            },
            showFullText: [],
            selectedArticleId: null,
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
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user'));
        emitEvent('eventTitleHeader', 'Home Page');
        this.getCategories();
        this.getArticles();
        console.log(this.getArticles);
    },
    components: {
        // paginate: Paginate,
        AddArticle,
        // ContentArticle,
    },
    methods: {
        sendArticles() {
            emitEvent('articlesUpdated', this.articles);
        },
        loadPage: function () {
            this.$router.push({ name: "HomePage" });
        },
        selectArticle(id) {
            this.selectedArticleId = id; // Cập nhật bài viết được chọn
        },
        searching: function () {
            this.getArticles();
        },
        reRenderPaginate: function () {
            if (this.big_search.page > this.last_page) this.big_search.page = this.last_page;
            this.paginateVisible = false;
            this.$nextTick(() => { this.paginateVisible = true; });
        },
        getCategories: async function () {
            const { data } = await UserRequest.get('category/', true);
            this.categories = data;
            console.log(this.categories);
        },
        logout: function () {
            window.localStorage.removeItem('user');
            this.$router.push({ name: "UserLogin" });
            var appMain = window.document.getElementById('appMain');
            appMain.style.paddingLeft = '0px'
        },
        accountSetting: function () {
            this.$router.push({ name: "AccountSetting" });
        },
        myArticle: function () {
            this.$router.push({ name: "MyArticle" });
        },
        truncatedTitle(title, maxLength = 80) {
            if (title.length > maxLength) return title.slice(0, maxLength) + '..';
            else return title;
        },
        formatDate: function (date) {
            const formattedDate = new Date(date);

            const day = formattedDate.getDate();
            const month = formattedDate.getMonth() + 1;
            const year = formattedDate.getFullYear();

            const formattedDateString = `${day}/${month}/${year}`;

            return formattedDateString;
        },
        clickCallback: function (pageNum) {
            this.big_search.page = pageNum;
        },
        handleSearchSelect() {
            this.page = 1;
            this.getArticles();
        },
        getArticles: async function () {
            this.isLoading = true;
            this.category.id = this.category.id || '';
            this.query = '?search=' + this.search + '&id_category=' + this.category.id;
            // '&page=' + this.big_search.page
            window.history.pushState({}, null, this.query);
            try {
                const { data} = await UserRequest.get(`article/${this.query}`);
                // console.log(data);
                this.articles = data;
                // console.log(this.articles);
                this.total = data.total;
                this.last_page = data.last_page;
                this.isLoading = false;
                // emitEvent('eventSuccess', messages[0]);
            }
            catch (error) {
                if (error.messages) emitEvent('eventError', error.messages[0]);
                this.isLoading = false;
            }
            this.reRenderPaginate();
        },
        selectCategory: function (category) {
            this.category = category;
            this.getArticles();
        },
        // selectArticle: function (article) {
        //     emitEvent('selectArticle', article);
        // },
    },
    watch: {
        big_search: {
            handler: function () {
                this.getArticles();
            },
            deep: true
        },
        search: _.debounce(function () {
            this.getArticles();
        }, 500),
    }
}

</script>
<style>
.article-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left:20px;
    cursor: pointer;
}
.category-name {
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    margin-left:80px;
}
.nav-item{
    margin-right:80px;
    color:black;
    font:bold;
}
.middle{
    height:90vh;
}
.content{
    margin-top:20px;
    padding:20px;
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

.nav-left {
    height: 90vh;
    background:lightblue;
}
.nav-left ul {
    list-style-type: none;
    /* Loại bỏ các dấu bullet */
    padding: 0;
    margin: 0;
    background:lightblue;
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
.nav-left a.nav-item:active{
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