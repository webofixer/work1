<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function (){
    return view('index');
});

$router->group(['prefix' => 'api'], function () use ($router) {
	$router->get('options', function () {
		return (new \App\Components\simBaseAuth)->callFunction('f_api_return_accommodations_data');
	});

	$router->post('save', function (\Illuminate\Http\Request $request) {
		$item = $request->input('item');
		
		$date = $item['date'];
		$date = (int)round(strtotime($date) / (60 * 60 * 24));
		
		$data = [
			'acc_id' => $item['acc_id'],
			'number' => $item['number'],
			'room type' => $item['room_type'],
			'chek in' => $date,
			'nights' => $item['nights'],
		];
		return (new \App\Components\simBaseAuth)->callFunction('f_api_save_accommodations_data',$data);
	});
  
});