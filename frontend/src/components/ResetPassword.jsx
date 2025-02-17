import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import zxcvbn from 'zxcvbn'; // For password strength estimation
import toast from "react-hot-toast";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const queryClient = useQueryClient();

    // Prevent browser auto-fill and ensure token presence
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const { mutate: resetPasswordMutation, isPending, isError, error } = useMutation({
        mutationFn: async ({ token, password }) => {
            console.log('Sending request with:', {
                token,
                password,
                url: `${import.meta.env.VITE_LOCAL_URL}/api/auth/reset-password/${token}`
            });
            
            const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/auth/reset-password/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
                credentials: 'include', // If using cookies
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Password reset failed");
            }

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/login", { 
                state: { message: "Password reset successful. Please login with your new password." }
            });
            toast.success("Password reset Successful");
        },
        onError: (error) => {
            console.error("Error resetting password:", error.message);
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'password') {
            const result = zxcvbn(value);
            setPasswordStrength(result.score);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            return; // Handle password mismatch error
        }

        if (passwordStrength < 3) {
            return; // Handle weak password error
        }

        resetPasswordMutation({ token, password: formData.password });
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-6">Reset Password</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm mb-1">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                            name="password"
                            onChange={handleInputChange}
                            value={formData.password}
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm new password"
                            name="confirmPassword"
                            onChange={handleInputChange}
                            value={formData.confirmPassword}
                            autoComplete="new-password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded mt-4 transition disabled:opacity-50"
                        disabled={isPending || passwordStrength < 3 || formData.password !== formData.confirmPassword}
                    >
                        {isPending ? "Resetting..." : "Reset Password"}
                    </button>
                    {isError && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
                    {formData.confirmPassword.length !== formData.password.length && 
                        <p className="text-red-500 text-sm mt-2">Passwords do not match</p>}
                </form>
            </div>
        </div>
    );
}