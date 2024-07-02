import React, { useState } from 'react';
import './PasswordReset.css'; 
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value);
    }

    const sendLink = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/user/sendpasswordlink", { email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                setEmail("");
                alert("Email sent Successfully");
            }
        } catch (error) {
            console.error("Error sending password reset link", error);
            setMessage(true);
        }
    }

    return (
        <section className="auth-section">
            <div className="auth-container">
                <h1>Enter Your Email</h1>
                <h5>Email</h5>
                <form onSubmit={sendLink}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={setVal} 
                        placeholder="Enter your email" 
                        className="auth-input" 
                        required 
                    />
                    <button type="submit" className="auth-btn">Send</button>
                </form>
            </div>
        </section>
    );
};

export default PasswordReset;
