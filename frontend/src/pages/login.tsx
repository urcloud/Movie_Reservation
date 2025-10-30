import { useState } from "react";
import { Input } from "../commons/input";
import { useLocation } from "wouter";
import { Button } from "../commons/button";

export function LoginForm() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => setLocation("/signup");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    // 간단한 예시 계정
    if (email === "test@example.com" && password === "1234") {
      alert("로그인 성공!");
      // ✅ 로그인 성공 시 localStorage 저장
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      setLocation("/");
    } else {
      setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-primary"
          >
            로그인
          </Button>
        </form>
        <Button
          className="w-full pr-3 text-xs text-right text-gray-600 hover:text-black"
          onClick={handleClick}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
