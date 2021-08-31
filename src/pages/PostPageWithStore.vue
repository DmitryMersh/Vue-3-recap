<template>
    <div>
        <h1>Posts Page</h1>
        <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search..."></my-input>
        <div class="app__btns">
            <my-button @click="showDialog">Create Post</my-button>
            <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOption"></my-select>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"></post-form>
        </my-dialog>

        <post-list v-if="!isPostsLoading" @remove="removePost" :posts="sortedAndSearchedPosts"></post-list>
        <div v-else>Posts are loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter((p) => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts: (state) => state.post.posts,
            isPostsLoading: (state) => state.post.isPostsLoading,
            selectedSort: (state) => state.post.selectedSort,
            searchQuery: (state) => state.post.searchQuery,
            page: (state) => state.post.page,
            limit: (state) => state.post.limit,
            totalPages: (state) => state.post.totalPages,
            sortOption: (state) => state.post.sortOption,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        }),
    },
    watch: {
    },
};
</script>

<style>
.app__btns {
    display: flex;
    justify-content: space-between;
}
.observer {
    height: 30px;
    background: green;
}
</style>
