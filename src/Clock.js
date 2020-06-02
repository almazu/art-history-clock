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
                <h4>Art History Clock</h4>
                <h3>Quelle heure est-il?</h3>
                <Time />
                <Painting />
                <h5>Set Alarm:</h5>
                <Alarm />
                <footer>Developed by Alma Zuleyma 2020</footer>
            </div>
        );
    }
}

class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: (new Date().toLocaleTimeString())
        }

    }    
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );        
    }
    componentWillUnmount() {
        clearInterval(this.interalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleTimeString()
        });
    }

    render() {
        return (
            <div><h1>{this.state.time}</h1></div>
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

    componentDidMount() {
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
                    <span className="description">
                        <span className="title-italic">{artwork[getTime()].title}</span>, {artwork[getTime()].year} <br />
                        {artwork[getTime()].artist} <br />
                        <a href={artwork[getTime()].link}>Artwork info</a>
                    </span>
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