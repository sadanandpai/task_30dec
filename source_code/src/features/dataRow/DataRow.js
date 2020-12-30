import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRow, updateRow } from "../dataTable/dataTableSlice";

import styles from "./DataRow.module.css";

export function DataRow(props) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.data.title);

  function setValue(event) {
    setEditValue(event.target.value);
  }

  function onSavelickHandler() {
    if (editValue === "") {
      dispatch(updateRow({ id: props.data.id, title: props.data.title }));
    } else {
      dispatch(updateRow({ id: props.data.id, title: editValue }));
    }
    setEdit(false);
  }

  function onEditlickHandler() {
    setEdit(true);
  }

  const editButton = <button onClick={onEditlickHandler}>Edit</button>;
  const saveButton = <button onClick={onSavelickHandler}>Save</button>;
  const deleteButton = (
    <button onClick={() => dispatch(deleteRow({ albumId: props.data.albumId, id: props.data.id }))}>
      Delete
    </button>
  );

  return (
    <div className={styles.tableRow}>
      <div className={styles.albumId}>{props.data.albumId}</div>
      <div className={styles.id}>{props.data.id}</div>
      {edit ? (
        <input className={styles.title} name="title" value={editValue} onChange={setValue} />
      ) : (
        <div className={styles.title}>{props.data.title}</div>
      )}
      <div className={styles.imageDiv}>
        <a href={props.data.url} target="_blank" rel="noreferrer">
          <img className={styles.image} src={props.data.thumbnailUrl} alt="album" loading="lazy" />
        </a>
      </div>
      {deleteButton}
      {edit ? saveButton : editButton}
    </div>
  );
}
