import React, {useState} from 'react';
import "./SignUp.css";


    const initFormValue = {
        username: "",
        account_name: "",
        password: "",
        confirm_password: "",
        cccd: "",
        email: "",
        phone_number: "",
        dob: "",
        role: "",
    };

    const isEmptyValue = (value) => {
        return !value || value.trim().length < 1;
    };

    const isEmailValid = (email) => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }

export default function SignUp () {
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValue.username)) {
            error["username"] = "Username is required";
        }

        if (isEmptyValue(formValue.account_name)) {
            error["account_name"] = "Account Name is required";
        }

        if (isEmptyValue(formValue.password)) {
            error["password"] = "Password is required";
        }

        if (isEmptyValue(formValue.cccd)) {
            error["cccd"] = "CCCD is required";
        }

        if (isEmptyValue(formValue.email)) {
            error["email"] = "Email is required";
        } else {
            if (!isEmailValid(formValue.email)) {
                error["email"] = "Email is invalid";
            }
        }

        if (isEmptyValue(formValue.phone_number)) {
            error["phone_number"] = "Phone Number is required";
        }

        if (isEmptyValue(formValue.confirm_password)) {
            error["confirm_password"] = "Confirm Password is required";
        } else if (formValue.confirm_password !== formValue.password) {
            error["confirm_password"] = "Confirm Password is not match";
        }

        if (isEmptyValue(formValue.role)) {
            error["role"] = "Select your role";
        }

        setFormError(error);

        return Object.keys(error).length == 0;
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(validateForm()) {
            console.log("Form value", formValue);
        } else {
            console.log("Form invalid");
        }
        
    };

    function handleChangeRole(event) {
        const { value, role } = event.target;
        setFormValue({
            ...formValue,
            role: value,
        });
    }
    

    console.log(formError);

    return (
        <div className="register-page">
            <div className="register-form-container">
                <div className="title">Register Account</div> 
                
                <form onSubmit = {handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            id="username"
                            className="form-control"
                            type="text"
                            name="username"
                            value={formValue.username}
                            onChange={handleChange}
                        />
                        {formError.username && (
                                <div className="error-feedback">{formError.username}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="account_name" className="form-label">
                            Account Name
                        </label>
                        <input
                            id="account_name"
                            className="form-control"
                            type="text"
                            name="account_name"
                            value={formValue.account_name}
                            onChange={handleChange}
                        />
                        {formError.account_name && (
                                <div className="error-feedback">{formError.account_name}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        {formError.password && (
                                <div className="error-feedback">{formError.password}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="confirm_password" className="form-label">
                            Confirm password
                        </label>
                        <input
                            id="confirm_password"
                            className="form-control"
                            type="password"
                            name="confirm_password"
                            value={formValue.confirm_password}
                            onChange={handleChange}
                        />
                        {formError.confirm_password && (
                                <div className="error-feedback">{formError.confirm_password}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="cccd" className="form-label">
                            CCCD
                        </label>
                        <input
                            id="cccd"
                            className="form-control"
                            type="text"
                            name="cccd"
                            value={formValue.cccd}
                            onChange={handleChange}
                        />
                        {formError.cccd && (
                                <div className="error-feedback">{formError.cccd}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            className="form-control"
                            type="text"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        {formError.email && (
                                <div className="error-feedback">{formError.email}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="phone_number" className="form-label">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            className="form-control"
                            type="text"
                            name="phone_number"
                            value={formValue.phone_number}
                            onChange={handleChange}
                        />
                        {formError.phone_number && (
                                <div className="error-feedback">{formError.phone_number}</div>
                            )}
                    </div>

                    <div className="mb-2">
                        <label htmlFor="dob" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            id="dob"
                            className="form-control"
                            type="date"
                            name="dob"
                            value={formValue.dob}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="role" className="form-label">
                            Role
                        </label>
                        <select 
                            id="role" 
                            name="role" 
                            className="form-control"
                            value={formValue.role}
                            onChange={handleChangeRole}
                            >   
                                <option value="select">Select</option>
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
                        </select>
                        {formError.role && (
                                <div className="error-feedback">{formError.role}</div>
                            )}
                    </div>

                    <button type="submit" className="submit-button">Register</button>
                </form>
            </div>
        </div>
    )
}