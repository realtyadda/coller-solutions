/**
 * Coller Solutions Attendance & HRMS backend
 * Deploy as a Google Apps Script Web App after binding SCRIPT_PROP.SHEET_ID.
 * Keep the Sheet and selfie/payslip Drive folders private.
 */
const CFG={SHEET_ID:PropertiesService.getScriptProperties().getProperty('SHEET_ID')};
const TABS={
 Employees:["EmployeeID","Name","Mobile","Email","Department","Designation","Active","CreatedAt"],
 Attendance:["RecordID","EmployeeID","Date","CheckIn","CheckInLat","CheckInLng","CheckInSelfieURL","CheckOut","CheckOutLat","CheckOutLng","CheckOutSelfieURL","WorkingHours","Status","RegularizationStatus"],
 Conveyance:["ClaimID","EmployeeID","Date","From","To","Purpose","Vehicle","KM","Rate","Amount","Status","ApprovedKM","ApprovedAmount","Remarks"],
 Settings:["Key","Value"],
 Payslips:["PayslipID","EmployeeID","Month","Gross","Deductions","NetPay","FileURL","Published","CreatedAt"]
};
function setup(){
 const ss=SpreadsheetApp.openById(CFG.SHEET_ID);
 Object.keys(TABS).forEach(n=>{let s=ss.getSheetByName(n)||ss.insertSheet(n);if(s.getLastRow()===0)s.appendRow(TABS[n]);});
 setSetting_("BIKE_RATE","4");setSetting_("CAR_RATE","10");
 ["ATTENDANCE_ENABLED","CONVEYANCE_ENABLED","PAYROLL_ENABLED"].forEach(k=>setSetting_(k,"TRUE"));
 setSetting_("FIELD_GPS_ENABLED","FALSE");
}
function doGet(e){return json_({ok:true,service:"Coller Attendance HRMS",time:new Date().toISOString()});}
function doPost(e){
 try{
  const p=JSON.parse(e.postData.contents||"{}");
  switch(p.action){
   case "checkin": return json_(checkin_(p));
   case "checkout": return json_(checkout_(p));
   case "conveyance": return json_(claim_(p));
   case "myAttendance": return json_(myRows_("Attendance",p.employeeId));
   case "myConveyance": return json_(myRows_("Conveyance",p.employeeId));
   case "myPayslips": return json_(myRows_("Payslips",p.employeeId));
   case "settings": return json_(settings_());
   default:return json_({ok:false,error:"Unknown action"});
  }
 }catch(err){return json_({ok:false,error:String(err.message||err)});}
}
function checkin_(p){
 requireEmployee_(p.employeeId); if(getSetting_("ATTENDANCE_ENABLED")!=="TRUE")throw Error("Attendance disabled");
 const s=sheet_("Attendance"), now=new Date(), id=Utilities.getUuid();
 s.appendRow([id,p.employeeId,date_(now),now,p.lat,p.lng,p.selfieUrl||"","","","","","", "OPEN",""]);
 return {ok:true,recordId:id,checkIn:now};
}
function checkout_(p){
 requireEmployee_(p.employeeId); const s=sheet_("Attendance"),v=s.getDataRange().getValues();
 for(let i=v.length-1;i>0;i--)if(String(v[i][1])===String(p.employeeId)&&!v[i][7]){
   const out=new Date(), hours=(out-new Date(v[i][3]))/36e5;
   s.getRange(i+1,8,1,6).setValues([[out,p.lat,p.lng,p.selfieUrl||"",Number(hours.toFixed(2)),"CLOSED"]]);
   return {ok:true,recordId:v[i][0],checkOut:out,workingHours:Number(hours.toFixed(2))};
 }
 throw Error("No open check-in found");
}
function claim_(p){
 requireEmployee_(p.employeeId); if(getSetting_("CONVEYANCE_ENABLED")!=="TRUE")throw Error("Conveyance disabled");
 const vehicle=String(p.vehicle||"").toLowerCase(), rate=vehicle.includes("car")?Number(getSetting_("CAR_RATE")||10):Number(getSetting_("BIKE_RATE")||4);
 const km=Number(p.km||0), amount=Number((km*rate).toFixed(2)), id=Utilities.getUuid();
 sheet_("Conveyance").appendRow([id,p.employeeId,date_(new Date()),p.from||"",p.to||"",p.purpose||"",p.vehicle||"",km,rate,amount,"PENDING","","",""]);
 return {ok:true,claimId:id,rate,amount,status:"PENDING"};
}
function myRows_(name,id){requireEmployee_(id);const a=sheet_(name).getDataRange().getValues(),h=a.shift();return {ok:true,rows:a.filter(r=>String(r[1])===String(id)).map(r=>Object.fromEntries(h.map((x,i)=>[x,r[i]])))};}
function requireEmployee_(id){const a=sheet_("Employees").getDataRange().getValues();if(!a.slice(1).some(r=>String(r[0])===String(id)&&String(r[6]).toUpperCase()!=="FALSE"))throw Error("Invalid/inactive employee");}
function sheet_(n){return SpreadsheetApp.openById(CFG.SHEET_ID).getSheetByName(n);}
function setSetting_(k,v){const s=sheet_("Settings"),a=s.getDataRange().getValues();for(let i=1;i<a.length;i++)if(a[i][0]===k){s.getRange(i+1,2).setValue(v);return;}s.appendRow([k,v]);}
function getSetting_(k){const a=sheet_("Settings").getDataRange().getValues();for(let i=1;i<a.length;i++)if(a[i][0]===k)return String(a[i][1]);return "";}
function settings_(){const a=sheet_("Settings").getDataRange().getValues();a.shift();return {ok:true,settings:Object.fromEntries(a.filter(r=>r[0]).map(r=>[r[0],r[1]]))};}
function date_(d){return Utilities.formatDate(d,Session.getScriptTimeZone(),"yyyy-MM-dd");}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
