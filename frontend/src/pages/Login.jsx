import { useState } from "react";
import logo from "../images/logo/logo3.png";
import { Link } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  console.table({ email, pwd });
  const submitForm = async (e) => {
    e.preventDefault();
    await fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          toast.success("Login successful!");
          window.location.href = "/";
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
            {"Don't"} have an account{" "}
            <Link className="text-blue-500 " to="/signup">
              Sign Up
            </Link>
          </p>

          <button className="btnNormal mt-3 bg-blue-500 transition-all hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
