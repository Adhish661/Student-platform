import { motion } from "framer-motion";

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500 shadow-sm hover:shadow-md",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-500 shadow-lg hover:shadow-xl"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed hover:shadow-none" 
    : "";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      whileHover={!disabled ? { 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.95,
        transition: { duration: 0.1 }
      } : {}}
      {...props}
    >
      <motion.div
        className="flex items-center space-x-2"
        whileHover={!disabled ? { x: 2 } : {}}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
};

export default Button;