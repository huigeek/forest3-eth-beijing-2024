import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Providers } from "./web3Providers";
import Header from "~/components/layout/header";
import Providers from "~/components/layout/providers";
import Analytics from "~/components/Analytics";
import "./globals.css";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forest3 专注森林",
  description: "Forest3 专注森林是一个基于区块链技术的去中心化应用（DApp），旨在通过经济激励和社区支持帮助用户提升自律，实现个人目标。",
  // 添加更多的SEO属性
  keywords: "Forest3 专注森林, WEB3, 区块链",
  robots: "index, follow", // 搜索引擎爬虫的行为指令
  other: {
    author: "Kirk Lin",
    canonical: "", // 建议搜索引擎抓取页面的主要URL
    ogTitle: "Forest3 专注森林\"Forest3 专注森林\"",
    ogDescription: "Forest3 专注森林是一个基于区块链技术的去中心化应用（DApp），旨在通过经济激励和社区支持帮助用户提升自律，实现个人目标。",
    ogType: "website", // Open Graph协议类型
    ogImage: "", // Open Graph分享时的默认图片
    twitterCard: "summary_large_image", // Twitter卡片类型
    twitterSite: "@", // Twitter网站账号
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Providers>
          <Providers>
            <div className="flex h-screen overflow-hidden">
              <Header />
              <main className="w-full pt-16">
                {children}
              </main>
            </div>
          </Providers>
        </Web3Providers>
        <Analytics />
      </body>
    </html>
  );
}
