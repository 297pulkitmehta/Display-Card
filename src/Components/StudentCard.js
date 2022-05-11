import React, { useState } from "react";
import { BiMinus } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";

function StudentCard({
  pic,
  firstName,
  lastName,
  email,
  company,
  skill,
  gradeAvg,
  grades,
  tags,
  addTagById,
  id,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [tag, setTag] = useState("");

  const onHandleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTagById(id, tag);
      setTag("");
    }
  };
  return (
    <div className="student-card-container">
      <img src={pic} alt={firstName} className="photo" />
      <div className="student-info">
        <header>
          <h2>{firstName.toUpperCase() + " " + lastName.toUpperCase()}</h2>
          {showInfo ? (
            <BiMinus fontSize={30} onClick={(e) => setShowInfo(!showInfo)} />
          ) : (
            <HiOutlinePlus size={30} onClick={(e) => setShowInfo(!showInfo)} />
          )}
        </header>
        <ul>
          <li>Email: {email}</li>
          <li>Company: {company}</li>
          <li>Skill: {skill}</li>
          <li>Average: {gradeAvg}%</li>
        </ul>
        <br />
        {showInfo && (
          <ul className="all-test-result">
            {grades.map((num, idx) => (
              <li key={idx}>
                Test {idx + 1}: {num}%
              </li>
            ))}
          </ul>
        )}

        <div className="tag-container">
          {tags.map((tag, index) => (
            <span className="tags" key={index}>
              {tag}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tag}
          onKeyDown={onHandleKeyDown}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Add a tag"
        />
      </div>
    </div>
  );
}

export default StudentCard;
