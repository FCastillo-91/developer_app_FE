import React from "react"

class Developer extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-12 col-sm-6">
                    <p>{this.props.name}</p>
                </div>
                <div className="col-12 col-sm-4">
                    <p>{this.props.skills.join(", ")}</p>
                </div>
                <div className="col-12 col-sm-2">
                    <button className="btn btn-primary">Book</button>
                </div>
            </div>
        )
    }
}

export default Developer;