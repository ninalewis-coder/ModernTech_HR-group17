<template>
    <div class="home-container">
        <div>
            <div>
                <div class="col-md-12 col-sm-12 mb-12">
                    <img 
                    src="/src/assets/ModernTech-light.png" 
                    alt="logo"
                    class="responsive-logo"
                    />
                    <div class="card" style="background-color: rgb(122, 108, 202);">
                        <div class="card-body" style="color:white">
                            <h5 class="card-title" style="font-size:xx-large;">
                                Hello {{ userName }}!
                            </h5>
                            <p class="card-text">Here's what's happening with your team today!</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Key Metrics -->
            <div class="row mb-4">
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <h5 class="card-title">Total Employees</h5>
                            <p class="card-text fw-bold">{{ 9 }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <h5 class="card-title">Pending Leave Requests</h5>
                            <p class="card-text">{{ 9 }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <h5 class="card-title">Pending Payroll</h5>
                            <p class="card-text">{{ 9 }}.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card stat-card">
                        <div class="card-body">
                            <h5 class="card-title">Departments</h5>
                            <p class="card-text">{{ 9 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        

            <!-- Charts Section -->
            <div class="row">
                <div class="col-lg-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <h5 class="mb-0 fw-bold">Employee by Department</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container" style="position: relative; height:300px">
                            <!-- Chart Placeholder -->
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-4">
                    <div class="card border-0 shadow-sm">
                        <h5 class="mb-0 fw-bold">Leave Request</h5>
                    </div>
                    <div class="card-body">
                        <div class="chart-container" style="position: relative; height:300px">
                            <!-- Chart Placeholder -->
                        </div>
                    </div>
                </div>
            </div>


            <!-- Recent Activities -->
            
            
        </div>
    </div> 
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'HomeView',
    setup() {
        const userName = ref('Admin');
        
        return {
            userName
        };
    }
};
</script>

<style scoped>
.home-container {
    padding-top: 50px;
    margin: 20px;
}

.card-welcome{
    margin: 20px;
    background-color: rgb(122, 108, 202);
    font-weight: bold;
}

.row {
    margin: 20px;
   align-items: center;
}

.stat-card {
    min-height: 120px;
    max-height: 120px;
}

.card-title {
    color: black;
    font-size: clamp(17px, 2vw, 20px);
}

img {
    align-items: center;
}

.responsive-logo {
  display: block;
  margin: 0 auto;

  width: 60%;
  max-width: 280px;
}

</style>

