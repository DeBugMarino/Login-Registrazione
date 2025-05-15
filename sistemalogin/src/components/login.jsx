import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  function handleChange(event) {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // Il login è automatico, Firebase salva tutto
      // Prova ad effettuare il login con email e password usando Firebase Authentication
      // `auth` è l'istanza del modulo di autenticazione
      // `data.email` e `data.password` contengono i dati inseriti dall'utente nel form
      navigate("/dashboard");
    } catch (error) {
      console.error("Login fallito", error.message);
    }
  }

  return (
    <>
      <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  onChange={handleChange}
                  type="checkbox"
                  class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span class="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>

          <div class="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <a
              href="#"
              class="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
