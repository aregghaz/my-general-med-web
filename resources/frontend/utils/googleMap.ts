const getMapResponse = async (origin: string, destination: string, waypoint: Array<any>) => {
    const directionsService = new google.maps.DirectionsService();
    return await directionsService.route({
        origin: origin,
        destination: destination,
        waypoints:waypoint,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    });
};

export default getMapResponse;
