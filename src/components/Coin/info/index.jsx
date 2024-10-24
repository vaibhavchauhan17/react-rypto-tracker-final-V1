import React, { useState } from "react";
import "./styles.css";
function Info({ title, desc }) {
  const [toggle, setToggle] = useState(false);
  const shortDesc =
    desc.slice(0, 300) +
    "<br/><p style='color:var(--grey);cursor:pointer;'>Read More...</p>";
  const longDesc =
    desc + "<br/><p style='color:var(--grey);cursor:pointer;'>Read Less...</p>";

  return (
    <div className="grey-wrapper info-component">
      <h1>{title}</h1>
      {desc.length > 200 ? (
        <p
          dangerouslySetInnerHTML={{
            __html: desc.length >= 300 ? (toggle ? longDesc : shortDesc) : desc,
          }}
          className="info-p"
          onClick={() => setToggle(!toggle)}
        />
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: desc,
          }}
        />
      )}
    </div>
  );
}
export default Info;
