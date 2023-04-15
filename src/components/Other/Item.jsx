import { Avatar, Image, List } from "antd";
import Tags from "../Tags";
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


            <div className="item-content">
                <div className="item-content-description">{item.content}</div>

                {item.media.split(mediaKey) ? <Image width="300px" style={{ objectFit: 'cover' }} src={item.media} alt="" /> : null}
            </div>

            <div className="item-tags">
                <Tags lists={item.tags} />
            </div>
        </List.Item>
    )
};

export default Item;