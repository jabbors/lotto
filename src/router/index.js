import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import RowsView from '@/views/RowsView.vue'
import NumbersView from '@/views/NumbersView.vue'
import Top10View from '@/views/Top10View.vue'
import StatsView from '@/views/StatsView.vue'
import SearchView from '@/views/SearchView.vue'
import GenerateView from '@/views/GenerateView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/rows',
        name: 'Rows',
        component: RowsView
    },
    {
        path: '/numbers',
        name: 'Numbers',
        component: NumbersView
    },
    {
        path: '/top10',
        name: 'Top10',
        component: Top10View
    },
    {
        path: '/stats',
        name: 'Stats',
        component: StatsView
    },
    {
        path: '/search',
        name: 'Search',
        component: SearchView
    },
    {
        path: '/generate',
        name: 'Generate',
        component: GenerateView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router