import React, { useState, useEffect } from 'react';
import './PasswordReset.css'; 
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value);
    }

    const currentLanguage = localStorage.getItem("i18nextLng");

    useEffect(() => {
      if (currentLanguage === "fr") {
        document.body.style.backgroundColor = "yellow";
      } else if (currentLanguage === "en-US") {
        document.body.style.color = "black";
      } else if (currentLanguage === "hi") {
        document.body.style.backgroundColor = "blue";
        document.body.style.color = "white";
      } else if (currentLanguage === "zh") {
        document.body.style.backgroundColor = "green";
        document.querySelector('.auth-container').style.color = 'white'
      } else {
        document.body.style.backgroundColor = "white";
      }
    }, [currentLanguage]);

    const sendLink = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/sendpasswordlink`, { email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 201) {
                setEmail("");
                setLoading(false);
                alert("Email sent Successfully");
            }
        } catch (error) {
            console.error("Error sending password reset link", error);
            setLoading(false);
            alert("Failed to send password link, Please try again!");
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
                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PasswordReset;
