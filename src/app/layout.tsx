import type { Metadata } from 'next';
import { Prompt } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import './styles/global.css';

const prompt = Prompt({
    subsets: ['latin', 'thai'],
    weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
    title: "Scramble Manager",
    description: "Scramble Manager by kinpkt",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
    return (
        <html lang="en">
            <body className={prompt.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
