import { useState } from "react";
import { Input } from "../commons/input";
import { useLocation } from "wouter";
/* 로그인 폼 */
export function LoginForm() {
    const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMsg("이메일과 비밀번호를 입력하세요.");
      return;
    }
    if (email === "test@example.com" && password === "1234") {
      alert("로그인 성공!");
      return  setLocation("/");
    } else {
      setErrorMsg("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
      <div className="flex flex-col space-y-3">
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-300"
        >
          로그인
        </button>
      </div>
    </div>
    </div>
  );
}
