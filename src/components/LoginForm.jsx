// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder: after successful login, navigate to dashboard or home
    navigate("/");
  }

  return (
    <div className="login-form">
      <h3 className="form-heading">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control padding"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control padding"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary-custom">
          Login
        </button>
      </form>
      <div className="forgot-password">
        <a href="#" className="forgot-link">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
