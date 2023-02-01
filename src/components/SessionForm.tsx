import React, { useState } from "react";

export default function StatusUpdateButton() {
  const [duration, setDuration] = useState<string>();

  function handleChangeDuration(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    setDuration(event.target.value);
  }
  function handleSubmit() {
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick your favorite flavor:
        <select value={duration} onChange={handleChangeDuration}>
          <option value="30m">30m</option>
          <option value="45m">45m</option>
          <option value="1h">1h</option>
          <option value="1h15m">1h15m</option>
          <option value="1h30m">1h30</option>
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
