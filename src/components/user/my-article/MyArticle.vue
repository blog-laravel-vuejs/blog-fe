<template>
    <div id="main">
        <div class="row m-0 pb-2 d-flex justify-content-end" id="search-sort">
            <div class="col-1 pl-0" id="page">
                <select content="Pagination" v-tippy class="form-control" v-model="big_search.perPage">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
            <div class="col-2 pl-0">
                <select content="Sort by" v-tippy class="form-control" v-model="big_search.typesort">
                    <option value="new">New</option>
                    <option value="title">Title</option>
                    <option value="name">Category</option>
                    <option value="search_number">Search number</option>
                </select>
            </div>
            <div class="col-2 pl-0">
                <select content="In direction" v-tippy class="form-control" v-model="big_search.sortlatest">
                    <option value="false">Ascending</option>
                    <option value="true">Decrease</option>
                </select>
            </div>
            <div class="col-3 pl-0">
                <div content="Search articles" v-tippy class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
                    </div>
                    <input v-model="search" type="text" class="form-control " id="inlineFormInputGroup"
                        placeholder="Search...">
                </div>
            </div>
            <div class="pr-1">
                <div class="input-group ">
                    <button content="Add Article" v-tippy data-toggle="modal" data-target="#addArticle" type="button"
                        class="btn btn-success"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
        <div v-if="isLoading">
            <TableLoading :cols="8" :rows="9"></TableLoading>
        </div>
        <div v-if="!isLoading" class="tableData">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"><i class="fa-solid fa-signature"></i> Title</th>
                        <th scope="col"><i class="fa-solid fa-envelope"></i> Name category</th>
                        <th scope="col"><i class="fa-brands fa-line"></i>Search number</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Updated at</th>
                        <th scope="col"><i class="fa-solid fa-user-lock"></i> Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(article, index) in articles" :key="index">

                        <th class="table-cell  " scope="row">#{{ (big_search.page - 1) * big_search.perPage + index
                            + 1
                            }}
                        </th>
                        <td class="table-cell name">
                            <div class="nameAvatar">
                                <img :src="article.thumbnail ? article.thumbnail_article : require('@/assets/avatar.jpg')"
                                    alt="">
                                <span class="nameMember text-center"> {{ article.title }}</span>
                            </div>
                        </td>
                        <td class="table-cell name">
                            <div class="nameAvatar">
                                <img :src="article.thumbnail_category ? article.thumbnail_category : require('@/assets/avatar.jpg')"
                                    alt="">
                                <span class="nameMember text-center"> {{ article.name }}</span>
                            </div>
                        </td>
                        <td class="table-cell text-center displaytext break">{{ article.search_number_article }}</td>
                        <td class="table-cell text-center displayTime  ">{{ formatDate(article.created_at) }}</td>
                        <td class="table-cell text-center">{{ formatDate(article.updated_at) }}</td>
                        <td class="table-cell text-center">
                            <div class="action">
                                <button data-toggle="modal" data-target="#modal-view-detail-article"
                                    v-tippy="{ content: 'View Detail' }" class="view-detail-content text-success"
                                    @click="selectArticle(article)">
                                    <i class="fa-solid fa-eye"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div id="divpaginate" class="mt-2">
            <paginate v-if="paginateVisible" :page-count="last_page" :page-range="3" :margin-pages="2"
                :click-handler="clickCallback" :initial-page="big_search.page" :prev-text="'Prev'" :next-text="'Next'"
                :container-class="'pagination'" :page-class="'page-item'">
            </paginate>
        </div>
        <AddArticle></AddArticle>
        <DetailArticle></DetailArticle>
    </div>

</template>

<script>

import useEventBus from '@/composables/useEventBus'


const { emitEvent,onEvent} = useEventBus();
import Paginate from 'vuejs-paginate-next';
import TableLoading from '@/components/common/TableLoading'
import _ from 'lodash';

import UserRequest from '@/restful/UserRequest';
import AddArticle from '@/components/user/my-article/AddArticle.vue';
import DetailArticle from '@/components/user/my-article/DetailArticle.vue';

export default {
    name: "MyArticle",
    setup() {
        document.title = "My Article| Blog User"
    },
    components: {
        paginate: Paginate,
        TableLoading,
        AddArticle,
        DetailArticle,
       

    },
    data() {
        return {
            total: 0,
            last_page: 1,
            paginateVisible: true,
            search: '',
            big_search: {
                perPage: 5,
                page: 1,
                typesort: 'new',
                sortlatest: 'true',
                role: 'all',
            },
            query: '',
            articles: [],
            articleSelected: {
                id: '',
                title: '',
                search_number_article: '',
                name: '',
            },
            selectedArticles: [],
            isLoading: false,
        }
    },
    mounted() {
        emitEvent('eventTitleHeader', 'My Article');
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        this.search = searchParams.get('search') || '';
        this.big_search = {
            perPage: parseInt(searchParams.get('paginate')) || 5,
            page: searchParams.get('page') || 1,
            typesort: searchParams.get('typesort') || 'new',
            sortlatest: searchParams.get('sortlatest') || 'true',
            role: searchParams.get('role') || 'all',
        }
        this.getArticles();
        onEvent('eventRegetArticles', () => {
            this.getArticles();
        });
    },
    methods: {
         reRenderPaginate: function () {
            if (this.big_search.page > this.last_page) this.big_search.page = this.last_page;
            this.paginateVisible = false;
            this.$nextTick(() => { this.paginateVisible = true; });
        },
        getArticles: async function () {
            this.selectedArticles = [];
            this.isLoading = true;
            this.query = '?search=' + this.search + '&typesort=' + this.big_search.typesort + '&sortlatest=' + this.big_search.sortlatest
                + '&paginate=' + this.big_search.perPage + '&page=' + this.big_search.page;
            window.history.pushState({}, null, this.query);

            try {
                const { data } = await UserRequest.get('article/my-article' + this.query)
                this.articles = data.data;
                this.total = data.total;
                this.last_page = data.last_page;
                this.isLoading = false;
            }
            catch (error) {
                if (error.messages) emitEvent('eventError', error.messages[0]);
                this.isLoading = false;
            }
            this.reRenderPaginate();
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
        selectArticle: function (article) {
                emitEvent('selectArticle', article);
            },
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
<style scoped>
tr th {
    color: var(--user-color);
}

.tableData {
    min-height: 40vh;
    max-width: 100%;
    overflow-y: scroll;
}

.nameAvatar {
    display: flex;
    align-items: center;
    align-content: center;
}



.nameAvatar img {
    border-radius: 6px;
}

.nameUser {
    margin-left: 10px;
}

#main {
    padding: 1% 1%;
}

#page {
    margin-right: auto;
    min-width: 78px;
}

table {
    font-size: 12px;
}

table img {
    width: 60px;
    height: 60px;
    object-fit: cover;
}

.table-cell {
    font-weight: bold;
    vertical-align: middle;
}

table button {
    padding: 1px 3px;
    margin-right: 2px;
}

th {
    text-align: center;
}

table thead th {
    vertical-align: middle
}

@media screen and (min-width: 1201px) {
    table {
        max-width: 100%;
        vertical-align: middle;
    }

    .nameAvatar {
        min-width: 120px;
    }

    .displaytext {
        min-width: 150px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;
    }

    table img {
        min-width: 60px;
        min-height: 60px;
        max-width: 60px;
        max-height: 60px;
        object-fit: cover;
    }
}

@media screen and (min-width: 993px) and (max-width: 1200px) {

    table {
        max-width: 100%;
        vertical-align: middle;
    }

    .nameAvatar {
        min-width: 120px;
    }

    .displaytext {
        min-width: 100px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;

    }

    .break {
        word-break: break-all;
    }

    table {
        font-size: 11px;
    }

    .fa-solid {
        font-size: 13px;
    }

    table img {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        object-fit: cover;
    }

    .table td,
    .table th {
        padding: 8px;
    }

    .form-control,
    .pagination {
        font-size: 12px;
    }

    #main {
        padding: 1% 1%;
        margin: 0;
    }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
    table {
        max-width: 100%;
        vertical-align: middle;
    }

    .nameAvatar {
        min-width: 80px;
    }

    .displaytext,
    .displayphone {
        min-width: 70px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;

    }

    .displayphone {
        min-width: 50px;
    }

    .break {
        word-break: break-all;
    }

    table {
        font-size: 10px;
    }

    .fa-solid {
        font-size: 11px;
    }

    table img {
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        object-fit: cover;
    }

    .table td,
    .table th {
        padding: 4px;
    }

    .form-control,
    .pagination {
        font-size: 11px;
    }
}

@media screen and (min-width: 577px) and (max-width: 768px) {
    table {
        max-width: 100%;
        vertical-align: middle;
    }

    .btn {
        padding: 0px 7px;
    }

    .form-control {
        padding: 1px 2px;
        height: 23px;
        font-size: 10px;
    }

    .input-group-text {
        font-size: 8px;
        padding: 1px 2px;
    }

    .input-group .fa-solid {
        font-size: 11px;
    }

    .nameAvatar {
        min-width: 50px;
        display: grid;
    }

    .displaytext {
        min-width: 80px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;

    }

    .displayphone {
        min-width: 50px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;

    }

    .break {
        word-break: break-all;
    }

    table {
        font-size: 9px;
    }

    .sizeiconlock {
        font-size: 10px;
    }

    table img {
        min-width: 35px;
        min-height: 35px;
        max-width: 35px;
        max-height: 35px;
        object-fit: cover;
    }

    .table td,
    .table th {
        padding: 5px;
    }

    .nameUser {
        margin-left: 0;
    }

    .pagination {
        font-size: 10px;
    }

}

@media screen and (min-width: 425px) and (max-width: 576px) {
    .nameAvatar {
        min-width: 30px;
        display: grid;
    }

    .btn {
        padding: 0px 7px;
    }

    .form-control {
        padding: 1px 2px;
        height: 23px;
        width: 50px;
        font-size: 9px;
    }

    .pagination {
        font-size: 9px;
    }

    .input-group-text {
        font-size: 8px;
        padding: 1px 2px;
    }

    .input-group .fa-solid {
        font-size: 9px;
    }

    .displaytext,
    .displayphone {
        min-width: 70px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;
    }

    .displayphone {
        min-width: 40px;
    }

    .displayGender {
        min-width: 32px;
    }

    .displayTime {
        min-width: 20px;
    }

    .break {
        word-break: break-all;
    }

    table {
        font-size: 9px;
    }

    .sizeiconlock {
        font-size: 50%;
    }

    table img {
        min-width: 40px;
        min-height: 40px;
        max-width: 40px;
        max-height: 40px;
        object-fit: cover;
    }

    .table td,
    .table th {
        padding: 4px;
    }

    .checkbox input {
        margin: 0;
        padding: 0;
        font-size: 10px;
    }

    #search-sort {
        gap: 2px;
    }
}

@media screen and (min-width: 375px) and (max-width: 424px) {
    .nameAvatar {
        min-width: 30px;
        display: grid;
    }

    .btn {
        padding: 0px 6px;
    }

    .form-control {
        padding: 1px 2px;
        height: 23px;
        width: 40px;
        font-size: 9px;
    }

    .pagination {
        font-size: 9px;
    }

    .input-group-text {
        font-size: 8px;
        padding: 1px 2px;
    }

    .input-group .fa-solid {
        font-size: 8px;
    }

    .displaytext,
    .displayphone {
        min-width: 50px;
        overflow: hidden;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical;
    }

    .displayphone {
        min-width: 30px;
    }

    .break {
        word-break: break-all;
    }

    table {
        font-size: 7px;
    }

    .sizeiconlock {
        font-size: 8px;
    }

    table img {
        min-width: 40px;
        min-height: 40px;
        max-width: 40px;
        max-height: 40px;
        object-fit: cover;
    }

    .table td,
    .table th {
        padding: 4px;
    }

    .form-control,
    .pagination {
        font-size: 8px;
    }

    .nameUser {
        margin-left: 0;
    }

    .checkbox input {
        margin: 0;
        padding: 0;
        font-size: 10px;
    }

    #search-sort {
        gap: 2px;
    }
}
.view-detail-content {
    transition: all 0.5s ease;
    font-size: 22px;
}
.view-detail-content i:hover {
    transition: all 0.5s ease;
    color: var(--user-color);
}
</style>
