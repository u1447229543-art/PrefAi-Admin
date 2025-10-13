const TextInput = ({
  name,
  label,
  type = "text",
  register,
  errors,
  placeholder = "",
  defaultValue = "",
  className = "",
  inputClassName = "",
  errorClassName = "text-red-500 text-sm mt-1",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } ${inputClassName}`}
      />
      {errors[name] && (
        <p className={errorClassName}>{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default TextInput;
