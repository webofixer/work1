<template>
    <div>
	
		<b-table-simple>
		<b-thead>
			<b-tr>
			  <b-th class="text-center">Status</b-th>
			  <b-th class="text-center">Accommodation</b-th>
			  <b-th class="text-center">Number of rooms</b-th>
			  <b-th class="text-center">Romm type</b-th>
			  <b-th class="text-center">Check-in date</b-th>
			  <b-th class="text-center">NTS</b-th>
			  <b-th class="text-center">Price &euro;</b-th>
			  <b-th class="text-center">Cost &euro;</b-th>
			  <b-th class="text-center"></b-th>
			</b-tr>
		</b-thead>
		
		<b-tbody>
			<accommodation-item 
				v-for="(item, index) in items" 
				:key="'ai'+index" 
				:item="item" :index="index" 
				:options="{options__acc, options__room_type, options__status}"
				@change="Save"
				@remove="Del"
				></accommodation-item>
			<b-tr>
			  <b-th><b-button @click="Add">Add</b-button></b-th>
			  <b-th></b-th>
			  <b-th class="text-center">{{totalRoom}}</b-th>
			  <b-th></b-th>
			  <b-th></b-th>
			  <b-th></b-th>
			  <b-th class="text-center"><div>{{totalPrice|price}} &euro;</div><div>Total GP {{totalPriceGP|price}} &euro;</div></b-th>
			  <b-th class="text-center">{{totalCost|price}} &euro;</b-th>
			  <b-th></b-th>
			</b-tr>
		</b-tbody>
		</b-table-simple>
		
    </div>
</template>

<script>
import axios from "axios";
import AccommodationItem from './AccommodationItem';
export default {
	name: "Accommodations",
	props: [],
	components: {
		AccommodationItem,
	},
	data: function () {
		return {
			newItem: {status:1992, acc_id:'', number:'', room_type:'', date:'', nights:'', price:'', cost:''},
			items: [
				{status:1992, acc_id:'', number:'', room_type:'', date:'', nights:'', price:'', cost:''},
			],
			
			options__acc: [],
			options__room_type: [],
			options__status: [],
			
			cancelToken: [],
		}
	},
	computed: {
		totalRoom() {
			let totalRoom = 0;
			this.items.forEach(function(item){
				totalRoom += parseInt(item.number?item.number:0);
			});
			return totalRoom;
		},
		totalPrice() {
			let totalPrice = 0;
			this.items.forEach(function(item){
				totalPrice += parseFloat(item.price?item.price:0);
			});
			return totalPrice;
		},
		totalCost() {
			let totalCost = 0;
			this.items.forEach(function(item){
				totalCost += parseFloat(item.cost?item.cost:0);
			});
			return totalCost;
		},
		totalPriceGP() {
			return this.totalPrice - this.totalCost;
		},
	},
	filters: {
		price: function (str) {
			str = String(str);
			if( str=='null' ) str = '';
			if( str=='undefined' ) str = '';
			return str.replace(/[\.,]/g,'').replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
		},
	},
	mounted() {
		const self = this;
		
		self.$Progress.start();
		axios.get('/api/options').then(({data})=>{
			if( data.errors && data.errors.length ){
				self.$bvToast.toast(data.errors, {
				  title: 'Error',
				  variant: 'danger',
				  solid: true
				});
			}
			else{
				if( data['Accommodation suppliers'] ){
					data['Accommodation suppliers'].forEach(function(item){
						self.options__acc.push({'value':item.o_id,'text':item.o_name}); 
					});
				}
				if( data['dic_room_type'] ){
					data['dic_room_type'].forEach(function(item){
						self.options__room_type.push({'value':item.d_id,'text':item.d_name}); 
					});
				}
				if( data['dic_status'] ){
					self.options__status = data['dic_status'];
				}
			}
			
			self.$Progress.finish();
		}).catch((error)=>{
			if (axios.isCancel(error)) return;
			
			if( error.response ){
				self.$bvToast.toast(error.response.data, {
				  title: 'Error',
				  variant: 'danger',
				  solid: true
				});
			}
			
			self.$Progress.fail();
			
			// log
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log('Error', error.message);
			}
			console.log(error.config);
		});
	},
	methods: {
		Add(){
			this.items.push( {...this.newItem} );
		},
		Del(index){
			const item = this.items[index];
			// todo axios
			this.items.splice(index, 1);
		},
		Save(index){
			const self = this;
			const item = self.items[index];
			
			if( self.cancelToken[index] !== undefined ){
				self.cancelToken[index].cancel(); 
			}
			self.cancelToken[index] = axios.CancelToken.source();
			
			self.$bvToast.hide();
			
			self.$Progress.start();
			axios.post('/api/save', {item}, {cancelToken: self.cancelToken[index].token}).then(({data})=>{
				item.cost = '';
				item.price = '';
				
				if( data.errors && data.errors.length ){
					self.$bvToast.toast(data.errors, {
					  title: 'Error',
					  variant: 'danger',
					  solid: true
					});
				}
				else{
					item.cost = data.cost;
					item.price = data.price;
				}
				
				self.$Progress.finish();
			}).catch((error)=>{
				if (axios.isCancel(error)) return;
				
				if( error.response ){
					self.$bvToast.toast(error.response.data, {
					  title: 'Error',
					  variant: 'danger',
					  solid: true
					});
				}
				
				self.$Progress.fail();
				
				// log
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log('Error', error.message);
				}
				console.log(error.config);
			});
		},
	}
}
</script>

<style lang="scss" scoped>

</style>
