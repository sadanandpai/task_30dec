import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nextAsync, previousAsync, fetchAPIData, selectDisplayData } from "./dataTableSlice";
import styles from "./DataTable.module.css";

import { DataRow } from "../dataRow/DataRow";

export function DataTable() {
  const displayData = useSelector(selectDisplayData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAPIData());
  }, []);

  return (
    <div>
      <div className={styles.tableHeader}>
        <div className={styles.albumId}>Album Id</div>
        <div className={styles.id}>Id</div>
        <div className={styles.title}>Title</div>
      </div>

      {displayData?.length === 0 ? (
        "No data found"
      ) : (
        <div>
          {displayData.map((data) => (
            <DataRow key={data.id} data={data} />
          ))}
          <button onClick={() => dispatch(previousAsync())}>Previous</button>
          <button onClick={() => dispatch(nextAsync())}>Next</button>
        </div>
      )}
    </div>
  );
}
