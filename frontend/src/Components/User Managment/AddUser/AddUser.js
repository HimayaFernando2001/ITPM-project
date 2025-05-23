import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddEmploye() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    type: "",
    name: "",
    gmail: "",
    phone: "",
    address: "",
    password: "",
    emptype: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [emailError, setEmailError] = useState("");

  // Updated regex to allow both @gmail.com and @my.sliit.lk
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|my\.sliit\.lk)$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "gmail") {
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address (e.g., example@gmail.com or example@my.sliit.lk)");
      } else {
        setEmailError("");
      }
    }

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(inputs.gmail)) {
      setEmailError("Please enter a valid email address ending with @gmail.com or @my.sliit.lk");
      return;
    }
    try {
      const response = await sendRequest();
      console.log(response.data);
      window.alert("Account Created successfully!");
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the employee!", error);
      window.alert("This Gmail Already exists");
    }
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("type", inputs.type);
    formData.append("name", inputs.name);
    formData.append("gmail", inputs.gmail);
    formData.append("phone", inputs.phone);
    formData.append("address", inputs.address);
    formData.append("password", inputs.password);
    formData.append("emptype", inputs.emptype);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    return await axios.post("http://localhost:5000/employee", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const handleLoginNavigate = () => {
    navigate("/");
  };

  return (
    <div className="auth_home_bk">
      <div className="auth_from_add_regi">
        <h1 className="auth_topic">Create Account</h1>
        <div className="item_full_box">
          <form onSubmit={handleSubmit}>
            <label className="form_lable">Type</label>
            <br />
            <select
              className="form_input"
              required
              value={inputs.type}
              onChange={handleChange}
              name="type"
            >
              <option value="">Select Type</option>
              <option value="Client">Client</option>
              <option value="Employee">Employee</option>
            </select>
            <br />
            {inputs.type === "Client" && (
              <>
                <label className="form_lable">Profile Photo</label>
                <br />
                <input
                  type="file"
                  className="form_input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <br />
              </>
            )}
            {inputs.type === "Employee" && (
              <>
                <label className="form_lable">Select Your Employee Type</label>
                <br />
                <select
                  className="form_input"
                  value={inputs.emptype}
                  onChange={handleChange}
                  name="emptype"
                >
                  <option value="">Select Type</option>
                  <option value="Security Officer">Security Officer</option>
                  <option value="Lady Security Officer">Lady Security Officer</option>
                  <option value="Body Guard">Body Guard</option>
                  <option value="VVIP Officer">VVIP Officer</option>
                </select>
                <br />
              </>
            )}
            <label className="form_lable">Name</label>
            <br />
            <input
              className="form_input"
              type="text"
              required
              value={inputs.name}
              onChange={(e) => {
                const re = /^[A-Za-z\s]*$/;
                if (re.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              name="name"
            />
            <br />
            <label className="form_lable">Gmail</label>
            <br />
            <input
              className="form_input"
              type="email"
              value={inputs.gmail}
              onChange={handleChange}
              name="gmail"
              required
            />
            {emailError && <p style={{ color: "red", fontSize: "12px" }}>{emailError}</p>}
            <br />
            <label className="form_lable">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              className="form_input"
            />
            <br />
            <label className="form_lable">Phone</label>
            <br />
            <input
              type="text"
              id="phone"
              name="phone"
              className="form_input"
              value={inputs.phone}
              onChange={(e) => {
                const re = /^[0-9\b]{0,10}$/;
                if (re.test(e.target.value)) {
                  handleChange(e);
                }
              }}
              maxLength="10"
              pattern="[0-9]{10}"
              title="Please enter exactly 10 digits."
              required
            />
            <br />
            <label className="form_lable">Address</label>
            <br />
            <input
              className="form_input"
              type="text"
              value={inputs.address}
              onChange={handleChange}
              name="address"
              required
            />
            <br />
            <button type="submit" className="auth_btn">
              Create Account
            </button>
          </form>

          <p className="auth_pera_two">
            You have an account?{" "}
            <span className="auth_pera_two_sub" onClick={handleLoginNavigate}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddEmploye;
