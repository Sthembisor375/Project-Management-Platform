function EmailConfirmationForm() {
  const handleSubmit = () => {};

  return (
    <div className="login-form">
      <h3 className="form-heading">Confirm Email</h3>
      <form>
        <div className="form-group">
          <input
            type="email"
            className="form-control padding"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary-custom">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EmailConfirmationForm;
