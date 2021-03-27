import React, { useState } from "react";

const useArray = (initialList) => {
  const [list, setList] = useState(initialList);

  return {
    list,
    addItem: (newItemText) => {
      setList([
        ...list,
        {
          id: list.length + 1,
          text: newItemText,
          completed: false,
        },
      ]);
    },
    removeItem: (itemId) => {
      const updatedItems = list.filter((item) => item.id !== itemId);
      setList(updatedItems);
    },
    toggleItem: (itemId) => {
      const updatedItems = list.map((item) => {
        return item.id === itemId
          ? { ...item, completed: !item.completed }
          : item;
      });
      setList(updatedItems);
    },
  };
};

export default useArray;
