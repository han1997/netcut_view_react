import React, {useState} from 'react';
import CustomFooter from "../../components/CustomFooter/Index.jsx";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout.js";
import CustomHeader from "../../components/CustomHeader/Index.jsx";
import CustomBody from "../../components/CustomBody/Index.jsx";

function Custom() {
    const [clickCount, setClickCount] = useState(0)
    const clickSaveButton = () => {
        setClickCount(clickCount + 1)
    }
    return (
        <>
            <Layout className='full_screen'>
                <Header style={{color: '#fff', backgroundColor: '#7dbcea'}}>
                    <CustomHeader clickSaveButton={clickSaveButton}/>
                </Header>
                <Content>
                    <CustomBody clickCount={clickCount}/>
                </Content>
                <Footer>
                    <CustomFooter/>
                </Footer>
            </Layout>
        </>
    );
}

export default Custom;