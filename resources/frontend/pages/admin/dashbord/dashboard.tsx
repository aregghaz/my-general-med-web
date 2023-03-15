import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import s from "./dashboard.module.scss";
import { AdminApi } from "../../../api/admin-api/admin-api";

interface IDashboard {
    path: string;
}

const Dashboard: React.FC<IDashboard> = () => {
    const { t } = useTranslation();

    const [data, setData] = useState({
        profitInYear: [],
        vendorProfit: { vendorsList: [], profit: [] },
        tripCount: { vendorsList: [], count: [] },
        totalProfit: { price: 0, count: 0 }
    });
    const profitInYear = {
        series: [{
            name: "Profit",
            data: data.profitInYear
        }],
        options: {
            chart: {
                height: 350,
                type: "bar"
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    dataLabels: {
                        position: "top" // top, center, bottom
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val: string) {
                    return val + "$";
                },
                offsetY: -20,
                style: {
                    fontSize: "12px",
                    colors: ["#304758"]
                }
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                position: "top",
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: "gradient",
                        gradient: {
                            colorFrom: "#D8E3F0",
                            colorTo: "#BED1E6",
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5
                        }
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false,
                    formatter: function(val: string) {
                        return val + "$";
                    }
                }

            },
            title: {
                text: "Monthly profit",
                floating: true,
                offsetY: 330,
                align: "center",
                style: {
                    color: "#444"
                }
            }
        }
    };
    const vendorsPays = {

        series: [{
            data: data.vendorProfit.profit
        }],
        options: {
            chart: {
                type: "bar",
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: data.vendorProfit.vendorsList
            }
        }
    };
    const vendorsList = {

        series: data.tripCount.count,
        options: {
            chart: {
                width: 380,
                type: "pie"
            },
            labels: data.tripCount.vendorsList,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }]
        }


    };
    useEffect(() => {
        (
            async () => {
                const data = await AdminApi.dashboard();

                setData({
                    profitInYear: data.profitInYear,
                    vendorProfit: data.vendorProfit,
                    tripCount: data.tripCount,
                    totalProfit: data.totalProfit
                });
            }
        )();

    }, []);
    return (
        <div className={s.root}>
            <div className={s.block}>
                <div className={s.dashBordItem}>
                    <div className={`${s.itemHeader} ${s.title}`}>Total Revenue</div>
                    <div
                        className={`${s.itemHeader} ${s.number}`}>{data.totalProfit.price ? data.totalProfit.price.toFixed(2) : 0} $
                    </div>
                </div>
                <div className={s.dashBordItem}>
                    <div className={`${s.itemHeader} ${s.title}`}> Total Rides</div>
                    <div className={`${s.itemHeader} ${s.number}`}>{data.totalProfit.count}</div>
                </div>
                <div className={s.dashBordItem}>
                    <div className={`${s.itemHeader} ${s.title}`}> Avg Revenue Per Ride</div>
                    <div
                        className={`${s.itemHeader} ${s.number}`}>{data.totalProfit.price && data.totalProfit.count ? (data.totalProfit.price / data.totalProfit.count).toFixed(2) : 0} $
                    </div>
                </div>
            </div>
            <div className={s.block}>
                <div className={s.chartItem}>
                    <ReactApexChart options={profitInYear.options} series={profitInYear.series} type="bar"
                                    height={500} />
                </div>

                <div className={s.chartItem}>

                    <ReactApexChart options={vendorsPays.options} series={vendorsPays.series} type="bar"
                                    height={500} />

                </div>
                <div className={s.chartItem}>
                    <ReactApexChart options={vendorsList.options} series={vendorsList.series} type="pie" width={500} />


                </div>

            </div>
        </div>
    );
};


export default Dashboard;
