# Coller Solutions Attendance & HRMS

Internal employee module only. No link/button is added to the public Coller Solutions website.

## Implemented UI
- Employee attendance: selfie + GPS check-in/check-out
- Working-hours/report entry points
- Missing check-out regularization entry point
- Conveyance claim UI
- Bike/Scooter rate: ₹4/km
- Car rate: ₹10/km
- Employee HRMS page with attendance, conveyance, salary and payslip sections
- Admin HRMS controls to enable/disable Attendance, Conveyance, Payroll/Payslip and Field GPS
- Admin entry points for employee master, attendance review, regularization, conveyance approvals, payroll and reports

## Data/backend still required
Google Apps Script + private Google Sheets/Drive should store employee master, attendance timestamps, GPS, selfies, claims, approvals, salary and payslips. Sensitive data must not be committed to this public repository.

## Privacy
Employees should be informed about GPS/selfie collection. Collect location only for attendance/field-work purposes and apply appropriate retention/access controls.
