const input = [
    {
      name: "Hendrick",
      dob: "1853-07-18T00:00:00.000Z",
      regNo: "041",
    },
    {
      name: "Albert",
      dob: "1879-03-14T00:00:00.000Z",
      regNo: "033",
    },
    {
      name: "Marie",
      dob: "1867-11-07T00:00:00.000Z",
      regNo: "024",
    },
    {
      name: "Neils",
      dob: "1885-10-07T00:00:00.000Z",
      regNo: "02",
    },
    {
      name: "Max",
      dob: "1858-04-23T00:00:00.000Z",
      regNo: "014",
    },
    {
      name: "Erwin",
      dob: "1887-08-12T00:00:00.000Z",
      regNo: "09",
    },
    {
      name: "Auguste",
      dob: "1884-01-28T00:00:00.000Z",
      regNo: "08",
    },
    {
      name: "Karl",
      dob: "1901-12-05T00:00:00.000Z",
      regNo: "120",
    },
    {
      name: "Louis",
      dob: "1892-08-15T00:00:00.000Z",
      regNo: "022",
    },
    {
      name: "Arthur",
      dob: "1892-09-10T00:00:00.000Z",
      regNo: "321",
    },
    {
      name: "Paul",
      dob: "1902-08-08T00:00:00.000Z",
      regNo: "055",
    },
    {
      name: "William",
      dob: "1890-03-31T00:00:00.000Z",
      regNo: "013",
    },
    {
      name: "Owen",
      dob: "1879-04-26T00:00:00.000Z",
      regNo: "052",
    },
    {
      name: "Martin",
      dob: "1871-02-15T00:00:00.000Z",
      regNo: "063",
    },
    {
      name: "Guye",
      dob: "1866-10-15T00:00:00.000Z",
      regNo: "084",
    },
    {
      name: "Charles",
      dob: "1868-02-14T00:00:00.000Z",
      regNo: "091",
    },
  ];
  
  function classifyStudents(input) {
    const currentYear = 2019;
    const students = input.map((student) => {
      const dobYear = new Date(student.dob).getFullYear();
      const age = currentYear - dobYear;
      return { ...student, age };
    });
  
    students.sort((a, b) => a.age - b.age);
  
    const groups = {};
  
    students.forEach((student) => {
      let addedToGroup = false;
  
      for (const group in groups) {
        const oldestAge = groups[group].members[0].age;
        if (student.age - oldestAge <= 5 && groups[group].members.length < 3) {
          groups[group].members.push(student);
          addedToGroup = true;
          break;
        }
      }
  
      if (!addedToGroup) {
        const groupName = `group${Object.keys(groups).length + 1}`;
        groups[groupName] = {
          members: [student],
          oldest: student.age,
          sum: student.age,
          regNos: [student.regNo],
        };
      }
    });
  
    for (const group in groups) {
      const members = groups[group].members;
      const ages = members.map((member) => member.age);
      const regNos = members.map((member) => parseInt(member.regNo)).sort((a, b) => a - b);
  
      groups[group].oldest = Math.max(...ages);
      groups[group].sum = ages.reduce((sum, age) => sum + age, 0);
      groups[group].regNos = regNos;
    }
  
    return {
      noOfGroups: Object.keys(groups).length,
      ...groups,
    };
  }
  
  module.exports = classifyStudents;
  