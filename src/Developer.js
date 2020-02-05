import React from "react"

import "./Developer.css";

class Developer extends React.Component {
    handleDelete = () => {
        this.props.deleteDevFunc(this.props.id)
    } 

    handleBookStatus = () => {
        this.props.bookDevFunc(this.props)
    } 

    render() {
        return (
            <div className="row text-left">
                <div className="col-12 col-sm-3">
                    <p>{this.props.name}</p>
                </div>
                <div className="col-12 col-sm-3">
                    <p>{this.props.skills}</p>
                </div>
                <div className="col-12 col-sm-3">
                    <p className="small">{this.props.dateJoined}</p>
                </div>
                <div className="col-12 col-sm-3">
                    <button className="btn btn-outline-danger btn-sm mr-1" onClick={this.handleDelete}>Delete</button>
                {this.props.available === true ? (
                    <button className="btn btn-outline-primary btn-sm" onClick={this.handleBookStatus}>Book</button>
                ) : (
                    <button className="btn btn-outline-primary btn-sm" onClick={this.handleBookStatus}>
                    Unbook
                    </button>
                )}
                </div>
            </div>	      
        )
    }
}

export default Developer;