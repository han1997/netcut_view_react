import React, {useState} from 'react';
import {Button, Flex, Image, Tabs} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea.js";
import PropTypes from "prop-types";


// 文字区域大小
const autoSize = {minRows: 45, maxRows: 80}

// 剪切板内部侧边栏样式
const sideStyle = {minWidth: '20%', padding: '0 0 0 20px'}

// 剪切板内部侧边栏二维码区域tabs
const linkItems = [
    {
        key: '1',
        label: 'Tab 1',
        children: (
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        ),
    },
    {
        key: '2',
        label: 'Tab 2',
        children: (
            <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        ),
    },
];


const CustomBody = (props) => {
    // eslint-disable-next-line react/prop-types
    const {textContent, updateTextContent} = props
    const [sideState, setSideState] = useState(true)

    // 侧栏显示状态更新
    const toggleSiderState = () => {
        setSideState(!sideState)
    }

    const copyToClip = () => {
        console.log("复制到剪切板", textContent)
    }


    // 文字剪切板内容更新
    const updateAreaText = (e) => {
        const textContent = e.target.value
        updateTextContent(textContent)
    }

    // 剪切板主体：文字/文件tabs
    const items = [
        {
            key: 'text',
            label: "文字",
            children: (<Flex vertical={false}>
                <div style={{width: '100%'}}>
                    <TextArea
                        autoSize={autoSize}
                        value={textContent}
                        onChange={updateAreaText}
                        placeholder="可以随便记录点什么，单次支持20万字符...

剪贴板只要有效期内有查看或修改则永不过期，将自动延期所设置有效期时长。
使用后请主动删除剪贴板，避免数据长时间存储造成数据泄露。

系统会自动拦截存在违禁词和敏感词的内容，如有会被误伤的敏感词
可点击页面底部工具进行编码处理：https://uutool.cn/base64/

请勿上传存储不合法内容，如遇非法剪贴板请及时举报冻结！

举报冻结规则：
第一次举报：冻结30分钟
第二次举报：冻结6小时
第三次举报：冻结一天
第四次举报：直接删除剪贴板"/>
                </div>
                {sideState && <Flex
                    gap="middle"
                    style={sideStyle}
                    vertical align={'flex-end'} justify={"flex-start"}>
                    <Button block style={{backgroundColor: '#1779ba'}} onClick={copyToClip}>复制文本</Button>
                    <Button block style={{backgroundColor: '#3adb76'}}>下载保存</Button>
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
                    <TextArea
                        autoSize={autoSize}
                        placeholder="可以随便记录点什么，单次支持20万字符...

剪贴板只要有效期内有查看或修改则永不过期，将自动延期所设置有效期时长。
使用后请主动删除剪贴板，避免数据长时间存储造成数据泄露。

系统会自动拦截存在违禁词和敏感词的内容，如有会被误伤的敏感词
可点击页面底部工具进行编码处理：https://uutool.cn/base64/

请勿上传存储不合法内容，如遇非法剪贴板请及时举报冻结！

举报冻结规则：
第一次举报：冻结30分钟
第二次举报：冻结6小时
第三次举报：冻结一天
第四次举报：直接删除剪贴板"/>
                </div>
                {sideState && <Flex
                    gap="middle"
                    style={sideStyle}
                    vertical align={'flex-end'} justify={"flex-start"}>
                    <Button block style={{backgroundColor: '#1779ba'}}>复制文本</Button>
                    <Button block style={{backgroundColor: '#3adb76'}}>下载保存</Button>
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


    return (
        <>
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
    updateTextContent: PropTypes.func
}

export default CustomBody;