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
			  <b-th class="text-center"></b-th>
			</b-tr>
		</b-thead>
		
		<b-tbody>
			<b-tr v-for="(item, index) in items" :key="'ai'+index">
			  <b-th>
				<status-item :color_id="item.status" @change="item.status=$event" :options__status="options__status"></status-item>
			  </b-th>
			  <b-th>
				<b-form-select v-model="item.acc_id" :options="options__acc"></b-form-select>
			  </b-th>
			  <b-th>
				<b-form-input v-model="item.number" type="number"></b-form-input>
			  </b-th>
			  <b-th>
				<b-form-select v-model="item.room_type" :options="options__room_type"></b-form-select>
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
				<b-form-input v-model="item.nights" type="number"></b-form-input>
			  </b-th>
			  <b-th>
				<b-form-input v-model="item.price"></b-form-input>
			  </b-th>
			  <b-th>
				<b-form-input v-model="item.cost"></b-form-input>
			  </b-th>
			  <b-th>
				<b-button size="sm" @click="Save(index)" title="Save">
					<b-icon v-if="!item.loading" icon="box-arrow-in-right" aria-hidden="true"></b-icon>
					<b-icon v-else icon="circle-fill" animation="throb" ></b-icon>
				</b-button>
			  </b-th>
			  <b-th>
				<b-button size="sm" @click="Del(index)"><b-icon icon="trash-fill" aria-hidden="true"></b-icon></b-button>
			  </b-th>
			</b-tr>
			
			<b-tr>
			  <b-th><b-button @click="Add">Add</b-button></b-th>
			  <b-th></b-th>
			  <b-th class="text-center">{{totalRoom}}</b-th>
			  <b-th></b-th>
			  <b-th></b-th>
			  <b-th></b-th>
			  <b-th class="text-center">{{totalPrice|price}} &euro;</b-th>
			  <b-th class="text-center">{{totalCost|price}} &euro;</b-th>
			  <b-th></b-th>
			  <b-th></b-th>
			</b-tr>
		</b-tbody>
		</b-table-simple>
		
    </div>
</template>

<script>
import axios from "axios";
//import AccommodationItem from './AccommodationItem';
import statusItem from './statusItem';
export default {
	name: "Accommodations",
	props: [],
	components: {
		//AccommodationItem,
		statusItem,
	},
	data: function () {
		return {
			newItem: {status:1992, acc_id:'', number:'', room_type:'', date:'', nights:'', price:'', cost:'', loading: false},
			items: [
				{status:1992, acc_id:'', number:'', room_type:'', date:'', nights:'', price:'', cost:'', loading: false},
			],
			
			options__acc: [],
			options__room_type: [],
			options__status: [],
		}
	},
	computed: {
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
		totalRoom() {
			let totalRoom = 0;
			this.items.forEach(function(item){
				totalRoom += parseInt(item.number?item.number:0);
			});
			return totalRoom;
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
		
		axios.get('api/options').then(({data})=>{
			data['Accommodation suppliers'].forEach(function(item){
				self.options__acc.push({'value':item.o_id,'text':item.o_name}); 
			});
			data['dic_room_type'].forEach(function(item){
				self.options__room_type.push({'value':item.d_id,'text':item.d_name}); 
			});
			self.options__status = data['dic_status'];
		}).catch(({response})=>{
			console.error(response.data)
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
			const item = this.items[index];
			item.loading = true;
			axios.post('api/save', {item}).then(({data})=>{
				item.cost = data.cost;
				item.price = data.price;
				item.loading = false;
			}).catch(({response})=>{
				console.error(response.data)
			});
		},
	}
}
</script>

<style lang="scss" scoped>

</style>
