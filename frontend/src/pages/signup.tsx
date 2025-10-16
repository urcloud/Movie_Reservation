import React, { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "../commons/button";
import { Input } from "../commons/input";

export const SignupForm = () => {
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birth: "",
    password: "",
    confirm: "",
  });

  // 모든 입력값 변경 핸들러 (input name 속성 이용)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // form submit 이벤트 (회원가입 완료 → 로그인 화면 이동)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, birth, password, confirm } = formData;

    if (!name || !email || !birth || !password || !confirm) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 실제 회원가입 로직은 서버 통신으로 처리해야 함
    console.log("회원가입 정보:", formData);
    alert(`${name}님, 회원가입이 완료되었습니다!`);

    // 회원가입 성공 후 로그인 페이지로 이동
    setLocation("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <Input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
         />
         <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange}
          required
         />
          <Input
          type="date"
          name="birth"
          placeholder="생년월일"
          value={formData.birth}
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
          <Input
          type="password"
          name="confirm"
          placeholder="비밀번호 확인"
          value={formData.confirm}
          onChange={handleChange}
          required
          />
          <Button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-300"
        >
          회원가입
        </Button>
       </form>
    </div>
  </div>
        
  );
};