import { useEffect, useState } from "react";
import axios from 'axios';
import { ListGroup, Tab, Row, Col, Card } from "react-bootstrap";
import AdminUserLogs from "../../Components/AdminGroup/AdminUserLogs";
import constants from "../../config";

const AdminUserLogsPage = () => {
    const [values, setValues] = useState({
        userList: [],
        current: ''
    });

    const changeCurrent = (user) => {
        setValues({
            ...values,
            current: user
        });
    }

    useEffect(() => {
        axios.get(`${constants.SERVER_URL}/stark/getalluser`,{
        }).then((res)=>{
            console.log(res);
            if(res.data.found) {
                setValues({
                    ...values,
                    userList: res.data.Object,
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
                    {Object.keys(values.userList).length !== 0? (
                        values.userList.map((user) => {
                            return (
                                <ListGroup.Item key = {user._id} action href={"#" + user._id} onClick = {() => changeCurrent(user)}>
                                    {user.name}
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
                    {Object.keys(values.userList).length !== 0 ? <AdminUserLogs user = {values.current}/> : (
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

export default AdminUserLogsPage;