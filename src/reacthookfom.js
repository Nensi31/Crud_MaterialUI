import React from "react";
import { useForm } from "react-hook-form";

export default function Reacthoookform() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log("name", watch("name")); // watch input value by passing the name of it
  console.log("email", watch("email"));
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input {...register("name", { required: true })} />
      {errors.name && <span>Name is required</span>}
      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("email", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.email && <span>Email is required</span>}
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
}
