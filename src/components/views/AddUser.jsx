import React from 'react'
import addUser from "../../api/AddUser"

const AddUser = () => {

    const [formData, setFormData] = useState({
    Username: "",
    Mobile_no: "",
    Password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validations
    if (name === "phone_no" && !/^\d{0,10}$/.test(value)) return;
    if (name === "email" && /\s/.test(value)) return;
    if (name === "password" && value.length > 50) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await addUser();

      if (!data?.result) {
        setErrorMessage("Failed to create user. Please try again.");
      } else {
        toast.success("User created successfully.")
        setFormData({
          UserName: "",
          MobileNumber: "",
          Password: "",
        });
        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      }
    } catch (err) {
       toast.error("Error occurred.");
    }
  };

  return (
    <div>

        
    <div style={{ padding: "20px"}} >
       <ToastContainer />
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group row mb-4">
          <label
            htmlFor="Username"
            className="col-sm-3 col-form-label"
            style={{ color: "#4682B4" }}
          >
            Name
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="text"
              name="Username"
              id="Username"
              value={formData.Username}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="form-group row mb-4">
          <label
            htmlFor="Mobile_no"
            className="col-sm-3 col-form-label"
            style={{ color: "#4682B4" }}
          >
            Phone No.
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              type="tel"
              name="Mobile_no"
              id="Mobile_no"
              value={formData.Mobile_no}
              onChange={handleChange}
              pattern="\d{10}"
              maxLength="10"
              placeholder="10-digit phone number"
              title="Phone number must be 10 digits"
            />
          </div>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="btn px-4 me-2"
            style={{ background: "#4682B4", color: "white" }}
          >
            Create User
          </button>
          <button
            type="button"
            className="btn btn-secondary px-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        </form>
        </div>
      
    </div>
  )
}

export default AddUser
