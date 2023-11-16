import React from 'react';
import {Button, Flex, Select, Space, Switch} from "antd";
import {CheckOutlined, CloseOutlined, CopyOutlined, FileDoneOutlined} from "@ant-design/icons";
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
    const {timeout, updateTimeout} = props;

    // 处理有效期修改
    const handleChange = (e) => {
        setTimeout(e)
        updateTimeout(e)
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
                        size="small"
                    />
                </Space>
                <Space>
                    密码：
                    <Switch
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined/>}
                        defaultChecked
                        size="small"
                    />
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
    updateTimeout: PropTypes.func
};

export default CustomHeader;