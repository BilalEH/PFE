import React, { useState } from "react";
import "../pages/style/ContactUs.css";
import facebook from "../../public/facebook.png";
import linkedin from "../../public/linkedin.png";
import youtube from "../../public/youtube.png";

function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className=" ">
            <div className=" container my-5 d-flex justify-content-space-around">
                <div
                    className="left_side d-flex shadow-lg mx-auto"
                    data-aos="fade-up"
                    data-aos-easing="ease-out"
                    data-aos-duration="800"
                >
                    <div className="w-100">
                        {" "}
                        <h1 className="display-6 ms-3 mt-3 text-success bold">
                            Contact us
                        </h1>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col">
                                    <label
                                        htmlFor="firstName"
                                        className="form-label"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label
                                        htmlFor="lastName"
                                        className="form-label"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">
                                    Your Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer social-icons">
                <div className="social-icons">
                    <img src={facebook} alt="Facebook" />
                    <img src={linkedin} alt="LinkedIn" />
                    <img src={youtube} alt="YouTube" />
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
