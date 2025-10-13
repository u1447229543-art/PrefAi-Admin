const CustomButton = ({
  children,
  className = "",
  variant = "primary",
  onClick,
  ...props
}) => {
  const variants = {
    primary: "bg-[#170048] text-white hover:bg-pink hover:bg-[#17004894]",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`
            px-4 py-2 rounded-md flex items-center justify-center 
            transition-all disabled:opacity-50 disabled:cursor-not-allowed
            ${variants[variant]} ${className}
          `}
      {...props}
    >
      {children}
    </button>
  );
};
export default CustomButton;
