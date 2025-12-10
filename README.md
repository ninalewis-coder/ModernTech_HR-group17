# ModernTech HR System - Group 17

A modern, responsive web-based HR Management System built with Vue.js and Bootstrap for ModernTech Solutions.

## Project Overview

This is a front-end proof-of-concept HR system designed to centralize and streamline HR operations including:
- Employee information management
- Attendance tracking
- Leave request management
- Payroll processing and payslip generation
- Performance review submission and tracking
- Secure authentication with role-based access

## Case Study Background

ModernTech Solutions is a software development company that has grown from 20 to 250 employees. This HR system addresses their pain points by replacing fragmented spreadsheet-based processes with a unified, user-friendly web application.

## Features

### 1. Authentication & Security
- Secure login page with credential validation
- Session management using localStorage
- Protected routes with navigation guards
- Role-based access control (Admin/Manager)
- Logout functionality with session cleanup

### 2. Dashboard (Home)
- Real-time metrics display (Total employees, pending leaves, payroll, departments)
- Department distribution visualization
- Leave request status overview
- Recent attendance records
- Top performing departments

### 3. Employee Management
- Centralized employee database
- View and manage employee information
- Search and filter capabilities by name and department
- Employee details including position, department, and salary
- Department breakdown with statistics
- Employee count and salary analytics

### 4. Attendance Management
- Track employee attendance (Present/Absent)
- Filter by employee and date
- Attendance statistics and reports
- Attendance rate calculation
- Summary cards showing total days, present, and absent counts

### 5. Leave Management
- Submit leave requests with automatic duration calculation
- Approve/Deny leave requests
- Track request status (Pending, Approved, Denied)
- Filter requests by status
- Leave type categorization (Personal, Sick, Vacation, etc.)
- Tabbed interface for better organization

### 6. Payroll Management
- Automated payroll calculation
- View detailed payroll records
- Generate digital payslips
- Track hours worked and deductions
- Download payslips as PDF using jsPDF library
- Professional PDF formatting with company branding

### 7. Performance Reviews
- Submit employee performance reviews
- Simple review form with employee selection and period
- View past reviews with full details
- Review history tracking by employee and department
- Statistics dashboard showing total reviews and trends

## Technical Stack

- Framework: Vue.js 3.5.25 (Composition API with script setup)
- UI Framework: Bootstrap 5.3.8
- Icons: Bootstrap Icons 1.11.3
- State Management: Pinia
- Routing: Vue Router 4
- Build Tool: Vite
- PDF Generation: jsPDF
- Data Storage: JSON files (client-side dummy data)

## Project Structure

```
ModernTech_HR-group17/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and static resources
│   ├── components/     # Reusable Vue components
│   │   └── Navbar.vue  # Navigation component with auth
│   ├── data/           # Dummy JSON data files
│   │   ├── attendance.json
│   │   ├── employee_info.json
│   │   └── payroll_data.json
│   ├── router/         # Vue Router configuration
│   │   └── index.js    # Routes with authentication guards
│   ├── stores/         # Pinia store modules
│   │   ├── employeeStore.js
│   │   ├── leaveStore.js
│   │   └── payrollStore.js
│   ├── views/          # Page components
│   │   ├── LoginView.vue       # Authentication page
│   │   ├── HomeView.vue        # Dashboard
│   │   ├── AttendanceView.vue  # Attendance management
│   │   ├── EmployeesView.vue   # Employee directory
│   │   ├── LeaveView.vue       # Leave requests
│   │   ├── PayrollView.vue     # Payroll and payslips
│   │   └── ReviewView.vue      # Performance reviews
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (v20.19.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```sh
git clone https://github.com/ninalewis-coder/ModernTech_HR-group17.git
cd ModernTech_HR-group17
```

2. Install dependencies:
```sh
npm install
```

3. Run the development server:
```sh
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

The application will redirect you to the login page.

### Login Credentials

Use these demo credentials to access the system:

Admin Account:
- Email: hr.admin@moderntech.com
- Password: admin123

Manager Account:
- Email: hr.manager@moderntech.com
- Password: manager123

### Build for Production

```sh
npm run build
```

The production-ready files will be in the `dist/` folder.

## Navigation

After logging in, use the navigation menu to access:
- Home - Dashboard with overview metrics
- Attendance - Employee attendance tracking
- Employees - Employee directory and management
- Leave - Leave request submission and approval
- Payroll - Payroll processing and payslip downloads
- Reviews - Performance review submission and history

Click on your username in the navbar to access the logout option.

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1920px and above)
- Tablets (768px - 1024px)
- Smartphones (320px - 767px)

All views adapt to screen size with mobile-friendly controls and layouts.

## User Interface

- Clean and Modern: Intuitive interface with card-based layouts
- Color-Coded: Status indicators and badges for quick visual reference
- Interactive: Hover effects, smooth transitions, and modal dialogs
- Accessible: Bootstrap components ensure accessibility standards
- Consistent: Unified design language across all pages
- Icon-Based: Bootstrap Icons for clear visual communication

## Security Features

- Route Protection: All pages except login require authentication
- Session Management: Automatic redirect to login if not authenticated
- Secure Logout: Clears all session data and returns to login
- Navbar Hiding: Navbar only visible after successful authentication
- Credential Validation: Email and password verification before access

## Data Management

All data is stored in JSON files and manipulated on the client-side. This is a front-end only application with no backend integration, perfect for demonstration and proof-of-concept purposes.

### Dummy Data Includes:
- 10 employees across multiple departments
- 50+ attendance records with Present/Absent status
- Multiple leave requests with various statuses
- Payroll data with hours worked, deductions, and net salary
- Sample performance reviews with ratings and feedback

## Key Functionality Demonstrations

### Authentication Flow
- Login page as default entry point
- Credential validation with error messaging
- Session persistence across page refreshes
- Secure logout with session cleanup

### Employee Data Centralization
- Single source of truth for employee information
- Easy access to personal details, employment history, and contact information
- Search and filter capabilities for quick lookup

### Automated Payroll Calculations
- Hours worked tracking
- Leave deduction calculations
- Net salary computation
- Digital payslip generation with PDF download
- Professional formatting with company branding

### Leave Request System
- Automatic duration calculation (day counting)
- Status workflow (Pending to Approved/Denied)
- Employee-wise leave history
- Approval and denial workflow with comments

### Attendance Tracking
- Daily attendance recording
- Status filtering and search
- Attendance rate analytics
- Summary statistics and trends

### Performance Reviews
- Simple review submission form
- Employee and period selection
- Review history with full details
- Department-wise tracking

## Browser Compatibility

Tested and compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (latest)

## Dependencies

Key npm packages used:
- vue: 3.5.25
- vue-router: 4.5.0
- pinia: 2.3.0
- bootstrap: 5.3.8
- jspdf: 2.5.2

## Development Team - Group 17

This project was developed as part of a front-end web development case study.

## License

This project is developed for educational purposes as part of a case study assignment.

## Future Enhancements

Potential improvements for a production version:
- Backend API integration for data persistence
- Real-time notifications for leave approvals
- Advanced reporting and analytics
- Email notifications for important events
- File upload for employee documents
- Multi-language support
- Dark mode theme option
- Export functionality for reports

## Acknowledgments

- ModernTech Solutions case study provided by the course instructors
- Bootstrap team for the excellent UI framework
- Vue.js community for comprehensive documentation
- jsPDF library for PDF generation capabilities

---

For questions or support, please contact the development team.

**Note:** This is a front-end only application using dummy data. No actual employee data is stored or processed. All interactions happen on the client-side.
