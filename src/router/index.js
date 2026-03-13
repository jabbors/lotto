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
        alias: '/lotto/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/rows',
        alias: '/lotto/rows',
        name: 'Rows',
        component: RowsView
    },
    {
        path: '/numbers',
        alias: '/lotto/numbers',
        name: 'Numbers',
        component: NumbersView
    },
    {
        path: '/top10',
        alias: '/lotto/top10',
        name: 'Top10',
        component: Top10View
    },
    {
        path: '/stats',
        alias: '/lotto/stats',
        name: 'Stats',
        component: StatsView
    },
    {
        path: '/search',
        alias: '/lotto/search',
        name: 'Search',
        component: SearchView
    },
    {
        path: '/generate',
        alias: '/lotto/generate',
        name: 'Generate',
        component: GenerateView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router