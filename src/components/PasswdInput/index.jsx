import React, {useState} from 'react';
import {Button, Flex, Input, Space} from "antd";
import "/src/App.css"
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


function PasswdInput(props) {
    // eslint-disable-next-line react/prop-types
    const {updateTempPasswd} = props
    const [inputPasswd, setInputPasswd] = useState("")
    const updateInputPasswd = (e) => {
        setInputPasswd(e.target.value)
    }
    const query = () => {
        updateTempPasswd(inputPasswd)
    }
    return (
        <>
            <Flex className={"full_parent"} align={"center"} justify={"center"}>
                <Space style={{width: '50%'}}>
                    <Flex align={"center"} justify={"center"} vertical gap={"small"}>
                        <h1>剪切板已加密</h1>
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input.Password onChange={updateInputPasswd} placeholder={"输入密码查看剪切板"}/>
                            <Button type="primary" onClick={query}>查看剪切板</Button>
                        </Space.Compact>
                        <Link to={"/"}>还没有剪切板, 去创建一个</Link>
                    </Flex>
                </Space>
            </Flex>
        </>
    );
}

PasswdInput.prototype = {
    updateTempPasswd: PropTypes.func,
}

export default PasswdInput;