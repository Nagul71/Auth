import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useParams(); // Get token from URL params
    const [formData, setFormData] = useState({ password: "" });
    const queryClient = useQueryClient();

    const { mutate: resetPasswordMutation, isPending, isError, error } = useMutation({
        mutationFn: async ({ token, password }) => {
            const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }), // Send token & password
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/login");
        },
        onError: (error) => {
            console.error("Error resetting password:", error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPasswordMutation({ token, password: formData.password }); // Send token & password
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                            placeholder="Enter Your Password"
                            name="password"
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded mt-4 transition"
                        disabled={isPending}
                    >
                        {isPending ? "Loading..." : "Reset Password"}
                    </button>
                    {isError && <p className="text-red-500">{error.message}</p>}
                </form>
            </div>
        </div>
    );
}
