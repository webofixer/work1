<template>
	<div>
	<b-dropdown text="" no-caret variant="link p-0" ref="dropdown" class="rounded-sm" :style="{backgroundColor:setColor}">
		<template #button-content>
			<div class="p-3"></div>
		</template>
		<div class="d-flex px-1">
			<div 
				v-for="(st, index) in options__status" 
				:key="'st'+index" 
				role="button" 
				class="mx-1 p-3" 
				:style="{backgroundColor:'#'+st.d_color_code}"
				@click="set(st.d_id);"
				v-b-tooltip.hover :title="st.d_name"
			></div>
		</div>
	</b-dropdown>
	</div>
</template>

<script>
export default {
	name: "statusItem",
	props: ['color_id', 'options__status'],
	components: {
	},
	data: function () {
		return {
		
		}
	},
	computed: {
		setColor() {
			const self = this;
			return self.color_id && self.options__status.length 
				?('#'+self.options__status.find((item, index, array) => {
					return item.d_id==self.color_id
				}).d_color_code)
				:'';
		},
	},
	mounted() {
		const self = this;
		
		
	},
	methods: {
		set(id) {
			this.$emit('change', id);
			
			this.$root.$emit('bv::hide::tooltip');
			setTimeout(()=>{
				this.$refs.dropdown.hide(true);
			}, 50);
		}
	}
}
</script>