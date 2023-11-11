const getMapResponse = async (origin: any, destination: any, waypoint: Array<any>) => {
    const directionsService = new google.maps.DirectionsService();
    return await directionsService.route({
        origin: origin,
        destination: destination,
        waypoints:waypoint,
        optimizeWaypoints:true,
        avoidFerries:true,
        avoidHighways:true,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    });
};

export default getMapResponse;
