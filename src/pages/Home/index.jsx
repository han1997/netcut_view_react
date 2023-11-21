import React from 'react'
import {Layout} from 'antd';
import HomeHeader from '../../components/HomeHeader/index.jsx';
import CustomFooter from '../../components/CustomFooter/index.jsx';
import HomeBody from "../../components/HomeBody/index.jsx";

const {Header, Footer, Content} = Layout;

export default function Home() {
    return (
        <>
            <Layout className='full_screen'>
                <Header style={{color: '#fff', backgroundColor: '#7dbcea'}}>
                    <HomeHeader/>
                </Header>
                <Content>
                    <HomeBody />
                </Content>
                <Footer>
                    <CustomFooter/>
                </Footer>
            </Layout>
        </>
    )
}
