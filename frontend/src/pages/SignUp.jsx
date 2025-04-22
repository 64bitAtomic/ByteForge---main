import logo from "../images/logo/logo3.png";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { api_base_url } from "../helper";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  console.table({ fullName, email, pwd });
  const navigate = useNavigate();
  // const submitFrom = (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:3000/signup", {
  //     mode: "cors",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fullName: fullName,
  //       email: email,
  //       pwd: pwd,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //         toast.success("Signup successful!");
  //         navigate("/login");
  //       } else {
  //         toast.error(data.msg);
  //       }
  //     });
  // };
  const submitForm = async (e) => {
    e.preventDefault();
    await fetch(api_base_url + "/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        pwd: pwd,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // If response status is not 2xx
          return res.json().then((err) => {
            throw new Error(err.msg || "Signup failed");
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success("Signup successful!");
          navigate("/login");
        } else {
          toast.error(data.msg || "Signup failed.");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong.");
      });
  };

  return (
    <>
      <div className="con flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={submitForm}
          className="w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[30vw] h-auto flex flex-col items-center bg-[#0f0e0e] p-[20px] rounded-lg shadow-xl shadow-black/50"
        >
          <img className="w-[230px] object-cover" src={logo} alt="" />
          <div className="inputBox">
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="inputBox">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="inputBox">
            <input
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p className="text-[gray] text-[14px] mt-3 self-start">
            Already have an account{" "}
            <Link className="text-blue-500 " to="/login">
              Login
            </Link>
          </p>

          <button className="btnNormal mb-2 mt-3 bg-blue-500 transition-all hover:bg-blue-600">
            Sign Up
          </button>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              credentialResponse = jwtDecode(credentialResponse.credential)
              setEmail(credentialResponse.email)
              setFullName(credentialResponse.name)
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </form>
      </div>
    </>
  );
};

export default SignUp;
