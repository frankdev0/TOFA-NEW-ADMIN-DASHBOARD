import React, { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const RichEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //   const config = useMemo({
  //     readonly: false, // all options from https://xdsoft.net/jodit/doc/,
  //     placeholder: "Start typings...",
  //   });

  return (
    <div>
      <JoditEditor
        name="briefHistory"
        ref={editor}
        value={content}
        // config={config}
        tabIndex={1} // tabIndex of textarea
        // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default RichEditor;
