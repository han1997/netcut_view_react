import React, {useState} from 'react'
import {Button, Flex, Input, Space} from "antd";
import { useNavigate} from 'react-router-dom';


export default function HomeBody() {
    const [cutName, setCutName] = useState("")
    let navigate = useNavigate();
    const handleClick = () => {
        console.log("前往",cutName)
        navigate("/" + cutName)
    }
    const handleInput = (event) => {
        setCutName(event.target.value)
    }
    return (
        <Flex className="full_parent" gap="middle" justify={"center"} align="center" vertical>
            <Space direction="vertical" size="middle" align={"center"}>
                <Space.Compact>
                    <Input value={cutName} onChange={handleInput} placeholder="剪切板名称, 默认随机"/>
                    <Button type="primary" onClick={handleClick}>查看剪切板</Button>
                </Space.Compact>
            </Space>
            <h3>开始使用</h3>
            <p>
                网络剪贴板（netcut.cn）提供数据暂存和传送服务，您可以将文本数据或全格式文件数据上传到剪贴板中，随时随地打开剪贴板取回数据，
                让数据的传送不再依赖QQ文件助手等工具以及繁琐的U盘等，让数据的暂存和传送更加方便快捷。<br/>
                网络剪贴板URL构成如下：<br/>
                <b>https://netcut.cn/剪贴板名字</b><br/>
                如您的网络剪贴板名字为 <b>demo</b>，则网络剪贴板链接URL为 <a href="https://netcut.cn/demo">netcut.cn/demo</a>, 直接在浏览器输入链接即可快速访问和编辑。<br/>
                您已经学会网络剪贴板的基础使用了，您还可以查看 <a href="https://netcut.cn/">常见问答</a>，了解更多关于剪贴板相关信息。<br/>

            </p>
        </Flex>
    )
}
