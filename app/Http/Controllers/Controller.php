<?php

namespace App\Http\Controllers;

use App\Models\Actions;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function convertSingleData($client)
    {
        return [
            'id' => $client->id,
            'trip_id' => $client->trip_id,
            'fullName' => $client->fullName,
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
            'appointment_time' => $client->appointment_time,
            'pick_up' => $client->pick_up,
            'drop_down' => $client->drop_down,
            'request_type' => [
                'id' => $client->requestType->id,
                'label' => $client->requestType->name,
                'slug' => $client->requestType->slug,
                'value' => $client->requestType->slug,
            ],
            ///select

            'type_id' => [
                'id' => $client->clientStatus->id,
                'label' => $client->clientStatus->name,
                'slug' => $client->clientStatus->slug,
                'value' => $client->clientStatus->slug,
            ],
            ///select
            'origin' => $client->origin,
            'origin_phone' => $client->origin_phone,
            'origin_comment' => $client->origin_comment,
            'destination' => $client->destination,
            'destination_phone' => $client->destination_phone,
            'destination_comments' => $client->destination_comments,
//            'escortType' =>   [
//                'id' => $client->escort->id,
//                'label' => $client->escort->name,
//                'slug' =>  $client->escort->slug,
//                'value' => $client->escort->slug,
//            ],
            //select
//            'type_of_trip' =>  [
//                'id' => $client->typeOfTrip->id,
//                'label' => $client->typeOfTrip->name,
//                'slug' =>  $client->typeOfTrip->slug,
//                'value' => $client->typeOfTrip->slug,
//            ],
            //select
            'miles' => $client->miles,
            'member_uniqie_identifer' => $client->member_uniqie_identifer,
            'birthday' => $client->birthday,
            'height' => $client->height,
            'weight' => $client->weight,
            ///  'additionalNote' => $client->additionalNote,
        ];
    }

    protected function convertSingleDataForInfo($client)
    {
        return [
            'id' => $client->id,
            'trip_id' => $client->trip_id,
            'fullName' => $client->fullName,
            /// 'surname' => $client->surname,
            'gender' => $client->genderType->name,
            'los' => $client->los->name,
            ///'phone_number' => $client->phone_number,
            'date_of_service' => $client->date_of_service,
            'pick_up' => $client->pick_up,
            'drop_down' => $client->drop_down,
            'request_type' => $client->requestType->name,
            'type_id' => [
                'id' => $client->clientStatus->id,
                'label' => $client->clientStatus->name,
                'slug' => $client->clientStatus->slug,
                'value' => $client->clientStatus->slug,
            ],
            'origin' => $client->origin,
            'origin_phone' => $client->origin_phone,
            'origin_comment' => $client->origin_comment,
            'destination' => $client->destination,
            'destination_phone' => $client->destination_phone,
            'destination_comment' => $client->destination_comment,
            'miles' => $client->miles,
            'member_uniqie_identifer' => $client->member_uniqie_identifer,
            'birthday' => $client->birthday,
            'height' => $client->height,
            'weight' => $client->weight,
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

    public function tripType()
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
            ]
        ];
    }

    public function daysOnWeek()
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
}
