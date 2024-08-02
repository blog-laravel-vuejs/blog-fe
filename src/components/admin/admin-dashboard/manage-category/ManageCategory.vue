<template>
    <div id="main">
        <div class="pr-1">
            <div class="input-group ">
                <button content="Add Category" v-tippy data-toggle="modal" data-target="#addCategory" type="button"
                    class="btn btn-success"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <AddCategory></AddCategory>

    </div>
</template>

<script>

import useEventBus from '@/composables/useEventBus';
import AddCategory from '@/components/admin/admin-dashboard/manage-category/AddCategory.vue';
const { emitEvent } = useEventBus();



export default {
    name: "ManageCategory",
    setup() {
        document.title = "Manage Category | Blog Admin"
    },
    components: {
       AddCategory,
    },
    data() {
        return {
    
        }
    },
    mounted() {
        emitEvent('eventTitleHeader', 'Manage Category');
        
    },
    methods: {
        
        
    },
    watch: {
        
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
</style>
