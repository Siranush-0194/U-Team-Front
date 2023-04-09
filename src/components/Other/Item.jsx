import { Avatar, Image, List } from "antd";
import Tags from "../Tags";
import CommentForm from "../../pages/Dashboard/Accounts/Dashboard/Comments/Comments";
import { React } from "react";
import './style.scss';

const Item = ({ item, mediaKey }) => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar />}
                title={item.author.firstName}
                description={item.title}
            />
            <Tags lists={item.tags} />

            <div className="item-content">{item.content}</div>

            {item.media.split(mediaKey)[1] ? <Image width="100%" style={{ objectFit: 'cover' }} src={item.media} alt="" /> : null}

            {item.commentsUrl ? <CommentForm question={item} /> : null}
        </List.Item>
    )
};

export default Item;