getMember("s410187018", (Member) => {
  console.log("Member: ", Member);
  if (Member.isHandSome) {
    getInformation((info) => {
      console.log("Personal Information: ", info);
      sendEmail(Member.email, info, () => {
        console.log(`Email: ${Member.email} sent...`);
      });
    });
  }
});

function getMember(id, callback) {
  setTimeout(() => {
    callback({
      id: id,
      name: "Chen, Han-Ting",
      isHandSome: true,
      email: "k445566778899k@gmail.com",
    });
  }, 1000);
}

function getInformation(callback) {
  setTimeout(() => {
    callback({
      gender: "male",
      nickname: "漢漢老師",
      position: "Frontend",
      idol: "Kathy",
      teacher: "Kathy",
      technicalChef: "憲哥",
      teamLeader: "俄文",
    });
  }, 1000);
}

function sendEmail(email, info, callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}
