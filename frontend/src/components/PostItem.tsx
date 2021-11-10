import React from "react";

interface PropType {
  id: number
  thumbnail_image?: string
  title: string
  author_name: string
  author_id: number
}

function PostItem(props: PropType) {
  return (
    <div className="postitem-container">
      <div>
        id : {props.id}
      </div>
      <div>
        thumbnail_image : {props.thumbnail_image}
      </div>
      <div>
        title : {props.title}
      </div>
      <div>
        author_name : {props.author_name}
      </div>
      <div>
        author_id : {props.author_id}
      </div>
    </div>
  );
}

export default PostItem;
