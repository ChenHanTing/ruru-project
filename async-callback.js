// synchronous
/**
 * console.log("Before");
 * const member = getEmployee(1);
 * const info = getMemberInformation(member.employeeName);
 * console.log("After");
 */

// Asynchronous => callback hell or christmas tree problem
console.log("Before");
getEmployee(1, (member) => {
  console.log("Member => ", member);

  // Get member information
  getMemberInformation(member.employeeName, (info) => {
    console.log("Information => ", info);

    // getMemberWithSameStereotype...
  });
});
console.log("After");

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
