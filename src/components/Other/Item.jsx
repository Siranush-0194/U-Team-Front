import { Avatar, Image, List } from "antd";
import Tags from "../Tags";
import CommentForm from "../../pages/Dashboard/Accounts/Dashboard/Comments/Comments";
import { React } from "react";

const Item = ({ item }) => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar />}
                title={item.user.firstName}
                description={item.title}
            />
            <Tags lists={item.tags} />

            <div className="content">{item.content}</div>

            <Image width="100%" style={{ objectFit: 'cover' }} src={item.media} alt="" />

            {item.commentsUrl ? <CommentForm question={item} /> : null}
        </List.Item>
    )
};

export default Item;