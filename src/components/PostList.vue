<template>
    <div v-if="posts.length > 0">
        <h3>User List</h3>
        <transition-group name="post-list">
            <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"></post-item>
        </transition-group>
    </div>
    <h2 v-else>
        No Items
    </h2>
</template>

<script>
import PostItem from '@/components/PostItem.vue';
export default {
    components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 0.4s ease;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(30px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>
