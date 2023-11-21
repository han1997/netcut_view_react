import React from 'react'
import {Flex} from "antd";

const style = {
    // background: '#373d41',
}
export default function CustomFooter() {
    return (
        <>
            <Flex style={style} className="full_parent" gap="middle" justify={"center"} align="center" vertical>
                <p>网络剪贴板 - 让数据暂存和传送更简单！</p>
            </Flex>
        </>
    )
}
