<template>
    <div id="delelte-article">
        <div class="modal fade" ref="deleteArticleRef" id="deleteArticle" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <form @submit.prevent="deleteArticle()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"><i
                                    class="fa-solid fa-triangle-exclamation"></i>Delete Article</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-warning" role="alert">
                                Warning: Article with title is <Strong style="color:red">{{ article.title }}</Strong>
                                will be deleted!
                            </div>
                            <img :src="article.thumbnail_article" alt="">
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
import UserRequest from '@/restful/UserRequest';
const { emitEvent, onEvent } = useEventBus();

export default {
    name: 'DeleteArticle',
    data() {
        return {
            article: {
                id: null,
                title: '',
                thumbnail_article: null,
            },
        }
    },
    props: {
    },

    mounted() {
        onEvent('selectArticle', (article) => {
            this.article = Object.assign({}, article);//Truyen value
        });
    },

    methods: {

        deleteArticle: async function () {
            try {
                const { messages } = await UserRequest.post(`article/delete/${this.article.id_article}`, null, true);
                emitEvent('eventSuccess', messages[0]);
                for (let key in this.errors) this.errors[key] = null;
                this.$refs.deleteArticleRef.click(); // C1
               
                emitEvent('eventRegetArticles', '');
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