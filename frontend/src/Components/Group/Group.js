import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import CustomModal from '../../Modal/Modal';
import axios from 'axios';
import constants from '../../config';

const Group = (props) => {
    const [values, setValues] = useState({
        confirm: false,
        showModal: false
    });

    const groupDeletedFinalNo = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            confirm: false
        })
    }

    const groupDeletedFinalYes = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            showModal: true
        });
        axios.delete(`${constants.SERVER_URL}/stark/deletegroup`,{
            params: {
                groupId: props.group._id,
                deletedBy: localStorage.getItem("email")
            }
        }).then((res)=>{
            if(res.data.deleted) {
                window.location.href = "/manage-groups";
            } else {
                alert('Some Error Occurred');
            }
        }).catch((err)=>{
            alert(err);
        });            
    }

    const groupDeleted = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            confirm: true
        })
    }

    return (
        <Card style={{ width: '100%' }}>
            <CustomModal show = {values.showModal} message = "Deleting Group...Please Wait" title = "Deletion Process"/>
            <Card.Body style = {{display: 'block', width: '100%'}}>
                <Card.Title>{props.group.name}</Card.Title>
                <Card.Text>{props.group.desc}</Card.Text>
                {
                    props.group.memberEmails.map((memberEmail) => {
                        return (
                            <Card.Text>{memberEmail}</Card.Text>);
                    })
                }
                {values.confirm? (
                    <>
                        <Button variant="success" style = {{marginRight: '20px'}} onClick = {groupDeletedFinalYes}>✓</Button>
                        <Button variant="danger" style = {{marginRight: '20px'}} onClick = {groupDeletedFinalNo}>✕</Button>
                    </>):(
                        <div>
                            <Button variant="success" disabled={!props.isAdmin} onClick = {groupDeleted}>DELETE</Button>
                        </div>
                    )}
            </Card.Body>
        </Card>
    );
}

export default Group;