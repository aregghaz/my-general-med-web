<?php

namespace App\Http\Controllers;

use App\Models\Actions;
use App\Models\Notification;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function convertSingleData($client): array
    {
        $count = [];
        for ($i = 1; $i <= $client->stops; $i++) {
            $count[] = $i;
        }
//        dd($client->address);
        return [
            'id' => $client->id,
            'trip_id' => $client->trip_id,
            'fullName' => $client->fullName,
            'price' => $client->price,
            'gender' => [
                'id' => $client->genderType->id,
                'label' => $client->genderType->name,
                'slug' => $client->genderType->slug,
                'value' => $client->genderType->slug,
            ],
            'los' => [
                'id' => $client->los->id,
                'label' => $client->los->name,
                'slug' => $client->los->slug,
                'value' => $client->los->slug,
            ],
            'date_of_service' => $client->date_of_service,
            'request_type' => [
                'id' => $client->requestType->id,
                'label' => $client->requestType->name,
                'slug' => $client->requestType->slug,
                'value' => $client->requestType->slug,
            ],
            'vendor_id' => $client->vendor ? [
                'id' => $client->vendor->id,
                'label' => $client->vendor->name,
                'slug' => $client->vendor->slug,
                'value' => $client->vendor->slug,
            ] : [],
            'duration_id' => [
                'id' => $client->waiteDuration->id,
                'label' => $client->waiteDuration->name,
                'slug' => $client->waiteDuration->slug,
                'value' => $client->waiteDuration->slug,
            ],
            'stairchair_id' => [
                'id' => $client->stairchair->id,
                'label' => $client->stairchair->name,
                'slug' => $client->stairchair->slug,
                'value' => $client->stairchair->slug,
            ],
            'artificial_id' => [
                'id' => $client->artificial->id,
                'label' => $client->artificial->name,
                'slug' => $client->artificial->slug,
                'value' => $client->artificial->slug,
            ],
            ///select

            'type_id' => [
                'id' => $client->clientStatus->id,
                'label' => $client->clientStatus->name,
                'slug' => $client->clientStatus->slug,
                'value' => $client->clientStatus->slug,
            ],
            ///select
            'miles' => $client->miles,
            'insurance' => $client->insurance,
            'insurance_exp' => $client->insurance_exp,
            'stops' => $count,
            'member_uniqie_identifer' => $client->member_uniqie_identifer,
            'birthday' => $client->birthday,
            'height' => $client->height,
            'weight' => $client->weight,
            'address' => $client->address,
            ///  'additionalNote' => $client->additionalNote,
        ];
    }

    protected function saveNotification($model, $field, $id, $actionid)
    {
        $notification = new Notification();
        $notification->value_id = $id;
        $notification->field = $field;
        $notification->model = $model;
        $notification->type_id = $actionid;
        $notification->save();
    }

    protected function convertSingleDataForInfo($client): array
    {
        return [
            'id' => $client->id,
            'trip_id' => $client->trip_id,
            'fullName' => $client->fullName,
            'car' => isset($client->car) ? [
                'id' => $client->car->id,
                'label' => $client->car->driver[0]->user->name . ' ' . $client->car->driver[0]->user->surname,
                'slug' => $client->car->driver[0]->user->name . ' ' . $client->car->driver[0]->user->surname,
                'value' => $client->car->id,
            ] : [],
            'gender' => $client->genderType->name,
            'los' => $client->los->name,
            'date_of_service' => $client->date_of_service,
            'request_type' => $client->requestType->name,
            'type_id' => [
                'id' => $client->clientStatus->id,
                'label' => $client->clientStatus->name,
                'slug' => $client->clientStatus->slug,
                'value' => $client->clientStatus->slug,
            ],
            'miles' => $client->miles,
            'address' => $client->address,
            'member_uniqie_identifer' => $client->member_uniqie_identifer,
            'birthday' => $client->birthday,
            'height' => $client->height,
            'weight' => $client->weight,
            'stops' => $client->stops,
            'oxygen' => $client->artificial->name,
            'waitDuration' => $client->waiteDuration->name,
            'additionalNote' => $client->additionalNote,
            'operator_note' => $client->operator_note,
        ];
    }

    protected function createAction($userId, $clientId, $action, $vendorId = 1): bool
    {
        Actions::create([
            'vendor_id' => $vendorId,
            'action' => $action,
            'user_id' => $userId,
            'client_id' => $clientId,
        ]);
        return true;
    }

    protected function clientTypes(): array
    {
        return [
            [
                'id' => 1,
                'label' => 'Scheduled',
                'slug' => 'Scheduled',
                'value' => 'Scheduled',
            ], [
                'id' => 2,
                'label' => 'reRoute',
                'slug' => 'reRoute',
                'value' => 'reRoute',
            ], [
                'id' => 3,
                'label' => 'hold',
                'slug' => 'hold',
                'value' => 'hold',
            ], [
                'id' => 5,
                'label' => 'inProgress',
                'slug' => 'inProgress',
                'value' => 'inProgress',
            ],
            [
                'id' => 6,
                'label' => 'done',
                'slug' => 'done',
                'value' => 'done',
            ],
        ];
    }

    public function clientCreateType(): array
    {
        return [
            [
                'id' => 1,
                'label' => 'single',
                'slug' => 'single',
                'value' => 'single',
            ],
            [
                'id' => 2,
                'label' => 'timePeriod',
                'slug' => 'timePeriod',
                'value' => 'timePeriod',
            ]
        ];
    }

    public function tripType(): array
    {
        return [
            [
                'id' => 1,
                'label' => 'A',
                'slug' => 'A',
                'value' => 'A',
            ],
            [
                'id' => 2,
                'label' => 'B',
                'slug' => 'B',
                'value' => 'B',
            ], [
                'id' => 3,
                'label' => 'A-B',
                'slug' => 'AB',
                'value' => 'A-B',
            ]
        ];
    }

    public function daysOnWeek(): array
    {
        return [[
            'id' => 1,
            'label' => 'Sunday',
            'slug' => 'Sunday',
            'value' => 'Sunday',
        ], [
            'id' => 1,
            'label' => 'Monday',
            'slug' => 'Monday',
            'value' => 'Monday',
        ], [
            'id' => 1,
            'label' => 'Tuesday',
            'slug' => 'Tuesday',
            'value' => 'Tuesday',
        ], [
            'id' => 1,
            'label' => 'Wednesday',
            'slug' => 'Wednesday',
            'value' => 'Wednesday',
        ], [
            'id' => 1,
            'label' => 'Thursday',
            'slug' => 'Thursday',
            'value' => 'Thursday',
        ], [
            'id' => 1,
            'label' => 'Friday',
            'slug' => 'Friday',
            'value' => 'Friday',
        ], [
            'id' => 1,
            'label' => 'Saturday',
            'slug' => 'Saturday',
            'value' => 'Saturday',
        ]
        ];
    }

    protected function convertQuery($queryData, $title, $clients)
    {

        $clients = $clients->where(function ($query) use ($queryData) {
            $query->where('fullName', 'LIKE', '%' . $queryData . '%')
                ->orWhere('trip_id', 'LIKE', '%' . $queryData . '%')
                ->orWhere('member_uniqie_identifer', 'LIKE', '%' . $queryData . '%');
        });

        return $clients;
    }

    public function calculatePrice($priceList, $price, $miles, $duration_id = false)
    {


        if ($priceList->type == 'base') {
            if ($duration_id and $priceList->service_id === 4) {
               /// dd($duration_id);
                switch ($duration_id) {
                    case 2 :
                        $price = $price + ($priceList->price/6);
                        break;
                    case 3 :
                        $price = $price + ($priceList->price *2/6);
                        break;
                    case 4 :
                        $price = $price + ($priceList->price *3/6);
                        break;
                    case 5 :
                        $price = $price + ($priceList->price *4/6);
                        break;
                    case 6 :
                        $price = $price + ($priceList->price *5/6);
                        break;
                    case 7 :
                        $price = $price + $priceList->price;
                        break;
                }
            } else {
                $price = $price + $priceList->price;
            }

        } else {
            $price = $price + ($priceList->price * $miles);
        }
        return $price;
    }
}
