"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/users/register", {
        username,
        email,
        password,
      });
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <h1 className="text-xl font-semibold text-center">Register</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p>
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
