<script lang="ts">
	export let data;
	console.log(data.posts);
</script>

<main>
	<h2>{data.posts.title}</h2>
	<div>{data.posts.body}</div>
</main>
