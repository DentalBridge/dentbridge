# DentBridge - Receptionist Quick Reference Guide

## 🏥 Daily Clinic Operations Guide

This guide covers the essential tasks performed by clinic receptionists for daily operations.

---

## 🔐 Getting Started

### Login
1. Open browser and go to: **http://localhost:5173**
2. Enter your credentials
3. Click **Sign In**

You'll be directed to the **Dashboard** showing today's overview.

---

## 👥 Task 1: Adding New Patients (When patients call/visit)

### When a new patient calls or visits:

1. Click **Patients** in the sidebar
2. Click **"Add Patient"** button (top right)
3. Fill in the form:

   **Required Fields:**
   - ✅ **Name**: Patient's full name
   - ✅ **Gender**: Select Male/Female/Other

   **Optional but Important:**
   - 📧 **Email**: For appointment reminders
   - 📱 **Phone**: Contact number (important!)
   - 📅 **Date of Birth**: For age calculation
   - 🏠 **Address**: Patient's address
   - 📋 **Medical History**: Any relevant conditions
   - ⚠️ **Allergies**: Important for treatment!

4. Click **"Add Patient"**
5. Success! Patient is now in the system

### Finding Existing Patients:
- Use the **Search bar** at the top
- Search by: Name, Email, or Phone number
- Click **"View"** to see patient details
- Click **"Edit"** to update information

---

## 📅 Task 2: Scheduling Appointments (Multiple requests throughout the day)

### When a patient calls to book an appointment:

1. Click **Appointments** in the sidebar
2. Click **"Schedule Appointment"** button
3. Fill in the appointment form:

   **Required Information:**
   - ✅ **Patient**: Select from dropdown (search by name)
   - ✅ **Date & Time**: Pick appointment date and time
   - ✅ **Duration**: Select duration (15, 30, 45, 60, 90, or 120 minutes)
   - ✅ **Status**:
     - Choose **"Scheduled"** when first booking
     - Change to **"Confirmed"** when patient confirms
     - Use **"Completed"** after visit
     - Use **"Cancelled"** if patient cancels
     - Use **"No Show"** if patient doesn't arrive

   **Optional but Useful:**
   - 🦷 **Treatment Type**: e.g., "Checkup", "Cleaning", "Root Canal"
   - 📝 **Notes**: Any special instructions or patient requests

4. Click **"Schedule Appointment"**
5. Success! Appointment is booked

### Managing Appointments:
- **View all appointments**: See them in the table
- **Filter by Status**: Use the dropdown at top (Scheduled, Confirmed, etc.)
- **Edit appointment**: Click **"Edit"** button
- **Cancel appointment**: Click **"Delete"** button (requires confirmation)

### Common Scenarios:
- **Patient calls to reschedule**: Click "Edit" on their appointment, change date/time
- **Patient confirms**: Click "Edit", change Status to "Confirmed"
- **Patient cancels**: Click "Delete" to remove appointment
- **Multiple appointments**: Just repeat the process for each patient call

---

## 📦 Task 3: Checking Inventory (Daily maintenance)

### To check what supplies are available:

1. Click **Inventory** in the sidebar
2. View the list of all items
3. Check the **Status** column:
   - 🟢 **Green badge "In Stock"**: Sufficient quantity
   - 🔴 **Red badge "Low Stock"**: Need to reorder soon

### Looking up specific items:
- Scroll through the list
- Check **Quantity** column for current stock
- Check **Unit Price** if needed
- See **Category** for organization

---

## 📥 Task 4: Adding New Inventory Items (When supplies arrive)

### When new supplies arrive at the clinic:

1. Click **Inventory** in the sidebar
2. Click **"Add Item"** button
3. Fill in the item details:

   **Required Information:**
   - ✅ **Item Name**: e.g., "Dental Mirror", "Latex Gloves"
   - ✅ **Quantity**: How many units received

   **Recommended Information:**
   - 📦 **Category**: e.g., "Instruments", "Materials", "Consumables"
   - 💰 **Unit Price**: Price per unit
   - 📏 **Unit of Measure**: e.g., "pieces", "boxes", "packs"
   - 🔔 **Reorder Level**: Minimum quantity before reordering
   - 🏪 **Supplier**: Vendor name
   - 📝 **Description**: Additional notes

4. Click **"Add Item"**
5. Success! Item is now tracked in inventory

### Updating Existing Items:
- Click **"Edit"** button on any item
- Update the **Quantity** when restocking
- Change other details as needed
- Click **"Update Item"**

---

## 💰 Task 5: Recording Payments (Manual entry)

### When a patient makes a payment:

1. Click **Payments** in the sidebar
2. Click **"Record Payment"** button
3. Fill in payment details:

   **Required Information:**
   - ✅ **Patient**: Select from dropdown
   - ✅ **Amount**: Payment amount (e.g., 150.00)
   - ✅ **Payment Date**: Usually today's date
   - ✅ **Payment Method**: Select from:
     - 💵 Cash
     - 💳 Card
     - 🏥 Insurance
     - 🏦 Bank Transfer
     - 📝 Other
   - ✅ **Status**:
     - **"Paid"** for completed payments
     - **"Pending"** if waiting for payment
     - **"Refunded"** if money returned

   **Optional:**
   - 📅 **Appointment ID**: Link to specific appointment
   - 📝 **Notes**: Payment details or receipt number

4. Click **"Record Payment"**
5. Success! Payment is recorded

### Payment Dashboard:
At the top of Payments page, you'll see:
- 💰 **Total Paid**: All completed payments
- ⏳ **Total Pending**: Outstanding payments
- 📊 **Total Payments**: Count of all payment records

---

## 📋 Daily Receptionist Workflow

### Morning Routine:
1. ✅ Login to system
2. ✅ Check Dashboard for today's appointments
3. ✅ Review Inventory for low stock items
4. ✅ Check any pending payments

### When Phone Rings:
1. **New Patient**: Add Patient → Add their details → Schedule Appointment
2. **Existing Patient**: Search Patient → Schedule Appointment
3. **Reschedule Request**: Find Appointment → Edit → Change date/time
4. **Cancellation**: Find Appointment → Delete

### When Patient Arrives:
1. ✅ Update appointment status to "Confirmed"
2. ✅ Record payment if they pay before treatment
3. ✅ After treatment: Update status to "Completed"

### When Patient Pays:
1. ✅ Go to Payments
2. ✅ Record payment with correct method
3. ✅ Give them receipt (write down system ID if needed)

### End of Day:
1. ✅ Review all appointments (mark completed/no-show)
2. ✅ Check pending payments
3. ✅ Note any low stock items for ordering

---

## 🆘 Quick Troubleshooting

### Can't find a patient?
- Use the **Search bar** in Patients page
- Try searching by phone number or email
- Check spelling of name

### Appointment time conflict?
- Check the appointments list before scheduling
- Look for overlapping times
- Edit or cancel conflicting appointment if needed

### Made a mistake?
- **Patients/Inventory/Payments**: Click "Edit" to fix
- **Appointments**: Click "Edit" to modify or "Delete" to remove
- All changes are instant

### Need to update something?
- Every record has an **"Edit"** button
- Make your changes
- Click **"Update"** or **"Save"**

---

## 💡 Tips for Efficient Work

1. **Keep patient information updated**: Always ask for phone/email
2. **Confirm appointments**: Change status to "Confirmed" when patient confirms
3. **Use notes field**: Add special requests or instructions
4. **Check low stock daily**: Reorder before running out
5. **Record payments immediately**: Don't wait until end of day
6. **Use treatment type**: Helps dentist prepare for appointment
7. **Search is your friend**: Use search instead of scrolling

---

## 🔢 Keyboard Shortcuts

- **Tab**: Move to next field in forms
- **Enter**: Submit form (when in text field)
- **Esc**: Close modal/cancel
- **Click outside modal**: Close without saving

---

## 📱 Contact for Help

If you encounter any technical issues:
- Contact IT support
- Keep note of any error messages
- Try refreshing the page (F5)

---

## ✅ Daily Checklist for Receptionist

### Start of Day:
- [ ] Login to system
- [ ] Check today's appointments
- [ ] Review low stock items

### During Day:
- [ ] Add new patients as they call
- [ ] Schedule appointments immediately
- [ ] Update appointment statuses
- [ ] Record payments when received

### End of Day:
- [ ] Mark all completed appointments
- [ ] Record any pending payments
- [ ] Note low stock items
- [ ] Logout from system

---

**Remember**: The system saves everything immediately. No need to click "Save" - just complete the form and submit!

**Need to cancel?** Just click the X or "Cancel" button in any form.
