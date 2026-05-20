export default function Input({
                                  label,
                                  type = "text",
                                  placeholder,
                                  value,
                                  onChange,
                                  name,
                                  error,
                                  className = "",
                              }) {
    return (
        <div className="w-full">
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}

            {/* Input */}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full px-4 py-2.5
                    rounded-full border
                    border-gray-200
                    bg-white
                    text-gray-900
                    placeholder-gray-400
                    shadow-sm
                    transition-all duration-200

                    focus:outline-none
                    focus:ring-2
                    focus:ring-black/10
                    focus:border-black

                    hover:border-gray-300

                    ${error ? "border-red-400 focus:ring-red-100" : ""}
                    ${className}
                `}
            />

            {/* Error message */}
            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
}