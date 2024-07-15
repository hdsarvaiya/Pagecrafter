import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import DragArea from './DragArea';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

function App() {
  const [droppedItems, setDroppedItems] = useState([]);

  useEffect(() => {
    // Fetch items from backend
    axios.get('http://localhost:5000/items')
      .then(response => setDroppedItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleSave = async () => {
    try {
      // Clear existing items in the backend
      await axios.delete('http://localhost:5000/items');
      console.log('All items deleted');
  
      // Save new items
      for (const item of droppedItems) {
        const response = await axios.post('http://localhost:5000/items', item);
        console.log('Item saved:', response.data);
      }
    } catch (error) {
      console.error('Error during save operation:', error);
    }
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <Button onClick={handleSave} style={{ marginBottom: '10px' }}>Save</Button>
            <DragArea droppedItems={droppedItems} setDroppedItems={setDroppedItems} />
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
}

export default App;
