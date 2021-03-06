import { Accordion, Card, Button } from "react-bootstrap";
import "../GamePage/GamePage.css";

export default function GamePage() {
  return (
    <div>
      <Accordion defaultActiveKey="1">
        <Card bg="dark">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Player Board
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Button onClick={() => console.log("TODO DISPATCH EndOfTurn")}>
                End of turn
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
