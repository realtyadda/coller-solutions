# Coller Solutions Attendance System

Internal employee attendance/PWA module. This branch does not add any link or button to the public Coller Solutions website.

## Confirmed scope
- Approx. 30 employees
- Employee and admin access
- Selfie + GPS check-in and check-out
- Automatic working-hours calculation
- Missed check-out regularization
- Employee attendance history/monthly report
- Field/site visit records
- Optional 2-hour field GPS updates where device/browser permissions support it
- Monthly conveyance claims and approval
- Per-km conveyance calculation by travel mode
- From/to, purpose/client/site, kilometres, amount and optional bill/photo
- Admin-managed per-km rates (e.g. bike/scooter and car)
- Monthly attendance/conveyance export

## Planned data layer
Google Apps Script + Google Sheets, with private Google Drive storage for selfies/receipts. Sensitive attendance, GPS and photo data must not be stored in this public GitHub repository.

## Core calculation
Conveyance amount = approved kilometres × configured rate per kilometre.

## Privacy
Location collection should be disclosed to employees and limited to attendance/field-work purposes. The public website remains separate from this internal module.
