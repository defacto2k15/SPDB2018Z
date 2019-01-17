<template>
    <div class="pathStepDescription">
        <div>Dystans: {{stepInfo.distance.text}}</div>
        <div>Czas trwania: {{stepInfo.duration.text}}</div>
        <div v-html="stepInfo.html_instructions"></div>
    </div>
</template>

<script>
    export default {
        name: "PathStepDescription",
        props: ['stepInfo'],
    }
</script>

<style scoped>
.pathStepDescription{
    border-style: solid;
}
</style>
