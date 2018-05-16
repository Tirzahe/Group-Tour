import axios from "axios";
const tripAxios = axios.create();

tripAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})
const initialState = {
    tripsData: [],
    loading: true,
    errMsg: ""
}

this.state = this.initialState;

const tripsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TRIP":
            return {
                ...state,
                loading: false,
                tripsData: [...state.tripsData, action.newIssue]
            }
        case "EDIT_TRIP":
            return {
                ...state,
                loading: false,
                tripsData: state.tripsData.map(trip => {
                    if (trip._id === action.id) {
                        return action.editedTrip
                    } else {
                        return trip
                    }
                })
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
//CHECK ROUTES!!!!!!
export const getTrips = () =>{
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
                type:"ERR_MSG",
                errMsg: "Sorry no data is available"
            })
        })
    }
}

//add a new trip attach a personId to it
export const addTrip = (newTrip) => {
    return dispatch => {
        console.log(newTrip);
        tripAxios.post("/api/trips", newTrip)
            .then(response => {
                // console.log(response.data);
                dispatch({
                    type: "ADD_TRIP",
                    newTrip: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type:"ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })
    }
}

//edit a trip
export const editTrip = (editedTrip, id) => {
    return dispatch => {
        tripAxios.put("/api/trips/" + id, editedTrip)
            .then(response => {
                dispatch({
                    type: "EDIT_TRIP",
                    editedTrip: response.data,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type:"ERR_MSG",
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
                    type:"ERR_MSG",
                    errMsg: "Sorry no data is available"
                })
            })
    }
}



export default tripsReducer