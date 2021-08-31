<template>
    <div>
        <h1>Posts Page</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Search..."></my-input>
        <div class="app__btns">
            <my-button>Create Post</my-button>
            <my-select v-model="selectedSort" :options="sortOption"></my-select>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form></post-form>
        </my-dialog>

        <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts"></post-list>
        <div v-else>Posts are loading...</div>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import usePosts from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
            sortOption: [
                {
                    value: 'title',
                    name: 'By Name',
                },
                {
                    value: 'body',
                    name: 'By Body',
                },
            ],
        };
    },
    setup(props) {
        const { posts, totalPages, isPostsLoading } = usePosts(10);
        const { selectedSort, sortedPosts } = useSortedPosts(posts);
        const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostsLoading,
            selectedSort,
            sortedPosts,
            searchQuery,
            sortedAndSearchedPosts,
        };
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
