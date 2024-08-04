<template>
    <div id="delete-many-category">
        <div class="modal fade" ref="deleteManyCategoryRef" id="deleteManyCategory" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <form @submit.prevent="deleteManyCategory()">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel"><i
                                    class="fa-solid fa-triangle-exclamation"></i>Warning</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-warning" role="alert">
                                <p class="mb-2"> Warning:These categories will be deleted!</p>
                                <div v-for="(category, index) in categories" :key="index">
                                    <li v-if="selectedCategories.includes(category.id)">Title: {{ category.name }}</li>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-danger">Delete all</button>
                            </div>
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
    name: 'DeleteManyCategory',
    data() {
        return {
            categories: null,
        }
    },
    props: {
        selectedCategories: Array,
    },

    mounted() {
        onEvent('selectManyCategory', (categories) => {
            this.categories = categories;
        });
    },

    methods: {

        deleteManyCategory: async function () {
            const selectedCategorysArray = Object.values(this.selectedCategories);
            var data = {
                list_id: selectedCategorysArray
            }
            try {
                const { messages } = await AdminRequest.post('category/deletes', data, true);
                emitEvent('eventSuccess', messages[0]);

                this.$refs.deleteManyCategoryRef.click(); // C1
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