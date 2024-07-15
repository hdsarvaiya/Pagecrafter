import React from 'react';
import { useDrag } from 'react-dnd';
import Navbar from './Component/Navbar';
import Form from './Component/Form'; // Assuming you have a Form component

const items = [
  { id: 1, name: 'Item 1', component: <Navbar /> },
  { id: 2, name: 'Item 2', component: <Form /> },
  { id: 3, name: 'Item 3', component: <div>Other Content</div> }
];

function Sidebar() {
  return (
    <div>
      <h4>Sidebar</h4>
      {items.map(item => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function DraggableItem({ item }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { ...item, position: { x: 0, y: 0 } },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, padding: '8px', margin: '4px', border: '1px solid black', cursor: 'move' }}>
      {item.name}
    </div>
  );
}

export default Sidebar;
