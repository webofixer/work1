<template>
		<b-tr>
		  <b-th>
			<status-item :color_id="item.status" @change="item.status=$event" :options__status="options.options__status"></status-item>
		  </b-th>
		  <b-th>
			<b-form-select v-model="item.acc_id" :options="options.options__acc"></b-form-select>
		  </b-th>
		  <b-th>
			<b-form-input v-model="item.number" type="number" min="0"></b-form-input>
		  </b-th>
		  <b-th>
			<b-form-select v-model="item.room_type" :options="options.options__room_type"></b-form-select>
		  </b-th>
		  <b-th>
			<b-input-group class="">
			  <b-form-input v-model="item.date" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
			  <b-input-group-append>
				<b-form-datepicker v-model="item.date" button-only right size="sm"></b-form-datepicker>
			  </b-input-group-append>
			</b-input-group>
		  </b-th>
		  <b-th>
			<b-form-input v-model="item.nights" type="number" min="0"></b-form-input>
		  </b-th>
		  <b-th>
			<b-form-input v-model="item.price"></b-form-input>
		  </b-th>
		  <b-th>
			<b-form-input v-model="item.cost"></b-form-input>
		  </b-th>
		  <b-th>
			<b-button size="sm" @click="remove"><b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
		  </b-th>
		</b-tr>
</template>

<script>
import statusItem from './statusItem';
export default {
	name: "AccommodationItem",
	props: ['item', 'index', 'options'],
	components: {
		statusItem,
	},
	data: function () {
		return {
			toUpdate: false,
		}
	},
	computed: {
	},
	watch: {
		'item.acc_id': {
			handler: 'changeData'
		},
		'item.date': {
			handler: 'changeData'
		},
		'item.nights': {
			handler: 'changeData'
		},
		'item.number': {
			handler: 'changeData'
		},
		'item.room_type': {
			handler: 'changeData'
		},
	},
	mounted() {
		const self = this;
		
		
	},
	methods: {
		changeData(){
			const props = ['acc_id', 'date', 'nights', 'number', 'room_type'];
			
			// if all filled
			if( !this.toUpdate ){
				this.toUpdate = true;
				props.forEach((prop)=>{
					if( !this.item[prop] ){
						this.toUpdate = false;
					}
				});
			}
			
			// if all empty (bug when remove item)
			if( this.toUpdate ){
				this.toUpdate = false;
				props.forEach((prop)=>{
					if( this.item[prop] ){
						this.toUpdate = true;
					}
				});
			}
			
			if( this.toUpdate ){
				this.$emit('change', this.index);
			}
		},
		remove(){
			this.$emit('remove', this.index);
		},
	}
}
</script>

<style lang="scss" scoped>

</style>
