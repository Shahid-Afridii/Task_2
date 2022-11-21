import { useRef, useReducer } from "react";
import clsx from "clsx";
import useLazyLoad from "../Views/useLazyLoad";
import { Card } from "../Views/Card";
import { LoadingPosts } from "../Views/LoadingPosts";
import posts from "../MockDatas/data.json";
import { reducer } from "../Views/useLazyLoad";
// import {useSelector} from ""

const NUM_PER_PAGE = 6;
const TOTAL_PAGES = 3;

export const Posts = () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    currentPage: 1,
    data: [],
  });
  // const [state, dispatch] = useReducer(reducer);
  const images = posts["data"];
  const triggerRef = useRef(null);
  // console.log("state",state)
  const onGrabData = (currentPage) => {


    return new Promise((resolve) => {
      setTimeout(() => {
        const data = images.slice(
          ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,

          NUM_PER_PAGE * currentPage
        );
        console.log(
          ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
          "check",
          currentPage
        );
        resolve(data);
      }, 1000);
    });
  };
  const { data, loading } = useLazyLoad({
    triggerRef,
    onGrabData,
    options: { state, dispatch },
  });
  // console.log("new", state);
  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "600",fontSize:"22px" }}>NewsFeed</h1>
      <div className="grid grid-cols-3 gap-4 content-start">
        {data.map((image) => {
          return <Card title={image["title"]} imageUrl={image["imageUrl"]} description={image['description']} />;
        })}
      </div>

      <div
        ref={triggerRef}
        className={clsx("trigger")}
        style={{ display: TOTAL_PAGES >= state.currentPage ? null : "none" }}
      >
        <LoadingPosts />
      </div>
      <div
        class="mt-2 mb-3"
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
      >
        <button type="button" class="btn btn-outline-primary">
          End Post
        </button>
      </div>
    </>
  );
};
