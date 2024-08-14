<template>
    <div>
        <div class="modal fade" id="hideArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-triangle-exclamation"></i>
                            Warning</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fa-regular fa-circle-xmark"></i></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning" role="alert">
                            <p>Warning: These people will be moved to <strong>{{ this.article.is_show == 1 ?
                                'Hide' :
                                'Show' }}</strong> status in the system !</p>
                            <p>Title : <strong>{{ this.article.title }}</strong> </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" ref="closeButton"
                            id="close">Close</button>
                        <button type="button"
                            :class="{ 'btn': true, 'btn-outline-danger': this.article.is_show == 1, 'btn-outline-success': this.article.is_show == 0 }"
                            @click="changeShow">
                            <i
                                :class="{ 'fa-regular': true, 'fa-eye-slash': this.article.is_show == 1, 'fa-eye': this.article.is_show == 0 }"></i>
                            {{ this.article.is_show == 1 ? 'Hide' : 'Show' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import UserRequest from '@/restful/UserRequest';
import useEventBus from '@/composables/useEventBus';
const {  emitEvent, onEvent } = useEventBus();

export default {
    name: "HideArticle",
    props: {
       
    },
    mounted() {
        onEvent('selectArticle', (article) => {
            this.article = article;
            console.log(this.article);
        });
    },
    data() {
        return {
            article: {
                is_show: '',
            }
        }
    },
    methods: {
        changeShow: async function () {
            try {
                if (this.article.is_show == 1) this.article.is_show = 0;
                else this.article.is_show = 1;

                const { messages } = await UserRequest.post('article/change-is-show/' + this.article.id,this.article, true);
                emitEvent('eventSuccess', messages[0]);
                const closeButton = this.$refs.closeButton;
                closeButton.click();
                emitEvent('eventUpdateIsShow', this.article.id); // gán lại giá trị is block  
                
            }
            catch (error) {
                if (error.errors) this.errors = error.errors;
                else for (let key in this.errors) this.errors[key] = null;
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
    }
}
</script>

<style scoped>
.modal-header .close {
    outline: none;
}

@media screen and (min-width: 993px) and (max-width: 1200px) {
    .modal-dialog {
        max-width: 400px;
        margin: 10px auto;
        font-size: 13px;
        ;
    }

    .modal-header {
        padding: auto;
    }

    .modal-header .close {
        font-size: 20px;
    }

    .btn {
        font-size: 13px;
    }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
    .modal-dialog {
        max-width: 300px;
        margin: 10px auto;
        font-size: 11px;
        ;
    }

    .modal-header {
        padding: auto;
    }

    .modal-header .close {
        font-size: 18px;
    }

    .btn {
        font-size: 12px;
    }

    .modal-body {
        padding: 14px 14px 0 14px;
    }
}

@media screen and (min-width: 577px) and (max-width: 768px) {
    .modal-dialog {
        max-width: 230px;
        margin: 10px auto;
        font-size: 9px;
        ;
    }

    .modal-header {
        padding: auto;
    }

    .modal-header .close {
        font-size: 11px;
    }

    .btn {
        font-size: 10px;
    }

    .modal-body {
        padding: 14px 14px 0 14px;
    }
}

@media screen and (min-width: 425px) and (max-width: 575px) {
    .modal-dialog {
        max-width: 180px;
        margin: 10px auto;
        font-size: 7px;
        ;
    }

    .modal-header,
    .modal-footer {
        padding: 5px 5px;
    }

    .modal-header .close {
        font-size: 11px;
    }

    .btn {
        font-size: 8px;
    }

    .modal-body {
        padding: 12px 12px 0 12px;
    }
}

@media screen and (min-width: 375px) and (max-width: 424px) {
    .modal-dialog {
        max-width: 180px;
        margin: 10px auto;
        font-size: 7px;
        ;
    }

    .modal-header,
    .modal-footer {
        padding: 5px 5px;
    }

    .modal-header .close {
        font-size: 9px;
    }

    .btn {
        font-size: 7px;
    }

    .modal-body {
        padding: 11px 11px 0 11px;
    }

    .alert {
        padding: 6px 10px;
    }
}
</style>