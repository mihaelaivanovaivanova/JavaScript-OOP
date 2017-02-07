/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
  var Course = (function () {
    const EXAM_PERCENTAGE_OF_FINAL_SCORE = 0.75;
    const HOMEWORK_PERCENTAGE_OF_FINAL_SCORE = 0.25;

    function titleValidation(title) {
      if (!title) {
        throw "The course must have a title!";
      } else if (title.trim() !== title) {
        throw "Title can not start or end with whitespace!";
      } else if (!title.length) {
        throw "Title must contain at least one symbol!";
      } else if (title.indexOf("  ") >= 0) {
        throw "Titles can not have consecutive spaces!";
      }
    }

    function nameValidation(name) {
      if (name[0] !== name[0].toUpperCase()) {
        throw "Name must start with an upper case letter";
      }

      let lowerNamePart = name.slice(1);

      if (lowerNamePart.toLowerCase() !== lowerNamePart) {
        throw "Only the first letter of the name can be an upper case letter!";
      }
    }

    function idValidation(id,minRange, maxRange) {
      if (id === 'undefined') {
        throw "Id must be provided!";
      } else if (isNaN(+id)) {
        throw "Id must be a number!";
      } else if (+id % 1 !== 0 ) {
        throw "Id mus be a possitive integer!";
      } else if (+id > maxRange||+id<minRange) {
        throw "Such id does not exist!";
      }
      else{
        return;
      }
    }

    function createId() {
      var id = 0;
      return function () {
        id += 1;
        return id;
      }
    }

    var studentID = createId();

    function init(title, presentations) {

      titleValidation(title);

      if (!presentations) {
        throw "Plese provide presentations for creating a course!";
      } else if (!presentations.length) {
        throw "There must be at least one presentation!";
      }

      presentations.forEach(presentation => titleValidation(presentation));

      this.title = title;
      this.presentations = presentations;
      this.students = [];
      this.homeworks = [];

      return this;
    }

    function addStudent(name) {
      if (!name) {
        throw 'Name must be provided';
      } else if (typeof name !== 'string') {
        throw 'Name must be a string.';
      } else if (name.trim().indexOf(" ") < 0) {
        throw "Name must be in the following format: Firstname Lastname";
      }

      let splitedName = name.split(" ");

      if (splitedName.length !== 2) {
        throw "Please enter exactly two names - Firstname and Lastname"
      }

      nameValidation(splitedName[0]);
      nameValidation(splitedName[1]);

      firstName = splitedName[0];
      lastName = splitedName[1];
      let id = studentID();
      var student = {
        firstname: firstName,
        lastname: lastName,
        id: id,
        finalScore: null
      };

      this.students.push(student);
      return id;

    }

    function getAllStudents() {
      let allStudents = this.students.slice();

      return allStudents;
    }

    function submitHomework(studentID, homeworkID) {
      idValidation(studentID,1, this.students.length);
      idValidation(homeworkID,1, this.presentations.length);

      if (!this.homeworkID[studentID]) {
        this.homeworkID[studentID] = 1;
      } else {
        this.homeworkID[studentID] += 1;
      }
    }

    function pushExamResults(results) {

      if (!Array.isArray(result) || !result) {
        throw "The input must be an array of objects with the follong type:{StudentID: ..., score: ...}"
      }
      for (result of results) {
        idValidation(result.StudentID, this.students + 1);
        if (isNaN(result.score)) {
          throw "Student score must be a number!"
        }
        if (students[result.StudentID - 1].score === "undefined") {
          students[result.StudentID - 1].score = result.score;
        } else {
          throw "This student has more than one scored - He tried to cheat! :)"
        }
      }
      for (student of students) {
        if (student.score === "undefined") {
          student.score = 0;
        }
      }
    }

    function getTopStudents() {

    }
    return {
      init,
      addStudent,
      getAllStudents,
      submitHomework,
      pushExamResults,
      getTopStudents,
    };

  }());

  // 	pushExamResults: function(results) {
  // 	},
  // 	getTopStudents: function() {
  // 	}
  // };

  return Course;
}


module.exports = solve;
