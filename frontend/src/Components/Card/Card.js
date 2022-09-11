import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

const CardComponent = (props) => {

    const [values, setValues] = useState({
        showServiceStats: false
    });

    const showStatistics = () => {
        setValues({
            ...values,
            showServiceStats: !values.showServiceStats
        });
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.text}
                </Card.Text>
                
                <Button variant="primary" style = {{marginLeft: "10px"}} disabled = {props.disableButton || props.serviceAvailable === 0} onClick = {props.click}>{props.buttonText}</Button>
                {
                    props.showStopButton?
                    (<Button variant="danger" style = {{marginLeft: "10px"}} disabled = {!props.disableButton} onClick = {props.stopclick}>Stop</Button>):(<></>)
                }
                {props.showStats ? (<Button variant="primary" style = {{marginLeft: "10px"}} onClick = {showStatistics}>Statistics</Button>) : (<></>)}
                {values.showServiceStats ? (<div>{props.serviceAvailable} available out of 5</div>) : (<></>)}
            </Card.Body>
        </Card>
    );
}

export default CardComponent;