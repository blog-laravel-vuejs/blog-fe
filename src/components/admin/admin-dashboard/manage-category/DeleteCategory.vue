<template>
    <div id="delelte-category">
        <div class="modal fade" ref="deleteCategoryRef" id="deleteCategory" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <form @submit.prevent="deleteCategory()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"><i
                                    class="fa-solid fa-triangle-exclamation"></i>Delete Category</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-warning" role="alert">
                                Warning: Category with title is <Strong style="color:red">{{ category.name }}</Strong>
                                will be deleted!
                            </div>
                            <img :src="category.thumbnail" alt="">
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
    name: 'DeleteCategory',
    data() {
        return {
            category: {
                id: null,
                name: '',
                thumbnail: null,
            },
        }
    },
    props: {
    },

    mounted() {
        onEvent('eventSelectCategory', (category) => {
            this.category = Object.assign({}, category);//Truyen value
        });
    },

    methods: {

        deleteCategory: async function () {
            try {
                const { messages } = await AdminRequest.post(`category/delete/${this.category.id}`, null, true);
                emitEvent('eventSuccess', messages[0]);
                for (let key in this.errors) this.errors[key] = null;
                this.$refs.deleteCategoryRef.click(); // C1
                // var closePW = window.document.getElementById('updateCategory'); // C2 
                // closePW.click();

                emitEvent('eventRegetCategories', '');
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