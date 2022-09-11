import { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import constants from '../../config';
import Web3 from 'web3';

const AdminUserLogs = (props) => {

    const [values, setValues] = useState({
        logs: []
    });

    useEffect(() => {
        async function load() {
            var web3 = new Web3(Web3.givenProvider || constants.localProvider);
            const inUseContract = new web3.eth.Contract(constants.IN_USE_CONTRACT_ABI);
            inUseContract.options.address = constants.IN_USE_CONTRACT_ADDRESS;
            await inUseContract.methods.getLog(props.user._id)
                .call((err, res) => {
                    console.log(res);
                    setValues({
                        ...values, 
                        logs: res
                    })
                });
        }
        load();
    }, [props.user]);

    const getDate = (dt) => {
        let d = new Date(parseInt(dt));
        return d.toString();
    }

    return (
        <Card style={{ width: '100%' }}>
            <Card.Body style = {{display: 'block', width: '100%'}}>
                <Card.Title>{props.user.name}</Card.Title>
                <Card.Text>{props.user.email}</Card.Text>
                <Card.Text>{props.user.phoneNumber}</Card.Text>
                <Card.Text>Usage Logs</Card.Text>
                {
                    values.logs.map((l) => {
                        return (
                            <Container style = {{backgroundColor: "pink", padding: "2px"}}>
                                <div>User ID: {l.ID}</div>
                                <div>Member Emails: {l.memberIDs[0]}</div>
                                <div>Service ID: {l.serviceID}</div>
                                <div>Start Time: {getDate(l.startTime)}</div>
                                <div>End Time: {getDate(l.endTime)}</div>
                            </Container>
                        );
                    })
                    
                }
            </Card.Body>
        </Card>
    );
}

export default AdminUserLogs;