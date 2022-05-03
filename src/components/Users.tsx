import React, { useState } from "react";
import { useUsersQuery } from "./users/queries";
import { User } from "./users/User";

export const Users = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isFetching, isPreviousData } = useUsersQuery(page);

  return (
    <article>
      {data && (
        <ul>
          {data.data.map((user) => (
            <li key={user.id}>
              <User preview={user} />
            </li>
          ))}
          <span>Current Page: {page}</span>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous Page
          </button>{" "}
          <button
            onClick={() => {
              if (!isPreviousData && data.hasMore) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data.hasMore}
          >
            Next Page
          </button>
        </ul>
      )}
      {isFetching && <span> Loading...</span>}
      {isError && <span>Error!</span>}
    </article>
  );
};
