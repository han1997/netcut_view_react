import React, {useEffect, useState} from 'react'
import {Col, Row} from 'antd';
import {CopyOutlined} from '@ant-design/icons';
import moment from "moment";


export default function HomeHeader() {
    const [now, setNow] = useState(moment())  // 会返回当前状态的属性 和修改状态的方法

    useEffect(() => {  // 可以在函数组件内处理生命周期事件，默认情况，每次渲染都会调用该函数

        const t = setInterval(() => {
            setNow(moment())
        }, 1000)

        return () => {  // 每次卸载都执行此函数，清楚定时器
            clearTimeout(t)
        }
    }, [])
    return (
        <div>
            <Row>
                <Col span={8}>
                    <CopyOutlined/>
                    网络剪切板
                </Col>
                <Col span={8} offset={8}>
                    {now.format('YYYY-MM-DD HH:mm:ss')}
                </Col>
            </Row>
        </div>
    )
}
