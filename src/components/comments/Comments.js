import { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router";

//Styles
import classes from "./Comments.module.css";

//Import Components
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  //States
  const [isAddingComment, setIsAddingComment] = useState(false);

  //Params
  const params = useParams();
  const { quoteID } = params;

  //useHttp Hook
  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  //Effects
  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  //Handler
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  //Submit Handler
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  //JSX Handler
  let comments;

  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (status === "completed" && (loadedComments || loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className="centered">No Comments Were Added Yet !</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>

      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}

      {isAddingComment && (
        <NewCommentForm quoteId={quoteID} onAddComment={addedCommentHandler} />
      )}

      {comments}
    </section>
  );
};

export default Comments;
