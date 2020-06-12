// Asynchronous => callback hell or christmas tree problem
console.log("Before");
 
getEmployee(1, getMemberInfo);

console.log("After");

function getMemberInfo(member) {
  console.log("Member => ", member);
  getMemberInformation(member.employeeName, displayInfo); // passing reference, not calling function
}

function displayInfo(info) {
  console.log("Information => ", info);
}

// Cannot use arrow function
function getEmployee(id, callback) {
  setTimeout(() => {
    console.log("Reading a member from a database...");
    callback({ id: id, employeeName: "Han" });
  }, 2000);
}

function getMemberInformation(memberName, callback) {
  setTimeout(() => {
    console.log("Calling this member's information...");
    callback({
      name: memberName,
      number: "113113",
      stereotype: "Taurus",
      nickname: "漢漢老師",
    });
  }, 2000);
}
