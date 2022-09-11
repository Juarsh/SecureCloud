import { useContext, useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import axios from 'axios';
import { Context } from '../../Context/context';
import CustomModal from '../../Modal/Modal';
import Menubar from '../../Components/Menubar/Menubar';
import constants from '../../config';
import { checkExpiredAccessToken } from "../../Utils/checkRefreshToken";

const MakeGroupsPage = (props) => {

    const context = useContext(Context);

    const [values, setValues] = useState({
        position: 1,
        group: {
            name: '',
            desc: '',
            memberEmails: [],
            adminEmail: context.email
        },
        showModal: false
    });

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


    const nextPage = (event) => {
        event.preventDefault();
        let pos = values.position;
        if(pos === 1) {
            let cnt = 1;
            let message = "Can't go further because of following errors : \n";
            if(values.group.name.trim() === '') {
                message += "" + cnt + ". Name cannot be empty\n";
                cnt++;
            }
            if(values.group.desc.trim() === '') {
                message += "" + cnt + ". Description cannot be empty\n";
                cnt++;
            }
            if(cnt === 1) {
                setValues({
                    ...values,
                    position: pos + 1
                });
            } else {
                alert(message);
            }
        }
    }

    const prevPage = (event) => {
        event.preventDefault();
        let pos = values.position;
        setValues({
            ...values,
            position: pos - 1
        });
    }

    const onChange = (event) => {
        event.preventDefault();
        let temp = values.group;
        if(temp.adminEmail === '') {
            temp.adminEmail = context.email;
        }
        temp[event.target.name] = event.target.value;
        setValues({
            ...values,
            group: temp
        });
    }

    const handleFiles = (files) => {
        setValues({
            ...values,
            showModal: true
        });
        var reader = new FileReader();
        reader.onload = function(e) {
            let arr = reader.result.split("\r\n");
            let email = [];
            let temp = values.group;
            for(let i = 0; i < Object.keys(arr).length - 1; i++) {
                email.push(arr[i]);
            }
            temp.memberEmails = email;
            setValues({
                ...values,
                group: temp,
                showModal: false
            });
        }
        reader.readAsText(files[0]);
    }

    const submitForm = (event) => {
        event.preventDefault();
        if(Object.keys(values.group.memberEmails).length === 0) {
            alert("Member List cannot be empty");
        } else {
            const { group } = values;
            axios.post(`${constants.SERVER_URL}/stark/setgroup`,{
                   group
                }).then((res)=>{
                    setValues({
                        ...values,
                        position: 1,
                        group: {
                            name: '',
                            desc: '',
                            memberEmails: [],
                            adminEmail: context.email
                        }
                    }); 
                }).catch((err)=>{
                    console.log(err);
                    alert('Some Error Occurred');
                })
            
            
        }
    }

    return (
        <>
            <Menubar/>
            <CustomModal show = {values.showModal} message = {"Reading Files...Please Wait"} title = {"Make a Group"}></CustomModal>
            <div className="containerx">
                <div className="row">
                    <div className="col-sm-2 col-md-7 col-lg-5 mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5">
                            <div className="card-body p-4 p-sm-1">
                                <ProgressBar now={values.position / 2 * 100} style = {{marginBottom: '20px'}}/>
                                {values.position === 1? (
                                    <>
                                        <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Group Information</b></h5>
                                        <form>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="Name of group" name = "name" onChange = {onChange} value = {values.group.name}></input>
                                                <label htmlFor="floatingInput">Name</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control" id="floatingInput" placeholder="Description" name = "desc" onChange = {onChange} value = {values.group.desc}></input>
                                                <label htmlFor="floatingInput">Description</label>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Confirm Details</b></h5>
                                        <Card style={{ width: '100%', marginBottom: '20px' }}>
                                            <Card.Body>
                                                <Card.Title>Name : {values.group.name}</Card.Title> 
                                            </Card.Body>
                                            <Card.Body>
                                                <Card.Title>Description : {values.group.desc}</Card.Title> 
                                            </Card.Body>
                                        </Card>
                                        
                                        <div style = {{marginBottom: '8px'}}>
                                            <label htmlFor="floatingPassword">Member List</label>
                                            <br/>
                                            <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                                                <Button>Upload</Button>
                                            </ReactFileReader>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" style = {{marginBottom: '10px'}} onClick = {submitForm}>Set Up</button>
                                        </div>
                                    </>
                                )}
                                <Button variant="primary" disabled = {values.position === 1} style = {{marginRight: '10px', fontSize: '20px', marginBottom: '10px'}} onClick = {prevPage}>&#8592;</Button>
                                <Button variant="primary" disabled = {values.position === 2} style = {{fontSize: '20px', marginBottom: '10px'}} onClick = {nextPage}>&#8594;</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MakeGroupsPage;