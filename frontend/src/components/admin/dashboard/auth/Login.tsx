// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (username === "admin" && password === "admin") {
//       onLogin(username, password);
//       navigate("/");
//     } else {
//       toast.error("Invalid credentials", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//       });
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       handleLogin();
//     }
//   };

//   return (
//     <>
//       <section
//         className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 bg-dark-purple"
//         onKeyPress={handleKeyPress}
//       >
//           <div className="md:w-1/3 max-w-sm">
//             <img
//               src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//               alt="Sample image"
//             />
//           </div>
//           <div className="md:w-1/3 max-w-sm bgda p-12 h-96 flex flex-col justify-center">
//           <h1 className="text-center mb-5 text-white font-bold">Please Log In</h1>
//             <input
//               className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <input
//               className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className="mt-4 flex justify-between font-semibold text-sm">
//               <label className="flex text-slate-100 hover:text-blue-300 -600 cursor-pointer">
//                 <input className="mr-1" type="checkbox" />
//                 <span>Remember Me</span>
//               </label>
//               <a
//                 className="text-white hover:text-blue-300 hover:underline hover:underline-offset-4"
//                 href="#"
//               >
//                 Forgot Password?
//               </a>
//             </div>
//             <div className="text-center md:text-left">
//               <button
//                 className="mt-4 bg-white hover:bg-blue-300 px-4 py-2 text-black font-bold uppercase rounded text-xs tracking-wider"
//                 type="button"
//                 onClick={handleLogin}
//               >
//                 Login
//               </button>
//             </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </>
//   );
// };

// export default Login;
