import http from './http'

export const getCars = async () =>{
    try {
        const response = await http.get("/cars");
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

export const addCar = async (car) => {
    const response = await http.post('/cars', car);
    return response.data;
}

export const updateCar = async (car) => {
    const response = await http.put(`/cars`, car );
    return response.data;
}

export const deleteCar = async (id) => {
    await http.delete(`/cars`, { data: { id }});
}