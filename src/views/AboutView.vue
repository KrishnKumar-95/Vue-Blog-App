<script setup lang="ts">
import { useAuthStore } from '@stores/authStore';
const authStore = useAuthStore()
</script>

<template>
    <main>
        <h2>Blog with Login and Register</h2>
        <div class="about-box">
            <div class="abc">
                <div class="box">
                    <h3>Developer</h3>
                    <div class="dev-image">
                        <div>
                            <img src="/mypic.jpg" alt="developer">
                        </div>
                        <div class="dev-box" >
                            <p>Krishan Kumar</p>
                            <p>krishnkumar180895@gmail.com</p>
                            <a href="https://www.linkedin.com/in/krishan-kumar-389430164/" target="_blank">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <h3>Project</h3>
                    <h4>Blog Project with Login and Register in VueJS + Vite with TypeScript and Vuetify</h4>
                </div>
                <div class="box">
                    <h3>Server</h3>
                    <h4>NodeJs is used for Server</h4>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 100vw;
}

main h2 {
    text-align: center;
}

.abc {
    width: 70vw;
    padding-top: 1rem;
}

.dev-image {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.about-box{
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0.5rem 0;
}

.dev-image img {
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
    aspect-ratio: 2/2;
}
</style>