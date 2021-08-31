import Main from "@/pages/Main"
import About from "@/pages/About"
import PostPage from "@/pages/PostPage"
import PostPageWithStore from "@/pages/PostPageWithStore"
import PostIdPage from "@/pages/PostIdPage"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/posts',
        component: PostPage,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
    },
    {
        path: '/store',
        component: PostPageWithStore,
    },
    {
        path: '/composition',
        component: PostPageCompositionApi,
    },
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router;