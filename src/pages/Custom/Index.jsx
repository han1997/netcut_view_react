import React from 'react';
import HomeBody from "../../components/HomeBody/Index.jsx";
import CustomFooter from "../../components/CustomFooter/Index.jsx";
import {Layout} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout.js";
import CustomHeader from "../../components/CustomHeader/Index.jsx";
import CustomBody from "../../components/CustomBody/Index.jsx";

function Custom() {
    return (
        <>
            <Layout className='full_screen'>
                <Header style={{color: '#fff', backgroundColor: '#7dbcea'}}>
                    <CustomHeader/>
                </Header>
                <Content>
                    <CustomBody />
                </Content>
                <Footer>
                    <CustomFooter/>
                </Footer>
            </Layout>
        </>
    );
}

export default Custom;