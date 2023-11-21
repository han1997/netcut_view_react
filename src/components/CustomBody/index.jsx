import React, {useEffect, useState} from 'react';
import {Button, Flex, Input, Modal, QRCode, Tabs} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import PubSub from "pubsub-js";
import Clipboard from 'clipboard';
import MarkdownEditorLite from "../MarkdownEditerLite/index.jsx";
import {useLocation} from "react-router-dom";

// 剪切板内部侧边栏样式
const sideStyle = {minWidth: '20%', padding: '0 0 0 20px'}


const CustomBody = (props) => {
    // eslint-disable-next-line react/prop-types
    const {textContent, updateCutInfoParam, sendMsg, download} = props
    const [sideState, setSideState] = useState(true)
    const [passwdInputShow, setPasswdInputShow] = useState(false);
    const [password, setPassword] = useState("")
    const location = useLocation();
    // 获取当前 URL
    const currentUrl = window.location.href;
    // 剪切板内部侧边栏二维码区域tabs
    const linkItems = [
        {
            key: '1',
            label: '当前剪切板内容',
            children: (
                <QRCode value={textContent || '-'}/>
            ),
        },
        {
            key: '2',
            label: '当前剪切板链接',
            children: (
                <QRCode value={currentUrl || '-'}/>
            ),
        },
    ];

    // 侧栏显示状态更新
    const toggleSiderState = () => {
        setSideState(!sideState)
    }

    const changePasswd = (e) => {
        setPassword(e.target.value)
    }

    // 纯前端实现的下载文件
    const downloadText = () => {
        const blob = new Blob([textContent]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = location.pathname.substring(1, location.pathname.length) + '.md';
        document.documentElement.appendChild(a)
        a.click()
        document.documentElement.removeChild(a)
    }

    // 剪切板主体：文字/文件tabs
    const items = [
        {
            key: 'text',
            label: "文字",
            children: (<Flex vertical={false}>
                <div style={{width: '100%'}}>
                    <MarkdownEditorLite textContent={textContent} updateCutInfoParam={updateCutInfoParam}/>
                </div>
                {sideState && <Flex
                    gap="middle"
                    style={sideStyle}
                    vertical align={'flex-end'} justify={"flex-start"}>
                    {/*添加复制文本的class，指定复制内容的组件id*/}
                    <Button block className={"copy-btn"}
                            data-clipboard-target={"#textContent"}
                            style={{backgroundColor: '#1779ba'}}>
                        复制文本
                    </Button>
                    <Button block style={{backgroundColor: '#3adb76'}} onClick={downloadText}>下载保存</Button>
                    <Flex className={"full_parent"} align={"flex-start"} justify={"flex-start"}>
                        <Tabs defaultActiveKey="1"
                              type="card"
                              rootClassName="full_parent"
                              items={linkItems}/>
                    </Flex>
                </Flex>}

            </Flex>)
        }, {
            key: 'file',
            label: "文件",
            children: (<Flex vertical={false}>
                <div style={{width: '100%'}}>
                    <MarkdownEditorLite/>
                </div>
                {sideState && <Flex
                    gap="middle"
                    style={sideStyle}
                    vertical align={'flex-end'} justify={"flex-start"}>
                    <Button block className={"copy-btn"}
                            style={{backgroundColor: '#1779ba'}}>
                        复制文本
                    </Button>
                    <Button block style={{backgroundColor: '#3adb76'}} onClick={download}>下载保存</Button>
                    <Flex className={"full_parent"} align={"flex-start"} justify={"flex-start"}>
                        <Tabs defaultActiveKey="1"
                              type="card"
                              rootClassName="full_parent"
                              items={linkItems}/>
                    </Flex>
                </Flex>}

            </Flex>)
        }
    ]
    // 剪切板侧栏展示

    const operations = <Button type="text"
                               onClick={toggleSiderState}
                               icon={<DoubleRightOutlined/>}></Button>;

    useEffect(() => {
        const copy = new Clipboard('.copy-btn');
        copy.on('success', () => {
            sendMsg('success', "已复制到剪切板")
        });
        copy.on('error', function (e) {
            sendMsg('error', "操作异常: " + e.action)
        });

        return (() => {
            copy.destroy()
        })
    }, [])

    useEffect(() => {
        let showPasswdInputToken = PubSub.subscribe("showPasswdInput", () => {
            setPasswdInputShow(true)
        })
        return () => {
            PubSub.unsubscribe(showPasswdInputToken)
        }
    }, [])

    return (
        <>
            <Modal
                title="设置密码"
                centered
                open={passwdInputShow}
                onOk={() => {
                    setPasswdInputShow(false)
                    // 更新密码
                    updateCutInfoParam("password", password)
                }}
                onCancel={() => {
                    setPasswdInputShow(false)
                }}
            >
                <Input.Password onChange={changePasswd} value={password} placeholder="input password"/>
            </Modal>
            <Flex style={{margin: '0 10%', width: '80%', height: '100%'}} vertical justify="center" align="center">
                <Tabs
                    tabBarExtraContent={operations}
                    rootClassName="full_parent"
                    defaultActiveKey="1"
                    items={items}
                />
            </Flex>
        </>
    );
}

CustomBody.prototype = {
    textContent: PropTypes.string,
    updateCutInfoParam: PropTypes.func,
    sendMsg: PropTypes.func,
    download: PropTypes.func,
}

export default CustomBody;