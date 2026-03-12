<template>
  <header class="header">
    <button class="hamburger" @click="toggleMenu" style="color:white">☰</button>
    <nav v-if="menuOpen" class="menu">
      <router-link to="/" @click="closeMenu">Hem</router-link>
      <router-link to="/rows" @click="closeMenu">Rader</router-link>
      <router-link to="/numbers" @click="closeMenu">Nummerfördelning</router-link>
      <router-link to="/top10" @click="closeMenu">Top 10</router-link>
      <router-link to="/stats" @click="closeMenu">Statistik</router-link>
      <router-link to="/search" @click="closeMenu">Sök</router-link>
      <router-link to="/generate" @click="closeMenu">Generera</router-link>
    </nav>
    <span style="color:white">Lotto</span>
  </header>

  <main>
    <router-view />
  </main>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
  },
  setup() {
    const menuOpen = ref(false)

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    return { menuOpen, toggleMenu, closeMenu }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  position: relative;
  padding: 1rem;
  background: #c30f00;
}

.hamburger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu {
  position: absolute;
  top: 3rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #ddd;
  padding: 1rem;
}

.menu a {
  margin-bottom: 0.5rem;
  text-decoration: none;
}

table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
}

div.container-2-columns {
  width: 200px;
  margin: auto;
}

div.container-5-columns {
  width: 400px;
  margin: auto;
}

div.column-left-align-80px {
  width: 80px;
  float: left;
}

div.left-align {
  width: 100px;
  float: left;
}

div.clear {
  clear: both;
}
</style>
