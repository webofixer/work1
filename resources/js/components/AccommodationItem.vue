<template>
	<b-tr>
	  <b-th>{{item.status}}</b-th>
	  <b-th>{{item.acc}}</b-th>
	  <b-th>{{item.rooms}}</b-th>
	  <b-th>{{item.type}}</b-th>
	  <b-th>{{item.date}}</b-th>
	  <b-th>{{item.nts}}</b-th>
	  <b-th>{{item.price}}</b-th>
	  <b-th>{{item.cost}}</b-th>
	  <b-th>del</b-th>
	</b-tr>
</template>

<script>
export default {
	name: "AccommodationItem",
	props: ['item'],
	components: {
	},
	data: function () {
		return {
		
		}
	},
	computed: {
	},
	mounted() {
		const self = this;
		
		
	},
	methods: {
		remove() {
		
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
