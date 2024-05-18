import { useState } from "react";

function Settlement() {
  const [awards, setAwards] = useState([
    { member: "0x123...", amount: "10 ETH" },
    { member: "0x456...", amount: "5 ETH" },
    { member: "0x789...", amount: "2 ETH" },
  ]); // Replace with actual logic

  return (
    <div style={{ padding: "20px" }}>
      <h2>Settlement</h2>
      <ul>
        {awards.map(award => (
          <li key={award.member}>
            {award.member}
            :
            {award.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Settlement;
