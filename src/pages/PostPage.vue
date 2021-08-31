<template>
    <div>
        <h1>Posts Page</h1>
        <my-input v-focus v-model="searchQuery" placeholder="Search..."></my-input>
        <div class="app__btns">
            <my-button @click="showDialog">Create Post</my-button>
            <my-select v-model="selectedSort" :options="sortOption"></my-select>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form @create="createPost"></post-form>
        </my-dialog>

        <post-list v-if="!isPostsLoading" @remove="removePost" :posts="sortedAndSearchedPosts"></post-list>
        <div v-else>Posts are loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <my-paging v-model="page" :totalPages="totalPages"></my-paging> -->
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
export default {
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
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
    methods: {
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
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    },
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = response.data;
            } catch (error) {
                alert('Error');
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    },
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch (error) {
                alert('Error');
            } 
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>
                post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            );
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    watch: {
        // page() {
        //     this.fetchPosts();
        // }
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
