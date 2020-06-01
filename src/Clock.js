import React from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import ReactDOM from 'react-dom'
import "react-datepicker/dist/react-datepicker.css"
import 'bootstrap/dist/css/bootstrap.min.css';

class Clock extends React.Component {
    render() {
        return (
            <div className="clock">
                <h2>Art History Clock</h2>
                <h4>Quelle heure est-il?</h4>
                <Time />
                <Painting />
                <h4>Set Alarm:</h4>
                <Alarm />
                <footer>Developed by Alma Zuleyma 2020</footer>
            </div>
        );
    }
}

class Time extends React.Component {
    render() {
        return (

            <div><h1>{new Date().toLocaleTimeString()}</h1></div>
        )
    }
}

class Painting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            artwork: [],
            isLoaded: false,
        };
    }

    async componentDidMount() {
        const url = "./artwork.json"
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                this.setState({ artwork: data, isLoaded: true })
            });
    }
    render() {
        const { error, artwork, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading ... </div>;
        } else {
            return (
                <div className="painting">
                    <img src={artwork[getTime()].path} alt="Artwork"></img>
                    <p className="description">{artwork[getTime()].title}, {artwork[getTime()].year} </p>
                    <p className="description">{artwork[getTime()].artist}</p>
                    <p className="description"><a href={artwork[getTime()].link}>Artwork info</a></p>
                </div>
            )
        }
    }
}

class Alarm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alarmDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    handleChange(date) {
        this.setState({
            alarmDate: date
        })
    }

    onFormSubmit(e) {
        e.preventDefault();
        alert("Alarm set for " + this.state.alarmDate)
    }
    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className="form-group">
                    <DatePicker
                        selected={this.state.alarmDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={20}
                        timeCaption="time"
                        dateFormat="MMMM d yyyy h:mm:ss aa"
                    />
                    <button className="btn btn-primary">Set</button>
                </div>
            </form>
        )
    }
}


function getTime() {
    return (
        new Date().getHours()
    )
}

export default Clock;