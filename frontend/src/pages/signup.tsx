import { useState } from "react";
import { Input } from "../commons/input";

export const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = () => {
    if (!name || !email || !birth || !password || !confirm) {
      setErrorMsg("모든 항목을 입력하세요.");
      return;
    }
    if (password !== confirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입 성공!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className=" bg-white shadow-lg rounded-2xl p-8 w-96">
      <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
      <div className="flex flex-col space-y-3">
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        <button
          onClick={handleSignup}
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-300"
        >
          회원가입
        </button>
      </div>
    </div>
</div>
  );
}