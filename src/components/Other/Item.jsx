import { Avatar, Image, List } from "antd";
import Tags from "../Tags";
import { React } from "react";
import './style.scss';

const Item = ({ item, mediaKey, onClickTag }) => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar size={50} src={item.author.thumbnail} />}
                title={item.author.firstName}
                description={item.title}
            />
            <div className="item-content">
                <div className="item-content-description">{item.content}</div>
                {item.media.split(mediaKey)[1] ? <Image style={{ objectFit: 'cover' }} src={item.media} alt="" /> : null}
            </div>
            <div className="item-tags">
                <Tags lists={item.tags} onClickTag={onClickTag} />
            </div>
        </List.Item>
    )
};

export default Item;