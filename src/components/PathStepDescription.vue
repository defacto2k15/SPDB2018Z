<template>
    <div class="pathStepDescription">
        <div>Dystans: {{stepInfo.distance.text}}</div>
        <div>Czas trwania: {{stepInfo.duration.text}}</div>
        <i><div v-html="stepInfo.html_instructions"></div></i>
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
    border-top: solid;
    border-radius: 25px;
    text-align: left;
    padding-left:30px;
    padding-bottom: 20px;

}
</style>
