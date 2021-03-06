import axios from "axios";

const tripAxios = axios.create();

tripAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})
const initialState = {
    tripsData: [],
    loading: true,
    errMsg: "",
}

this.state = this.initialState;

const tripsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TRIP":
            return {
                ...state,
                loading: false,
                tripsData: action.oneTrip,
            }

        case "DELETE_TRIP":
            return {
                ...state,
                loading: false,
                tripsData: state.tripsData.filter(trip => trip._id !== action.id)
            }
        default:
            return state
    }
}
export const getTrips = () => {
    return dispatch => {
        tripAxios.get("/api/trips")
            .then(response => {
                dispatch({
                    type: "GET_TRIPS",
                    tripsData: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })
    }
}
export const getTrip = id => {
    return dispatch => {
        tripAxios.get("/api/trips/" + id)
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: "GET_TRIP",
                    oneTrip: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })
    }
}

//add a new trip attach a personId to it
export const addTrip = (newTrip, history) => {
    return dispatch => {
        tripAxios.post("/api/trips", newTrip)
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: "ADD_TRIP",
                    newTrip: response.data,
                })
                history.push("/groupwall/" + response.data._id)
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })
    }
}

//edit a trip
export const editTrip = (editedTrip, id, history) => {
    return dispatch => {
        tripAxios.put("/api/trips/" + id, editedTrip)
            .then(response => {
                dispatch({
                    type: "EDIT_TRIP",
                    editedTrip: response.data,
                    id
                })
                history.push("/groupwall/" + response.data._id)
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })

    }
}

//delete a trip
export const deleteTrip = id => {
    return dispatch => {
        tripAxios.delete("/api/trips/" + id)
            .then(response => {
                dispatch({
                    type: "DELETE_ISSUE",
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })
    }
}



export default tripsReducer