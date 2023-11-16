import React, {useEffect, useState} from 'react';
import CustomFooter from "../../components/CustomFooter/Index.jsx";
import {Layout, message} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout.js";
import CustomHeader from "../../components/CustomHeader/Index.jsx";
import CustomBody from "../../components/CustomBody/Index.jsx";
import axios from "axios";
import {useLocation} from "react-router-dom";
import PubSub from "pubsub-js";

// 服务器基础URL
const baseURL = "http://127.0.0.1:8080/";

function Custom() {
    const [cutInfo, setCutInfo] = useState({});
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();

    // 操作成功消息提示
    const successMsg = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };


    const updateTimeout = (timeout) => {
        setCutInfo({...cutInfo, timeout})
    }

    const updateTextContent = (textContent) => {
        setCutInfo({...cutInfo, textContent})
    }

    // 初始化获取剪切板数据
    useEffect(() => {
        axios.get(baseURL + "cutInfo" + location.pathname).then((res) => {
            const data = res.data
            setCutInfo(data.data)
        })
    }, [])

    useEffect(() => {
        // 订阅器只需要在页面渲挂在完成创建一次即可，放在外面会重复创建
        let saveContentToken = PubSub.subscribe('saveContent', () => {
            axios.post(baseURL + "cutInfo/update", cutInfo).then(res => {
                const data = res.data;
                if (data.status === 200) {
                    successMsg("保存成功")
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
                    <CustomHeader updateTimeout={updateTimeout} timeout={cutInfo.timeout}/>
                </Header>
                <Content>
                    <CustomBody updateTextContent={updateTextContent} textContent={cutInfo.textContent}/>
                </Content>
                <Footer>
                    <CustomFooter/>
                </Footer>
            </Layout>
        </>
    );
}

export default Custom;