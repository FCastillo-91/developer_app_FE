import React from "react"

import "./Developer.css";

class Developer extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-3">
                    <p>{this.props.name}</p>
                </div>
                <div className="col-12 col-sm-3">
                    <p>{this.props.skills.join(", ")}</p>
                </div>
                <div className="col-12 col-sm-3">
                    <p>{this.props.dateJoined}</p>
                </div>
                <div className="col12 col sm-3">
                    {this.props.available === true ? 
                    <button className="btn btn-primary book-button">Book</button> : 
                    <button disabled className="btn btn-primary book-button">Unavailable</button>
                    }
                </div>
                
            </div>
        )
    }
}

export default Developer;