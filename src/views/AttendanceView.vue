<template>
  <div class="attendance-container">
    <!-- Header -->
    <div class="col-md-12 col-sm-12 mb-12">
      <div class="card m-1" style="background-color: rgb(122, 108, 202);">
        <div class="card-body" style="color:white">
          <h5 class="card-title" style="font-size:xx-large;">Attendance Management</h5>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <!-- Filters -->
      <div class="row mb-4">
        <div class="col-md-4 mb-3">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Search employee..."
            v-model="searchQuery"
          />
        </div>
        <div class="col-md-4 mb-3">
          <select class="form-select" v-model="selectedEmployee">
             <option value="">All Employees</option>
             <option v-for="emp in employees" :key="emp.employee_id" :value="emp.employee_id">
                 {{ emp.name }}
             </option>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <input type="date" class="form-control" v-model="selectedDate" />
        </div>
      </div>

      <!-- Attendance Table -->
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">Attendance Records</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="table-light">
                <tr>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in filteredAttendanceRecords" :key="record.attendance_id">
                  <td>{{ record.employee_name }}</td>
                  <td>{{ formatDate(record.date) }}</td>
                  <td>
                    <span :class="getStatusBadgeClass(record.status)">
                      {{ record.status }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editAttendance(record)">
                      Edit
                    </button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteAttendance(record.attendance_id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="statistics row">
        <div class="col-md-4 col-sm-6 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Total Employees</h5>
              <p class="card-text fw-bold fs-3">{{ employees.length }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Attendance Rate</h5>
              <p class="card-text fw-bold fs-3">{{ attendanceRate }}%</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-6 mb-3">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Present / Absent</h5>
              <p class="card-text fw-bold fs-3">{{ attendanceStats.present }} / {{ attendanceStats.absent }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Attendance Modal -->
    <div class="modal fade" id="editAttendanceModal" tabindex="-1" aria-labelledby="editAttendanceModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="updateAttendance">
            <div class="modal-header">
              <h5 class="modal-title" id="editAttendanceModalLabel">Edit Attendance</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" v-model="editRecord.status" required>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const API_URL = "http://localhost:5050/api/attendance";

const employees = ref([]);
const attendanceRecords = ref([]);
const searchQuery = ref('');
const selectedEmployee = ref('');
const selectedDate = ref('');
const editRecord = ref({});

// Fetch attendance and employees
const fetchEmployees = async () => {
  try {
    const res = await axios.get("http://localhost:5050/api/employees"); // Adjust route
    employees.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const fetchAttendance = async () => {
  try {
    const res = await axios.get(API_URL);
    attendanceRecords.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Computed
const filteredAttendanceRecords = computed(() => {
  let records = attendanceRecords.value;

  if (searchQuery.value) {
    records = records.filter(r => r.employee_name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  if (selectedEmployee.value) {
    records = records.filter(r => r.employee_id === selectedEmployee.value);
  }
  if (selectedDate.value) {
    records = records.filter(r => r.date === selectedDate.value);
  }

  return records;
});

const attendanceStats = computed(() => {
  return {
    totalDays: attendanceRecords.value.length,
    present: attendanceRecords.value.filter(r => r.status === 'Present').length,
    absent: attendanceRecords.value.filter(r => r.status === 'Absent').length
  };
});

const attendanceRate = computed(() => {
  if (attendanceStats.value.totalDays === 0) return 0;
  return Math.round((attendanceStats.value.present / attendanceStats.value.totalDays) * 100);
});

// Methods
const formatDate = dateString => new Date(dateString).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
const getStatusBadgeClass = status => {
  if (status === 'Present') return 'badge bg-success';
  if (status === 'Absent') return 'badge bg-danger';
  if (status === 'Late') return 'badge bg-warning text-dark';
  if (status === 'On Leave') return 'badge bg-info text-dark';
  return 'badge bg-secondary';
};

const editAttendance = record => {
  editRecord.value = { ...record };
  const modal = new bootstrap.Modal(document.getElementById('editAttendanceModal'));
  modal.show();
};

const updateAttendance = async () => {
  try {
    await axios.put(`${API_URL}/${editRecord.value.attendance_id}`, { status: editRecord.value.status });
    alert("Attendance updated!");
    fetchAttendance();
    const modal = bootstrap.Modal.getInstance(document.getElementById('editAttendanceModal'));
    modal.hide();
  } catch (err) {
    console.error(err);
    alert("Failed to update attendance");
  }
};

const deleteAttendance = async id => {
  if (confirm("Are you sure you want to delete this attendance record?")) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert("Deleted successfully");
      fetchAttendance();
    } catch (err) {
      console.error(err);
      alert("Failed to delete attendance");
    }
  }
};

// On mount
onMounted(() => {
  fetchEmployees();
  fetchAttendance();
});
</script>

<style scoped>
.attendance-container {
  padding-top: 90px;
  padding-bottom: 30px;
}

.card-header {
  background-color: rgb(122, 108, 202);
  color: white;
  font-weight: bold;
}

.card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.badge {
  font-size: 0.9rem;
}

.statistics .card {
  background-color: rgba(0,0,0,0.87);
  color: white;
}
</style>
