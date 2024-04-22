import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import img from "../../assets/vecteezy-fingerprint-identity-sensor-data-protection-system-podium-7164537.jpg";
import Swal from "sweetalert2";
import { db } from "../../AuthProvidors/FireBase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const { logInWithGoogle, logInWithEmailAndPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = event => {
    const email = event.email;
    const password = event.password;
    const passwordRegex = /^.{6,}$/;
    const isValidPassword = passwordRegex.test(password);
    if (isValidPassword) {
      logInWithEmailAndPassword(email, password)
        .then(() => {
          // Signed in
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
        })
        .catch(error => {
          console.log(error.message);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters.",
      });
    }
  };

  const handleLogInWithGoogle = async () => {
    try {
      const res = await logInWithGoogle();
      console.log();
       await setDoc(doc(db, "users", res?.user?.uid), {
        name: res?.user?.displayName,
        email: res?.user?.email,
        photoURL: res?.user?.photoURL,
      });
     if (res?.operationType === 'signIn') {
          // Signed in
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(location?.state ? location.state : "/");
     }
      
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.message}`,
      });
    }
  };

  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      {loading && (
        <span className='loading ml-[700px] loading-dots loading-lg'></span>
      )}
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='hero min-h-screen bg-transparent'>
          <div className='hero-content flex-col lg:flex-row'>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl font-bold'>Welcome</h1>

              <p className='py-6'>
                Log in to access your account and manage your Products. Log in
                to access your account and manage your Products. Log in to
                access your account and manage your Products.
              </p>
            </div>

            <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-current rounded-xl'>
              <form onSubmit={handleSubmit(onSubmit)} className='card-body'>
                <div className='form-control'>
                  <h2 className='text-3xl label-text my-4 font-bold'>
                    Login now!
                  </h2>

                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    className='input input-bordered text-black'
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span className='text-red-700'>{errors.email.message}</span>
                  )}
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    className='input input-bordered text-black'
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: passwordPattern,
                        message:
                          "Password must be at least 6 characters long and include at least one uppercase, one letter, one number, and one special character.",
                      },
                    })}
                  />
                  {errors.password && (
                    <span className='text-red-700'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className='form-control mt-6'>
                  <button className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                    Login
                  </button>
                </div>
                <label className='label'>
                  <Link
                    to='/sign-up'
                    className='label-text-alt text-xs link link-hover'
                  >
                    Don not have an account? Please Sign up
                  </Link>
                </label>
                <div className='divider text-black'>OR</div>
              </form>
              <div className='form-control flex justify-center items-center'>
                <button
                  onClick={handleLogInWithGoogle}
                  className='text-white w-72 flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-10'
                >
                  <span className='mr-2'>Login With</span>
                  <FaGoogle size={20}></FaGoogle>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
