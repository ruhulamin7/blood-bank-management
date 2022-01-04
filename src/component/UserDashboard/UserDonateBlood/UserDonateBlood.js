import React from "react";
import "./UserDonateBlood.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
const UserDonateBlood = () => {
  const { user, logOut } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    data.status = `Pending`;
    data.email = user.email;
    axios.post("http://localhost:5000/donateBlood", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Thank you for your kindness",
          showConfirmButton: true,
        });

        reset();
      }
    });
  };
  return (
    <div className="donate-blood-form-container ">
      <h2 className="m-3">Donate Blood Save Life !</h2>
      <div className="donate-blood-form">
        <h5 className="mb-5">Please give your details to donate blood</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Your Name"
            defaultValue={user.displayName}
            {...register("name", { required: true, maxLength: 20 })}
          />

          <input
            placeholder="Your Age (18+ Only)"
            type="number"
            {...register("age", { min: 18, max: 99 })}
          />
          <select {...register("gender")}>
            <option value="" disabled selected hidden>
              Gender
            </option>
            <option defaultValue="male">Male</option>
            <option defaultValue="female">Female</option>
            <option defaultValue="other">Other</option>
          </select>

          <select {...register("bloodGroup")}>
            <option defaultValue="" disabled selected hidden>
              Select Your Blood Group
            </option>
            <option defaultValue="a+">A+</option>
            <option defaultValue="b+">B+</option>
            <option defaultValue="o+">O+</option>
            <option defaultValue="ab+">AB+</option>
            <option defaultValue="a-">A-</option>
            <option defaultValue="b-">B-</option>
            <option defaultValue="o-">O-</option>
            <option defaultValue="ab-">AB-</option>
          </select>

          <input
            placeholder="Disease (if any, oterwise type 'no')"
            {...register("disease", { required: false, maxLength: 20 })}
          />
          <input
            type="date"
            placeholder="Donating Date"
            {...register("donateDate", { required: true, maxLength: 20 })}
          />

          <button className="btn btn-danger mt-5" type="submit">
            Donate Blood <i className="fas fa-tint"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDonateBlood;