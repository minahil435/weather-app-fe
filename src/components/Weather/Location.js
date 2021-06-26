import React, { Component } from "react";
import axios from "axios";
import LocationList from "./LocationList";
import "./Location.css";


export class Location extends Component {

    state = {
        locationList: [],
        Input: "",
        error: null,
        errorMessage: "",

        LocationName: "",
        country: "",
        description: "",
        temperature: ""
    }

    async componentDidMount() {
        try {
            let Array = await axios.get(
                "http://localhost:3001/api/location/get-all-searched-locations"
            )
            console.log(Array)
            this.setState({
                locationList: Array.data.payload
            })
        }
        catch (err) {
            console.log(err)
        }
    }


    handleOnSubmit = async (event) => {
        event.preventDefault();

        if (this.state.Input.length === 0) {
            this.setState({
                error: true,
                errorMessage: "Location is required",
            });
        } else {
            try {
                const req = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.Input}&appid=${process.env.REACT_APP_KEY}&units=metric`);
                let NewLocation = await axios.post(
                    "http://localhost:3001/api/location/add-location",
                    {
                        location: this.state.Input,
                    }
                );

                let newArray = [
                    ...this.state.locationList, NewLocation.data.payload,
                    ,
                ];

                this.setState({
                    LocationName: req.data.name,
                    country: req.data.sys.country,
                    description: req.data.weather[0].description,
                    temperature: req.data.main.temp,
                    locationList: newArray,
                    Input: ""
                });
            }
            catch (e) {
                this.setState({
                    error: true,
                    errorMessage: "Incorrect city name",
                });
            }
        }
    }

    handleDeleteByID = async (id) => {
        try {
            let obj = await axios.delete(
                `http://localhost:3001/api/location/delete-location-by-id/${id}`
            )
            let filteredArray = this.state.locationList.filter(
                (item) => item._id !== obj.data.payload._id
            );

            this.setState({
                locationList: filteredArray
            })
        }
        catch (err) {
            console.log(err)
        }
    };

    handleTodoOnChange = (event) => {
        this.setState({
            Input: event.target.value,
            error: null,
            errorMessage: "",
        });
    };



    render() {
        return (
            <div>
                <div className="form-div">
                    <form onSubmit={this.handleOnSubmit}>
                        <input
                            name="Input"
                            type="text"
                            onChange={this.handleTodoOnChange}
                            value={this.state.Input}
                        />
                        <button type="submit">Submit</button>
                        <br />
                        <span style={{ color: "red" }}>
                            {this.state.error && this.state.errorMessage}
                        </span>
                    </form>
                </div>

                <div className="weatherDescriptionBox">
                    <div className="togetherDiv">
                        <div className="singleDiv description">Temperature: </div>
                        <div className="singleDiv">{this.state.temperature} </div>
                    </div>

                    <div className="togetherDiv">
                        <div className="singleDiv description">Description: </div>
                        <div className="singleDiv">{this.state.description}</div>
                    </div>

                    <div className="togetherDiv">
                        <div className="singleDiv description">Location: </div>
                        <div className="singleDiv"> {this.state.LocationName}</div>
                    </div>

                    <div className="togetherDiv">
                        <div className="singleDiv description">Country: </div>
                        <div className="singleDiv"> {this.state.country}</div>
                    </div>

                </div>

                <div className="form-div heading">Recent search location</div>

                <div className="todo-div">
                    <ul>
                        {this.state.locationList.map((item) => {
                            return (
                                <LocationList
                                    item={item}
                                    handleDeleteByID={this.handleDeleteByID}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Location;

