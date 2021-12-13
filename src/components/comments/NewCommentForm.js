import { useRef, useEffect } from "react";

//Import Components
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

//Styles
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  //props
  const { onAddComment, quoteId } = props;

  //useRef
  const commentTextRef = useRef();

  //useHttp Hook
  const { sendRequest, status, error } = useHttp(addComment);

  //Effects
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  //Submit Handler
  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;

    // optional: Could validate here

    sendRequest({ commentData: { text: enteredText }, quoteId: quoteId });

    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>

      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
