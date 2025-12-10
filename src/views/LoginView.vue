<template>
  <div class="login-page">
    <div class="background">
    <div class="login-box">
        
    <router-view />
      <h2>Login</h2>

      <form @submit.prevent="login">
        <label>Email</label>
        <input type="email" v-model="email" required />

        <label>Password</label>
        <input type="password" v-model="password" required />

        <button type="submit">Login</button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <div>
    <div v-if="step === 1">
      <input v-model="email" placeholder="Enter your email" />
      <button @click="sendReset">Reset Password</button>
      <p v-if="error">{{ error }}</p>
    </div>

    <div v-else-if="step === 2">
      <input v-model="newPassword" type="password" placeholder="New password" />
      <input v-model="confirmNew" type="password" placeholder="Confirm password" />
      <button @click="updatePassword">Forgot Password</button>
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
    </div>
  </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

// Shared password for now
const defaultPassword = "1234";

// Full employee list
const employees = [
  { employeeId: 1, name: "Sibongile Nkosi", position: "Software Engineer", contact: "sibongile.nkosi@moderntech.com" },
  { employeeId: 2, name: "Lungile Moyo", position: "HR Manager", contact: "lungile.moyo@moderntech.com" },
  { employeeId: 3, name: "Thabo Molefe", position: "Quality Analyst", contact: "thabo.molefe@moderntech.com" },
  { employeeId: 4, name: "Keshav Naidoo", position: "Sales Representative", contact: "keshav.naidoo@moderntech.com" },
  { employeeId: 5, name: "Zanele Khumalo", position: "Marketing Specialist", contact: "zanele.khumalo@moderntech.com" },
  { employeeId: 6, name: "Sipho Zulu", position: "UI/UX Designer", contact: "sipho.zulu@moderntech.com" },
  { employeeId: 7, name: "Naledi Moeketsi", position: "DevOps Engineer", contact: "naledi.moeketsi@moderntech.com" },
  { employeeId: 8, name: "Farai Gumbo", position: "Content Strategist", contact: "farai.gumbo@moderntech.com" },
  { employeeId: 9, name: "Karabo Dlamini", position: "Accountant", contact: "karabo.dlamini@moderntech.com" },
  { employeeId: 10, name: "Fatima Patel", position: "Customer Support Lead", contact: "fatima.patel@moderntech.com" }
];

const login = () => {
  // Check password first
  if (password.value !== defaultPassword) {
    error.value = "Incorrect password";
    return;
  }

  // Find employee by email
  const user = employees.find(e => e.contact === email.value);

  if (!user) {
    error.value = "Email not recognized";
    return;
  }

  // HR admin login
  if (user.position === "HR Manager") {
    localStorage.setItem("role", "hr");
    localStorage.setItem("userName", user.name);
    router.push("/admin-dashboard");
  }
  // Employee login
  else {
    localStorage.setItem("role", "employee");
    localStorage.setItem("userName", user.name);
    localStorage.setItem("employeeId", user.employeeId);
    router.push("/employee-dashboard");
  }
};
</script>


<style>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
}
.login-box {
  width: 650px;
  padding: 160px;
  border-radius: 12px;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
}
input {
  width: 100%;
  padding: 10px;
  margin: 8px 0 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  width: 100%;
  padding: 12px;
  background: rgb(122, 108, 202);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.error {
  color: red;
  text-align: center;
  margin-top: 10px;
}
.background {
  width: 600px;
  height: 600px;
  background-image: url('@/assets/logo.png');
  background-size: cover;       
  background-position: center;   
  background-repeat: no-repeat;  
}
</style>
