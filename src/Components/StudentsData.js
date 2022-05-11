import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";

function StudentsData() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searchTermByTag, setSearchTermByTag] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(
          "https://api.hatchways.io/assessment/students"
        );
        const studentData = data.students.map((e) => ({
          ...e,
          grades: e.grades.map((grade) => Number(grade)),
          tags: [],
        }));
        setStudents(studentData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError("Error occured while fetching data!");
      }
    };

    fetchStudents();
  }, []);

  const average = (arr) =>
    (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);

  const addTagById = (id, tag) => {
    const updatedList = students.map((student) => {
      if (student.id === id) {
        if (student.tags.includes(tag)) {
          return student;
        }
        return {
          ...student,
          tags: [...student.tags, tag],
        };
      } else {
        return student;
      }
    });
    setStudents(updatedList);
  };

  const filterStudentByTags = (student) =>
    student.tags.some((tag) =>
      tag.toLowerCase().includes(searchTermByTag.toLowerCase())
    );

  const filterStudentsByName = (student) =>
    student.firstName.toLowerCase().includes(nameSearch.toLowerCase());

  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (loading) return <h3>Loading.........</h3>;

  return (
    <div className="section-center">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(event) => {
            setNameSearch(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Search by tag"
          onChange={(event) => {
            setSearchTermByTag(event.target.value);
          }}
        />
      </div>

      {(searchTermByTag.length > 0
        ? students.filter(filterStudentByTags)
        : students
      )
        .filter(filterStudentsByName)
        .map(({ id, grades, ...props }) => (
          <div key={id}>
            <StudentCard
              {...props}
              gradeAvg={average(grades)}
              addTagById={addTagById}
              grades={grades}
              id={id}
            />
            <hr style={{ position: "absolute", left: "0", right: "0" }} />
          </div>
        ))}
    </div>
  );
}

export default StudentsData;
