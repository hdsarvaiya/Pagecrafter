// DragArea.js

import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Navbar from './Component/Navbar';
import Form from './Component/Form'; // Assume you have a Form component

function DragArea({ droppedItems, setDroppedItems }) {
  // Retrieve droppedItems from local storage on mount
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('droppedItems'));
    if (savedItems) {
      setDroppedItems(savedItems);
    }
  }, [setDroppedItems]);

  // Save droppedItems to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('droppedItems', JSON.stringify(droppedItems));
  }, [droppedItems]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.position.x + delta.x);
      const top = Math.round(item.position.y + delta.y);

      const newItem = { ...item, position: { x: left, y: top } };
      setDroppedItems((prevItems) => [...prevItems, newItem]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const renderComponent = (item) => {
    switch (item.name) {
      case 'Item 1':
        return <Navbar />;
      case 'Item 2':
        return <Form />;
      // Add more cases as needed
      default:
        return null;
    }
  };

  return (
    <div ref={drop} style={{ minHeight: '400px', border: '1px solid black', padding: '16px', backgroundColor: isOver ? 'lightyellow' : 'white' }}>
      <h4>Drag Area</h4>
      {droppedItems.map((item, index) => (
        <div key={index} style={{ position: 'absolute', left: item.position.x, top: item.position.y, padding: '8px', margin: '4px', border: '1px solid black' }}>
          {renderComponent(item)}
        </div>
      ))}
    </div>
  );
}

export default DragArea;
