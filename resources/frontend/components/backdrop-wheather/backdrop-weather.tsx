import React, {useEffect, useRef, useState} from 'react'
import useOnClickOutside from '../../hooks/use-on-click-outside'
import {WeatherIconType, weekDay} from '../../constants/helpers'
import {useTranslation} from 'react-i18next'
import {weatherAPI} from '../../api/site-api/weather-api'

import s from './backdrop-weather.module.scss'

interface IBackDropWeather {
    handlerCloseBackDrop: () => void
}

interface IWeatherDays {
    weekDay: string
    icon: string
    temperatureCelsius: number
    temperatureFahrenheit: number
}

const BackDropWeather: React.FC<IBackDropWeather> = ({handlerCloseBackDrop}) => {
    const {t} = useTranslation()
    const [weatherData, setWeatherData] = useState<Array<string & number[]> | null>(null)
    const backDropRef = useRef<HTMLDivElement | null>(null)
    const weatherDays: Array<IWeatherDays> = []

    useEffect(() => {
        (
            async () => {
                const data = await weatherAPI.getWeather()
                setWeatherData(data)
            }
        )()
    }, [])

    useOnClickOutside(backDropRef, handlerCloseBackDrop)

    // creator weather data

    if (weatherData) {
        weatherData
            .forEach((item, index) => {
                const weatherDay = {} as IWeatherDays
                index === 0 ?
                    weatherDay.weekDay = 'Today'
                    :
                    weatherDay.weekDay = weekDay[(index + new Date().getDay()) % weekDay.length]
                item
                    .forEach(el => {
                        if (typeof el === 'number') {
                            weatherDay.temperatureCelsius = Math.round(el)
                            weatherDay.temperatureFahrenheit = Math.round(el) * 9 / 5 + 32
                        } else {
                            weatherDay.icon = el
                        }
                    })
                weatherDays.push(weatherDay)
            })
    }


    return (
        <div className={s.wrapperWeather} ref={backDropRef}>
            <div className={s.cancelIconWrapper}>
                <i className={`cancelicon- ${s.cancelIcon} `}
                   onClick={handlerCloseBackDrop}
                />
            </div>
            {
                weatherDays.length !== 0 ?
                    <div className={s.weather}>
                        {
                            weatherDays
                                .map((day, index) => (
                                        <div key={index} className={s.weatherDay}>
                                            <div className={s.weekDay}>
                                                <strong>{t(day.weekDay)}</strong>
                                            </div>
                                            <div className={s.weekDayIcon}>
                                                {WeatherIconType[day.icon]}
                                            </div>
                                            <div className={s.temperature}>
                                                <p> {day.temperatureCelsius} C / {day.temperatureFahrenheit} F </p>
                                            </div>
                                        </div>
                                    )
                                )
                        }
                    </div>
                    :
                    <div className={s.weather}>
                        <div className={s.ldsEllipsis}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default BackDropWeather
