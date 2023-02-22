<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Subscription;
use App\Models\User;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::role('user')->get();

        foreach($users as $user){
            Subscription::create([
                "user_id" => $user->id,
                "order_id" => "I-BW452GLLEP1G-".$user->id,
                "subscription_id" => "P-5ML4271244454362WXNWU5NQ",
                "status" => "ACTIVE",
                "data" => json_encode([
                    "id" => "I-BW452GLLEP1G",
                    "status" => "APPROVAL_PENDING",
                    "status_update_time" => "2018-12-10T21:20:49Z",
                    "plan_id" => "P-5ML4271244454362WXNWU5NQ",
                    "plan_overridden"=> false,
                    "start_time"=> "2018-11-01T00:00:00Z",
                    "quantity"=> "20",
                    "shipping_amount"   => [
                      "currency_code"=> "USD",
                      "value"=> "10.00"
                    ],
                    "billing_info" => [
                        "next_billing_time" => "2019-10-20T10:00:00Z",
                    ],
                    "subscriber"=> [
                      "name"=> [
                        "given_name"=> "John",
                        "surname"=> "Doe"
                      ],
                      "email_address"=> "customer@example.com",
                      "payer_id"=> "2J6QB8YJQSJRJ",
                      "shipping_address"=> [
                        "name"=> [
                          "full_name"=> "John Doe"
                        ],
                        "address"=> [
                          "address_line_1"=> "2211 N First Street",
                          "address_line_2"=> "Building 17",
                          "admin_area_2"=> "San Jose",
                          "admin_area_1"=> "CA",
                          "postal_code"=> "95131",
                          "country_code"=> "US"
                        ]
                      ]
                    ],
                    "create_time" => "2018-12-10T21:20:49Z",
                ])
            ]);
        }
        
    }
}
