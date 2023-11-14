import React from 'react';
import {Button, Flex, Select, Space, Switch} from "antd";
import {CheckOutlined, CloseOutlined, CopyOutlined, FileDoneOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

const handleChange = () => {
    console.log("handleChange")
}

const CustomHeader = (props) => {

    return (
        <Flex className="full_parent" gap="middle" justify={"space-between"} align="center" vertical={false}>
            <Space>
                <CopyOutlined/>
                <Space>
                    有效期：
                    <Select
                        defaultValue="lucy"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                            {
                                value: 'Yiminghe',
                                label: 'yiminghe',
                            },
                            {
                                value: 'disabled',
                                label: 'Disabled',
                                disabled: true,
                            },
                        ]}
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
                        onClick={props.clickSaveButton}
                        icon={<FileDoneOutlined/>}>
                    保存
                </Button>
            </Space>
        </Flex>
    );
}

CustomHeader.propTypes = {
    clickSaveButton: PropTypes.func
};

export default CustomHeader;