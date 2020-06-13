// getMember(1, (member) => {
//   console.log('member: ', member);
//   if (member.isHandSome) {
//     getInformation((info) => {
//       console.log('Top info: ', info);
//       sendEmail(member.email, info, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

async function notifyMember() {
  const member = await getMember("s410187018");
  console.log("member: ", member);
  if (member.isHandSome) {
    const info = await getInformation();
    console.log("Top info: ", info);
    await sendEmail(member.email, info);
    console.log(`Email: ${member.email} sent...`);
  }
}
notifyMember();

function getMember(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Chen, Han-Ting",
        isHandSome: true,
        email: "k445566778899k@gmail.com",
      });
    }, 1000);
  });
}

function getInformation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        gender: "male",
        nickname: "漢漢老師",
        position: "Frontend",
        idol: "Kathy",
        teacher: "Kathy",
        technicalChef: "憲哥",
        teamLeader: "俄文",
      });
    }, 1000);
  });
}

function sendEmail(email, info) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
