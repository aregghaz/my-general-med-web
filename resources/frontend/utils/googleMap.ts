const getMapResponse = async (origin: string, destination: string) => {
    const directionsService = new google.maps.DirectionsService();
    return await directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    });
};

export default getMapResponse;
