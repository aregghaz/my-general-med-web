<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class WeatherApiController extends Controller
{
    private function getIcon($watherId)
    {
        if ($watherId == 800) {
            return "weather_sun";
        } elseif ($watherId == 801) {
            return "weather_sunny";
        } elseif ($watherId == 802) {
            return "weather_neutral";
        } elseif ($watherId == 803 || $watherId == 804) {
            return "weather_sunny";
        } elseif ($watherId == 300 || $watherId == 301 || $watherId == 302 || $watherId == 310 ||
            $watherId == 311 || $watherId == 312 || $watherId == 313 || $watherId == 314 ||
            $watherId == 321 || $watherId == 520 || $watherId == 521 || $watherId == 522 || $watherId == 531) {
            return "weather_sunny_rain";
        } elseif ($watherId == 500 || $watherId == 501 || $watherId == 502 || $watherId == 503 || $watherId == 504) {
            return "weather_rain";
        } elseif ($watherId = 200 || $watherId = 201 || $watherId = 202 || $watherId = 210 || $watherId = 211 ||
                            $watherId = 212 || $watherId = 221 || $watherId = 230 || $watherId = 231 || $watherId = 232) {
            return "weather_flash";
        } elseif ($watherId == 511 || $watherId == 600 || $watherId == 601 || $watherId == 602 || $watherId == 611 ||
            $watherId == 612 || $watherId == 613 || $watherId == 615 || $watherId == 616 || $watherId == 620 ||
            $watherId == 621 || $watherId == 622) {
            return "weather_sunny_snow";

        } elseif ($watherId == 701 || $watherId == 711 || $watherId == 721 || $watherId == 731 || $watherId == 741 ||
            $watherId == 751 || $watherId == 761 || $watherId == 762 || $watherId == 771 || $watherId == 781) {
            return "weather_neutral";

        }
        return "weather_neutral";

        //https://openweathermap.org/weather-conditions
    }

    public function index()
    {
        $response = Http::get('https://api.openweathermap.org/data/2.5/onecall', [
            'lat' => 40.7295022,
            'lon' => 44.8388738,

            'APPID' => '4f021d50874645cba682f3f50915d8ed',
        ]);
        $data = $response->body();
        $data = json_decode($data)->daily;
        $weather = [
            [$data[0]->temp->max - 273.15, $this->getIcon($data[0]->weather[0]->id)],
            [$data[1]->temp->max - 273.15, $this->getIcon($data[1]->weather[0]->id)],
            [$data[2]->temp->max - 273.15, $this->getIcon($data[2]->weather[0]->id)]
        ];
        return response()->json($weather);
    }
}
