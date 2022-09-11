import { useEffect, useState } from "react";
import axios from 'axios';
import { ListGroup, Tab, Row, Col, Card } from "react-bootstrap";
import AdminGroupLogs from "../../Components/AdminGroup/AdminGroupLogs";
import constants from "../../config";

const AdminGroupLogsPage = () => {
    const [values, setValues] = useState({
        groupList: [],
        current: ''
    });

    const changeCurrent = (group) => {
        setValues({
            ...values,
            current: group
        });
    }

    useEffect(() => {
        axios.get(`${constants.SERVER_URL}/stark/getallgroup`,{
            params: {
                email: 'admin'
            }
        }).then((res)=>{
            if(res.data.found) {
                setValues({
                    ...values,
                    groupList: res.data.Object,
                    current: res.data.Object.length === 0? null : res.data.Object[0]
                });
            } else {
            
                alert('Some Error Occurred');
            }
        }).catch((err)=>{
            alert("Some Error Occurred");
        });
    }, []);

    
    return (
        <>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey = "#linkinit">
            <Row style = {{marginTop: '20px'}}>
                <Col sm={4}>
                <ListGroup>
                    {Object.keys(values.groupList).length !== 0? (
                        values.groupList.map((group) => {
                            return (
                                <ListGroup.Item key = {group._id} action href={"#" + group._id} onClick = {() => changeCurrent(group)}>
                                    {group.name}
                                </ListGroup.Item>
                            )
                        })) : (
                        <ListGroup.Item key = "none" action href="#none">
                            Nothing to Show
                        </ListGroup.Item>
                    )}
                </ListGroup>
                </Col>
                <Col sm={8}>
                <Tab.Content>
                    {Object.keys(values.groupList).length !== 0 ? <AdminGroupLogs group = {values.current}/> : (
                        <Tab.Pane key = "none" eventKey="#none">
                            <Card style={{ width: '100%', backgroundColor: "white" }} >
                                <Card.Body style = {{display: 'flex', width: '100%'}}>
                                    No User in you Cloud
                                </Card.Body>
                            </Card>
                        </Tab.Pane>
                    )}
                </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        </>
    );
}

export default AdminGroupLogsPage;