import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import { ListGroup, Tab, Row, Col, Card } from "react-bootstrap";
import Group from "../../Components/Group/Group";
import Menubar from "../../Components/Menubar/Menubar";
import constants from "../../config";
import { Context } from "../../Context/context";
import { checkExpiredAccessToken } from "../../Utils/checkRefreshToken";

const ManageGroupsPage = () => {
    const [values, setValues] = useState({
        groupList: [],
        current: '',
    });

    const context = useContext(Context);

    if(!context.verified) {
        if(context.accessToken) {
            checkExpiredAccessToken(context, localStorage.getItem("accessToken"), localStorage.getItem("refreshToken"));
        } else {
            if(localStorage.getItem("accessToken")) {
                checkExpiredAccessToken(context, localStorage.getItem("accessToken"), localStorage.getItem("refreshToken"));
            } else {
                context.logoutUser();
            }
        }
    }

    const changeCurrent = (group) => {
        setValues({
            ...values,
            current: group
        });
    }

    useEffect(() => {
        axios.get(`${constants.SERVER_URL}/stark/getgroup`,{
                params: {
                    adminEmail: context.email
                }
            }).then((res)=>{
                const nonDeletedGroups = res.data.Object.filter((group) => {
                    return !group.deleted;
                });
                if(res.data.found) {
                    setValues({
                        ...values,
                        groupList: nonDeletedGroups,
                        current: nonDeletedGroups.length === 0? null : nonDeletedGroups[0]
                    });
                } else {
                    alert('Some Error Occurred');
                }
            }).catch((err)=>{
                alert(err);
            });            
    }, [context.verified]);



    if(context.verified) {
        return (
            <>
            <Menubar />
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
                        {Object.keys(values.groupList).length !== 0 ? <Group isAdmin = {context.email === values.current.adminEmail} group = {values.current}/> : (
                            <Tab.Pane key = "none" eventKey="#none">
                                <Card style={{ width: '100%', backgroundColor: "white" }} >
                                    <Card.Body style = {{display: 'flex', width: '100%'}}>
                                        You haven't been invited to join any group
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
    } else {
        return (<></>);
    }
}

export default ManageGroupsPage;