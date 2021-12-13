import { useRef, useState, Fragment } from "react";

import { Prompt } from "react-router";

//Styles
import classes from "./QuoteForm.module.css";

//UI Components
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteForm = (props) => {
  //States
  const [isEntering, setIsEntering] = useState(false);

  //Refs
  const authorInputRef = useRef();
  const textInputRef = useRef();

  //Submit Handler
  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  //Focus Handler
  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  //Finish Enter Handler
  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are You Sure To Leave ? All Your Data Will Be Lost !!!"
        }
      />

      <Card>
        <form
          className={classes.form}
          onFocus={formFocusedHandler}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>

          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
