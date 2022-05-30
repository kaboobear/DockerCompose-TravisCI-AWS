import React, { useEffect, useState } from "react";
import axios from "axios";

export const Fib = () => {
  const [index, setIndex] = useState("");
  const [values, setValues] = useState({});
  const [seenIndexes, setSeenIndexes] = useState([]);

  useEffect(() => {
    fetchValue();
    fetchIndexes();
  }, []);

  const fetchValue = async () => {
    const values = await axios.get("/api/values/current");
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setSeenIndexes(seenIndexes.data);
  };

  const showSeenIndeces = () =>
    seenIndexes.length
      ? seenIndexes.map((index) => <span>{index.number} </span>)
      : null;

  const showCalculatedValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          {key} | {values[key]}
        </div>
      );
    }

    return entries;
  };

  const onChange = (event) => {
    setIndex(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index,
    });

    this.setIndex("");
  };

  return (
    <div>
      <h2>Fib calculator</h2>

      <form onSubmit={handleSubmit}>
        <label>Enter index: </label>
        <input value={index} onChange={onChange} />
        <button>Submit</button>
      </form>

      <h3>Indices I've seen:</h3>
      {showSeenIndeces()}

      <h3>Calculated values</h3>
      {showCalculatedValues()}
    </div>
  );
};
