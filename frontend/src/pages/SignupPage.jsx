import React, {useState} from 'react'


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  return (
    <div>SignupPage</div>
  ) 
}

export default SignupPage