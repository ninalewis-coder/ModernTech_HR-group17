<template>
  <div class="leave-container">
    <!-- Header -->
    <div class="col-md-12 mb-3">
      <div class="card m-1" style="background-color: rgb(122,108,202)">
        <div class="card-body text-white">
          <h5 class="card-title" style="font-size:xx-large;">Leave Management</h5>
        </div>
      </div>
    </div>

    <!-- Add Leave Button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#leaveModal">
        <i class="bi bi-plus-circle"></i> Request Leave
      </button>
    </div>

    <!-- Statistics -->
    <div class="row mb-4">
      <div class="col-md-4 mb-3">
        <div class="card bg-warning text-dark text-center">
          <div class="card-body">
            <h6>Pending Requests</h6>
            <h2>{{ pendingCount }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card bg-success text-white text-center">
          <div class="card-body">
            <h6>Approved Requests</h6>
            <h2>{{ approvedCount }}</h2>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card bg-danger text-white text-center">
          <div class="card-body">
            <h6>Denied Requests</h6>
            <h2>{{ deniedCount }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <button class="nav-link" :class="{active: activeTab==='all'}" @click="activeTab='all'">All Requests</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: activeTab==='pending'}" @click="activeTab='pending'">Pending</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: activeTab==='approved'}" @click="activeTab='approved'">Approved</button>
          </li>
          <li class="nav-item">
            <button class="nav-link" :class="{active: activeTab==='denied'}" @click="activeTab='denied'">Denied</button>
          </li>
        </ul>
      </div>

      <!-- Leave Table -->
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in filteredLeaveRequests" :key="request.leave_id">
                <td>{{ request.employee_name }}</td>
                <td>{{ request.leave_type }}</td>
                <td>{{ formatDate(request.start_date) }}</td>
                <td>{{ formatDate(request.end_date) }}</td>
                <td>{{ calculateDuration(request.start_date, request.end_date) }} day(s)</td>
                <td>{{ request.reason }}</td>
                <td>
                  <span :class="getStatusBadgeClass(request.status)">
                    {{ request.status }}
                  </span>
                </td>
                <td>
                  <button 
                    v-if="request.status==='Pending'" 
                    class="btn btn-sm btn-success me-1"
                    @click="approveRequest(request.leave_id)">
                    Approve
                  </button>
                  <button 
                    v-if="request.status==='Pending'" 
                    class="btn btn-sm btn-danger"
                    @click="denyRequest(request.leave_id)">
                    Deny
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="leaveModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Submit Leave Request</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="submitLeaveRequest">
            <div class="modal-body">
              <div class="mb-3">
                <label>Employee *</label>
                <select class="form-select" v-model="newRequest.employee_id" required>
                  <option value="">-- Select --</option>
                  <option v-for="emp in employees" :key="emp.employee_id" :value="emp.employee_id">
                    {{ emp.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label>Type of Leave *</label>
                <select class="form-select" v-model="newRequest.leave_type" required>
                  <option value="">-- Select --</option>
                  <option>Personal</option>
                  <option>Sick</option>
                  <option>Maternity</option>
                  <option>Vacation</option>
                  <option>Family Responsibility</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label>Start Date *</label>
                  <input type="date" class="form-control" v-model="newRequest.start_date" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label>End Date *</label>
                  <input type="date" class="form-control" v-model="newRequest.end_date" required />
                </div>
              </div>
              <div class="mb-3">
                <label>Reason *</label>
                <textarea class="form-control" v-model="newRequest.reason" rows="3" required></textarea>
              </div>
              <div class="alert alert-info" v-if="calculateDays>0">
                Duration: {{ calculateDays }} day(s)
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const API_URL = "http://localhost:5050/api/leave";

const employees = ref([]);
const leaveRequests = ref([]);
const activeTab = ref("all");

const newRequest = ref({
  employee_id: "",
  leave_type: "",
  start_date: "",
  end_date: "",
  reason: ""
});

// Fetch employees and leave requests
const fetchEmployees = async () => {
  try {
    const res = await axios.get("http://localhost:5050/api/employees");
    employees.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const fetchLeaveRequests = async () => {
  try {
    const res = await axios.get(API_URL);
    leaveRequests.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Approve / Deny
const approveRequest = async (id) => {
  try {
    await axios.put(`${API_URL}/${id}`, { status: "Approved" });
    fetchLeaveRequests();
  } catch (err) {
    console.error(err);
  }
};

const denyRequest = async (id) => {
  try {
    await axios.put(`${API_URL}/${id}`, { status: "Denied" });
    fetchLeaveRequests();
  } catch (err) {
    console.error(err);
  }
};

// Submit new leave request
const submitLeaveRequest = async () => {
  try {
    await axios.post(API_URL, newRequest.value);
    newRequest.value = { employee_id: "", leave_type: "", start_date: "", end_date: "", reason: "" };
    fetchLeaveRequests();
    const modal = bootstrap.Modal.getInstance(document.getElementById("leaveModal"));
    if (modal) modal.hide();
  } catch (err) {
    console.error(err);
  }
};

// Computed
const pendingCount = computed(() => leaveRequests.value.filter(r => r.status==="Pending").length);
const approvedCount = computed(() => leaveRequests.value.filter(r => r.status==="Approved").length);
const deniedCount = computed(() => leaveRequests.value.filter(r => r.status==="Denied").length);

const filteredLeaveRequests = computed(() => {
  if (activeTab.value === "all") return leaveRequests.value;
  return leaveRequests.value.filter(r => r.status.toLowerCase() === activeTab.value);
});

const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" });
const calculateDuration = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.ceil((e-s)/(1000*60*60*24))+1;
};

const getStatusBadgeClass = (status) => {
  if (status==="Approved") return "badge bg-success";
  if (status==="Denied") return "badge bg-danger";
  return "badge bg-warning text-dark";
};

// Auto fetch data
onMounted(() => {
  fetchEmployees();
  fetchLeaveRequests();
});

const calculateDays = computed(() => {
  if (newRequest.value.start_date && newRequest.value.end_date) {
    const s = new Date(newRequest.value.start_date);
    const e = new Date(newRequest.value.end_date);
    return Math.ceil((e-s)/(1000*60*60*24))+1;
  }
  return 0;
});
</script>

<style scoped>
.leave-container { padding-top: 80px; padding-bottom: 30px; }
.table-responsive { max-height: 500px; overflow-y: auto; }
.nav-link { cursor: pointer; }
</style>
