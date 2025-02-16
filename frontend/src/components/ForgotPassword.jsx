import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ email: "" });

  const { mutate: forgotPasswordMutation, isPending, isError, error } = useMutation({
    mutationFn: async ({ email }) => {
      const res = await fetch(`${import.meta.env.VITE_LOCAL_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data;
    },
    onSuccess: (data) => {
      toast.success("Reset link sent! Check your email.");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setTimeout(() => navigate("/login"), 2000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Email is required!");
      return;
    }
    forgotPasswordMutation(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Forgot Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Email"
              name="email"
              onChange={(e) => setFormData({ email: e.target.value })}
              value={formData.email}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mt-4 transition"
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send"}
          </button>
          {isError && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
