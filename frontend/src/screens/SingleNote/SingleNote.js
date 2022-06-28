import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote({ match }) {
  const color = "#E8EBE6";
  document.body.style.background = color;

  const [title, setTitle] = useState();

  const [content, setContent] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const styles = {
    container: {
      backgroundImage: "../../note.jpg",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
    },
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mymemories");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setDate(data.updatedAt);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content));
    if (!title || !content) return;

    resetHandler();
    navigate("/mymemories");
  };

  return (
    <MainScreen title="Edit Entry">
      <Card>
        <Card.Header>Edit your Entry</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Entry Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Entry
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Entry
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
