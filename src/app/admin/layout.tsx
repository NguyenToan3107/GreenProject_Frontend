"use client"
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React, {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    DesktopOutlined,
    FileOutlined, GiftOutlined, HomeOutlined,
    PieChartOutlined, ShoppingOutlined, SolutionOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {usePathname, useRouter} from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;


const roboto = Roboto({ subsets: ["vietnamese"], weight: ["400", "700"] });


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],

): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}


export default function Admin({
                                children,
                              }: Readonly<{
  children: React.ReactNode;
}>) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState("1");
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        // Cập nhật selectedKey dựa trên pathname
        if (pathname === '/admin/categories') {
            setSelectedKey('2');
        } else if (pathname === '/admin/products') {
            setSelectedKey('3');
        } else if (pathname === '/admin/orders') {
            setSelectedKey('4');
        } else if (pathname === '/admin/vouchers') {
            setSelectedKey('5');
        } else {
            setSelectedKey('1');
        }
    }, [pathname]);
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const { key } = e;
        setSelectedKey(key); // Cập nhật key khi click vào menu item

        // Điều hướng sử dụng router mà không tải lại trang
        if (key === '1') {
            router.push('/admin');
        } else if (key === '2') {
            router.push('/admin/categories');
        } else if (key === '3') {
            router.push('/admin/products');
        } else if (key === '4') {
            router.push('/admin/orders');
        } else if (key === '5') {
            router.push('/admin/vouchers');
        }
    };

    const items: MenuItem[] = [
        getItem('Trang chủ', '1', <HomeOutlined />),
        getItem('Quản lý danh mục', '2',  <AppstoreOutlined />),
        getItem('Quản lý sản phẩm', '3',<ShoppingOutlined />),
        getItem('Quản lý hóa đơn', '4',<SolutionOutlined />),
        getItem('Quản lý voucher', '5', <GiftOutlined />),
    ];

  return (
        <main className={roboto.className}>
            <Layout style={{ minHeight: '100vh' }}>

                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" selectedKeys={[selectedKey]} mode="inline" items={items} onClick={handleMenuClick} />
                </Sider>
                <Layout>

                    <Content style={{ margin: '0 16px' }}>
                        {children}

                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </main>

  );
}
