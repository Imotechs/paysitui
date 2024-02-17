import React, { useContext } from "react";
import './News.css';
import { userProfileContext } from "../../../components/userprofilecontext/UserContext";

const News = () => {
    const {user, loading } = useContext(userProfileContext);
    //console.log(user);
    const updatesArray = Array.isArray(user.updates)
    ? user.updates.flatMap((updateArray) =>
        updateArray.map((update) => update)
      )
    : [];
const UpdatesComponent = ({ updateData }) => (
    <div className="container news" key={updateData.id}>
      <div className="alert alert-info">
        <div className="mt-0 mb-2">
          <span className="text-danger">NEW!!!</span>
          {updateData.title}
        </div>
        <div className="mb-0">
          <div>{updateData.body}</div>
        </div>
      </div>
    </div>
  );

    return (
        <>
  {updatesArray.map((updateItem) => (
      <UpdatesComponent key={updateItem.id} updateData={updateItem} />
    ))}

        </>
    );
}

export default News;
