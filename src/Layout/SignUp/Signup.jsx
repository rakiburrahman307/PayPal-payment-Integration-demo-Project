import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import PageHelmet from "../../Hooks/pageHelmet";
import img from "../../assets/vecteezy-fingerprint-identity-sensor-data-protection-system-podium-7164537.jpg";
import Swal from "sweetalert2";

const Signup = () => {
  const { createUser, loading } = useAuth();
  const navigate = useNavigate();
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = event => {
    const name = event.name;
    const email = event.email;
    const password = event.password;
    const photoUrl = event.photoUrl;

    if (/^\w{1,5}$/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be 6 characters",
      })
    } else if (/^[^A-Z]*$/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must one capital letter",
      })
    } else if (/^[^\W_]*$/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Must have a special character",
      })
    } else {
      createUser(email, password, name)
        .then(result => {
          return updateProfile(result.user, {
            displayName: name,
            photoURL: photoUrl,
          });
        })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "SignIn Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.message}`,
          });
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
      <PageHelmet title='Sign Up || Demo'></PageHelmet>
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className='hero min-h-screen bg-transparent'>
          <div className='hero-content flex-col lg:flex-row'>
            <div className='text-center lg:text-left'>
              <h1 className='text-5xl font-bold'>Welcome!</h1>

              <p className='py-6'>
                Create an account to unlock the full experience of our system.
                Enjoy the comfort, convenience, and security we offer. Your
                journey with us begins here!
              </p>
            </div>

            <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='card-body bg-current rounded-xl'
              >
                <div className='form-control'>
                  <h2 className='text-3xl label-text my-4 font-bold'>
                    SignUp Now!
                  </h2>

                  <label className='label'>
                    <span className='label-text'>Name</span>
                  </label>
                  <input
                    type='text'
                    className='input input-bordered text-black'
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className='text-red-700'>{errors.name.message}</span>
                  )}
                </div>
                <div className='form-control'>
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
                    <span className='label-text'>Photo Url</span>
                  </label>
                  <input
                    type='text'
                    className='input input-bordered text-black'
                    {...register("photoUrl", {
                      required: "PhotoUrl is required",
                    })}
                  />
                  {errors.photoUrl && (
                    <span className='text-red-700'>
                      {errors.photoUrl.message}
                    </span>
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
                    Sign Up
                  </button>
                </div>
                <label className='label'>
                  <Link to='/login' className='label-text-alt link link-hover'>
                    Already have an account? Please Login
                  </Link>
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
