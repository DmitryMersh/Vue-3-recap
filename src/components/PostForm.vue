<template>
    <form @submit.prevent>
        <my-input v-focus v-model="post.title" type="text" placeholder="name" />
        <my-input v-model="post.body" type="text" placeholder="details" />
        <my-button class="btn" @click="createPost">Create</my-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            },
        };
    },
    methods: {
        createPost(event) {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: '',
            };
        },
    },
    watch: {
        post: {
            handler(newVal) {
                console.log('newVal', newVal);
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>
