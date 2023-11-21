import React from 'react';
import {Button, Flex, Select, Space} from "antd";
import {CopyOutlined, FileDoneOutlined, KeyOutlined} from "@ant-design/icons";
import PubSub from 'pubsub-js'
import PropTypes from "prop-types";

const options = [
    {
        value: 1,
        label: '1小时',
    }, {
        value: 24,
        label: '1天',
    }, {
        value: 168,
        label: '1周',
    }
]

const CustomHeader = (props) => {
    // 过期时间
    const {timeout, updateCutInfoParam} = props;
    const size = 'small'

    // 处理有效期修改
    const handleChange = (e) => {
        setTimeout(e)
        updateCutInfoParam("timeout", e)
    }

    const handlePasswd = () => {
        PubSub.publish("showPasswdInput")
    }


    const pubMsg = () => {
        PubSub.publish('saveContent', {timeout})
    }


    return (
        <Flex className="full_parent" gap="middle" justify={"space-between"} align="center" vertical={false}>
            <Space>
                <CopyOutlined/>
                <Space>
                    有效期：
                    <Select
                        // labelInValue
                        // defaultValue={selectLabel}
                        value={timeout}
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={options}
                        size={size}
                    />
                </Space>
                <Space>
                    密码：
                    <Button type="primary" shape="round"
                            onClick={handlePasswd}
                            icon={<KeyOutlined/>}
                            size={size}/>

                </Space>
            </Space>
            <Space>
                <Button type="primary"
                        onClick={pubMsg}
                        icon={<FileDoneOutlined/>}>
                    保存
                </Button>
            </Space>
        </Flex>
    );
}

CustomHeader.propTypes = {
    timeout: PropTypes.number,
    updateCutInfoParam: PropTypes.func,
};

export default CustomHeader;