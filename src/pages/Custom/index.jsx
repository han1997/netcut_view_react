import React, {useEffect, useState} from 'react';
import CustomFooter from "../../components/CustomFooter/index.jsx";
import {Layout, message} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout.js";
import CustomHeader from "../../components/CustomHeader/index.jsx";
import CustomBody from "../../components/CustomBody/index.jsx";
import axios from "axios";
import {useLocation} from "react-router-dom";
import PubSub from "pubsub-js";
import PasswdInput from "../../components/PasswdInput/index.jsx";

// 服务器基础URL
const baseURL = "http://127.0.0.1:8080/";

function Custom() {
    const [cutInfo, setCutInfo] = useState({});
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    const [needPasswd, setNeedPasswd] = useState(false)
    const [tempPasswd, setTempPasswd] = useState("")

    // 操作成功消息提示
    const sendMsg = (type, msg) => {
        messageApi.open({
            type: type,
            content: msg,
        });
    };

    const updateCutInfoParam = (key, value) => {
        setCutInfo({
            ...cutInfo,
            [key]: value
        })
    }

    const updateTempPasswd = (temp) => {
        setTempPasswd(temp)
    }

    const download = (type) => {
        console.log("download")
        axios.get(baseURL + "cutInfo/download", {
            params: {
                name: location.pathname,
                type: type
            }
        }).then(res => {
            console.log("下载成功", res)
        })
    }

    // 初始化获取剪切板数据
    useEffect(() => {
        axios({
            // url: baseURL + "cutInfo" + location.pathname,
            url: baseURL + "cutInfo" + location.pathname + "?password=" + tempPasswd,
            method: "GET",
            data: {
                password: '123'
            },
        }).then((res) => {
            const data = res.data
            if (data.status === 298) {
                setNeedPasswd(true)
                return
            }
            setNeedPasswd(false)
            setCutInfo(data.data)
        })
    }, [tempPasswd])

    useEffect(() => {
        // 订阅器只需要在页面渲挂在完成创建一次即可，放在外面会重复创建
        let saveContentToken = PubSub.subscribe('saveContent', () => {
            axios.post(baseURL + "cutInfo/update", cutInfo).then(res => {
                const data = res.data;
                if (data.status === 200) {
                    sendMsg("success", "保存成功")
                }
            }, error => {
                console.log("保存error", error)
            })
        });

        return (() => {
            // 卸载订阅监听保存按钮
            // PubSub.clearAllSubscriptions();
            PubSub.unsubscribe(saveContentToken);
        })
    }, [cutInfo])


    return (
        <>
            {contextHolder}
            <Layout className='full_screen'>
                <Header style={{color: '#fff', backgroundColor: '#7dbcea'}}>
                    <CustomHeader updateCutInfoParam={updateCutInfoParam}
                                  timeout={cutInfo.timeout}
                    />
                </Header>
                <Content>
                    {
                        needPasswd ? (<PasswdInput updateTempPasswd={updateTempPasswd}/>) : (
                            <CustomBody updateCutInfoParam={updateCutInfoParam}
                                        textContent={cutInfo.textContent}
                                        sendMsg={sendMsg}
                                        download={download}
                            />)
                    }

                </Content>
                <Footer>
                    <CustomFooter/>
                </Footer>
            </Layout>
        </>
    );
}

export default Custom;