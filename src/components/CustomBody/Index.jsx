import React, {useState} from 'react';
import {Button, Flex, Image, Tabs} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea.js";

function CustomBody() {
    const [siderState, setSiderState] = useState(true)

    const autoSize = {minRows: 45, maxRows: 80}

    const siderStyle = {minWidth: '20%', padding: '0 0 0 20px'}

    const toggleSiderState = () => {
        setSiderState(!siderState)
    }


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

    const items = [
        {
            key: 'text',
            label: "文字",
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
                {siderState && <Flex
                    gap="middle"
                    style={siderStyle}
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
                {siderState && <Flex
                    gap="middle"
                    style={siderStyle}
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

    const operations = <Button type="text"
                               onClick={toggleSiderState}
                               icon={<DoubleRightOutlined/>}></Button>;
    return (
        <>
            <Flex style={{margin: '0 10%', width: '80%', height: '100%'}} vertical justify="center" align="center">
                <Tabs
                    tabBarExtraContent={operations}
                    // size={"large"}
                    rootClassName="full_parent"
                    // centered
                    defaultActiveKey="2"
                    items={items}
                />
            </Flex>
        </>
    );
}

export default CustomBody;