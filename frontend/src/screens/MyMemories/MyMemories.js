import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Accordion } from "react-bootstrap";
//import { useAccordionButton } from "react-bootstrap/AccordionButton";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const MyMemories = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name}..`}>
      <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        size="lg"
        href="createentry"
      >
        Create New Entry
      </Button>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes
        ?.filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion defaultActiveKey="0" key={note._id}>
            <Accordion.Item activekey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Button as={Card.Text} variant="link">
                      {note.title}
                    </Accordion.Button>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyMemories;
