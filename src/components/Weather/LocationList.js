import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LocationList.css";

export class LocationList extends Component {

    render() {
        const { location, _id} = this.props.item;
        const { handleDeleteByID} = this.props;

        return (
            <div className="todolist-div">
              
                <li className= "li-style">
                        {location}
                </li>
            
                <button onClick={() => handleDeleteByID(_id)} id="delete-button">
                    Delete
                </button>
            </div>
        )
    }
}

LocationList.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteByID: PropTypes.func.isRequired,
};

export default LocationList;




