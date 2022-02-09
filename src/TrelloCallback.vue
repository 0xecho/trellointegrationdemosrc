<template>
  <div></div>
</template>

<script>
export default {
    mounted() {
        const token = window.location.hash.substr(1).split('&')[0].split('=')[1];
        let sketchId = localStorage.getItem('sketchId');
        let userId = localStorage.getItem('userId');
        if (!sketchId) {
            sketchId = Math.random().toString(36);
            localStorage.setItem('sketchId', sketchId);
        }
        if (!userId) {
            userId = Math.random().toString(36);
            localStorage.setItem('userId', userId);
        }
        fetch("https://api.fl0.com/invision%20/dev/trello%20integration/flows/register?sketchId=" + sketchId + "&userId=" + userId + "&token=" + token)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // remove the hash from the url
            window.location.href = window.location.href.split('#')[0];
            
        }).catch(function(err) {
            console.log(err);
            window.location.href = window.location.href.split('#')[0];
            
        });
    },
}
</script>

<style>

</style>