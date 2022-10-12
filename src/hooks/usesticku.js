import React, { useState } from "react";

export const useStickyState = (defaultValue, key) => {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null
          ? JSON.parse(stickyValue)
          : defaultValue;
      });
      React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
      }, [key, value]);
      return [value, setValue];
};