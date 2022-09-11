import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';
import CustomModal from '../../Modal/Modal';
import jQuery from 'jquery';
import { Button } from 'react-bootstrap';
import constants from '../../config';


const Register = (props) => {
    const [values, setValues] = useState({
        formData: {
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
            otpPhone: '',
            otpEmail: '',
        }, 
        showModal:false
    });
    
    const {
        name,
        email,
        phoneNumber,
        password,
        otpEmail,
        otpPhone
    } = values.formData;

    const onChange = (event) => {
        event.preventDefault();
        let temp = values.formData;
        setValues({
            ...values,
            formData: temp
        });
        temp[event.target.name] = event.target.value;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(!verifyOTP()) {
            setValues({
                ...values,
                showModal: false
            });
            alert("OTP Mismatch");
            return ;
        }
        setValues({
            ...values,
            showModal: true
        })
        try {
            let cnt = 1;
            let message = "Can't go further because of following errors : \n";
            if(values.formData.name.trim() === '') {
                message += "" + cnt + ". Name cannot be empty\n";
                cnt++;
            }
            if(values.formData.email.trim() === '') {
                message += "" + cnt + ". Email cannot be empty\n";
                cnt++;
            }
            if(values.formData.password.trim() === '') {
                message += "" + cnt + ". Password cannot be empty\n";
                cnt++;
            }
            
            if(cnt === 1) {
                axios.post(`${constants.SERVER_URL}/stark/register`,{
                    name,
                    email,
                    password,
                    phoneNumber
                }).then((res)=>{
                    setValues({
                        formData: {
                            name: '',
                            password: '',
                            email: '',
                            otpPhone: '',
                            phoneNumber: '',
                            otpEmail: ''
                        }, 
                        showModal: false,
                    })
                }).catch((err)=>{
                    alert(err.response.data.error);
                    setValues({
                        ...values, 
                        showModal: false
                    });
                })
                alert('Login to proceed');
            } else {
                alert(message);
                setValues({
                    ...values,
                    showModal: false
                });
            }
        } catch(err) {
            setValues({
                ...values,
                showModal: false
            });
            alert("Cannot Verify Details. Try in sometime");
        }
    }

    const sendEmailOTP = () => {
        axios.post(`${constants.SERVER_URL}/stark/sendmail`, {
            email
        });
    }

    const sendPhoneOTP = () => {
        axios.post(`${constants.SERVER_URL}/stark/sendOTP`, {
            phoneNumber
        });
    }

    const verifyOTP = () => {
        let verified = true;
        axios.get(`${constants.SERVER_URL}/stark/verifyOTP`, {
            otpPhone
        }).then((res) =>{
            verified = verified && res.verified
        });
        axios.get(`${constants.SERVER_URL}/stark/verifyOTP`, {
           otpEmail 
        }).then((res) =>{
            verified = verified && res.verified
        });
        return verified;

    }

    return (
        <>

        <CustomModal show={values.showModal} message = {"Verifying Details....Please wait"} title = {"Register Process"}/>
        <div className="containerx">
        <div className="row">
            <div className="col-sm-2 col-md-7 col-lg-10 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-1">
                    <h5 className="card-title text-center mb-5 fw-light fs-5"><b>Register</b></h5>
                    <form>
                    <div className="form-floating mb-2">
                        <input type="text" name = 'name' className="form-control" id="floatingInput 1" placeholder="Name" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="email" name = 'email' className="form-control" id="floatingInput 2" placeholder="Email" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Email</label>
                        <Button style = {{marginTop: "3px"}} onClick = {sendEmailOTP}>SEND OTP</Button>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="emailOTP" name = 'emailOTP' className="form-control" id="floatingInput 3" placeholder="Verify Email OTP" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Verify OTP sent on Email</label>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="phoneNumber" name = 'phoneNumber' className="form-control" id="floatingInput 4" placeholder="Phone Number" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Phone Number</label>
                        <Button style = {{marginTop: "3px"}} onClick = {sendPhoneOTP}>SEND OTP</Button>
                    </div>
                    <div className="form-floating mb-1">
                        <input type="phoneOTP" name = 'phoneOTP' className="form-control" id="floatingInput 5" placeholder="Verify Phone OTP" onChange = {onChange}></input>
                        <label htmlFor="floatingInput">Verify OTP sent on Phone</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" name = 'password' className="form-control" id="floatingPassword 6" placeholder="Password" onChange = {onChange}></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold" onClick = {onSubmit}>Sign Up</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>			                            
    )
}

export default Register;